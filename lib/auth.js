import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'haegin_session';

function getAuthSecret() {
  return (
    process.env.HAEGIN_AUTH_SECRET ||
    process.env.TURSO_CURRENT_AUTH_TOKEN ||
    'haegin-local-development-secret'
  );
}

function toBase64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function sign(value) {
  return createHmac('sha256', getAuthSecret()).update(value).digest('base64url');
}

export function createSessionToken(member) {
  const payload = toBase64Url(
    JSON.stringify({
      id: member.id,
      userId: member.userId,
      name: member.name,
      role: member.role,
      issuedAt: Date.now(),
    })
  );

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  const [payload, signature] = String(token || '').split('.');

  if (!payload || !signature) {
    return null;
  }

  const actualSignature = Buffer.from(sign(payload));
  const expectedSignature = Buffer.from(signature);

  if (
    actualSignature.length !== expectedSignature.length ||
    !timingSafeEqual(actualSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}
