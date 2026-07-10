import { pbkdf2Sync, timingSafeEqual } from 'node:crypto';
import { createSessionToken, SESSION_COOKIE } from '../../../lib/auth';
import { getDb } from '../../../lib/db';

export const runtime = 'nodejs';

function verifyPassword(password, storedHash) {
  const [salt, expectedHash] = String(storedHash || '').split(':');

  if (!salt || !expectedHash) {
    return false;
  }

  const actualHash = pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString(
    'hex'
  );
  const actualBuffer = Buffer.from(actualHash, 'hex');
  const expectedBuffer = Buffer.from(expectedHash, 'hex');

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const userId = String(body.userId || '').trim();
    const password = String(body.password || '');

    if (!userId || !password) {
      return Response.json(
        { message: 'Enter your member ID and password.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const result = await db.execute({
      sql: `
        SELECT id, user_id, name, password_hash, role
        FROM members
        WHERE user_id = ?
        LIMIT 1
      `,
      args: [userId],
    });
    const member = result.rows[0];

    if (!member || !verifyPassword(password, member.password_hash)) {
      return Response.json(
        { message: 'The member ID or password is incorrect.' },
        { status: 401 }
      );
    }

    const responseMember = {
      id: member.id,
      userId: member.user_id,
      name: member.name,
      role: member.role || 'member',
    };

    const response = Response.json({
      message: 'Signed in.',
      member: responseMember,
    });

    response.headers.append(
      'Set-Cookie',
      `${SESSION_COOKIE}=${createSessionToken(
        responseMember
      )}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
    );

    return response;
  } catch (error) {
    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json(
        { message: 'Turso environment variables are not configured.' },
        { status: 500 }
      );
    }

    if (String(error?.message || '').includes('no such column: role')) {
      return Response.json(
        { message: 'The members.role column has not been migrated yet.' },
        { status: 500 }
      );
    }

    return Response.json(
      { message: 'An error occurred while signing in.' },
      { status: 500 }
    );
  }
}
