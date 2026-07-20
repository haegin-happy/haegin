import { SESSION_COOKIE } from '../../../../lib/auth';

export async function POST(request) {
  const response = Response.redirect(new URL('/admin/login', request.url), 303);
  response.headers.set(
    'Set-Cookie',
    `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
  return response;
}
