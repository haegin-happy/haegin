import { cookies } from 'next/headers';
import { isAdminSession, SESSION_COOKIE, verifySessionToken } from './auth';

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAdminApi() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    return {
      session: null,
      response: Response.json({ message: '관리자 로그인이 필요합니다.' }, { status: 401 }),
    };
  }

  return { session, response: null };
}
