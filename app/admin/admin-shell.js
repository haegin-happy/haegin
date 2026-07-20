import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAdminSession, SESSION_COOKIE, verifySessionToken } from '../../lib/auth';
import './admin.css';

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  if (!isAdminSession(session)) {
    redirect('/admin/login');
  }

  return session;
}

export default function AdminShell({ children, title, description }) {
  const menu = [
    ['관리자 홈', '/admin'],
    ['홈페이지 문구', '/admin/content'],
    ['사진 관리', '/admin/images'],
    ['게시글 관리', '/admin/posts'],
    ['외부 링크 관리', '/admin/content#links'],
    ['홈페이지 보기', '/'],
  ];

  return (
    <main className="admin-app">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/admin">
          HAEGIN
        </a>
        <nav>
          {menu.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <form action="/api/admin/logout" method="post">
          <button type="submit">로그아웃</button>
        </form>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <p>ADMIN CMS</p>
          <h1>{title}</h1>
          {description ? <span>{description}</span> : null}
        </header>
        {children}
      </section>
    </main>
  );
}
