import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { getDb } from '../../../lib/db';

export const runtime = 'nodejs';

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');

  return `${salt}:${hash}`;
}

function isValidPhone(phone) {
  return /^[0-9+\-\s()]{8,20}$/.test(phone);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const userId = String(body.userId || '').trim();
    const password = String(body.password || '');
    const phone = String(body.phone || '').trim();

    if (!name || !userId || !password || !phone) {
      return Response.json(
        { message: '모든 항목을 입력해 주세요.' },
        { status: 400 }
      );
    }

    if (userId.length < 4 || userId.length > 32) {
      return Response.json(
        { message: '아이디는 4자 이상 32자 이하로 입력해 주세요.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { message: '비밀번호는 8자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return Response.json(
        { message: '전화번호 형식이 올바르지 않습니다.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const passwordHash = hashPassword(password);

    await db.execute({
      sql: `
        INSERT INTO members (user_id, name, password_hash, phone)
        VALUES (?, ?, ?, ?)
      `,
      args: [userId, name, passwordHash, phone],
    });

    return Response.json(
      { message: '회원가입이 완료되었습니다.' },
      { status: 201 }
    );
  } catch (error) {
    if (error?.message?.includes('UNIQUE constraint failed')) {
      return Response.json(
        { message: '이미 사용 중인 아이디 또는 전화번호입니다.' },
        { status: 409 }
      );
    }

    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json(
        { message: 'Turso 환경변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    return Response.json(
      { message: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
