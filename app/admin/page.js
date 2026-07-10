import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from '../../lib/auth';
import './admin.css';

export const metadata = {
  title: 'HAEGIN | Admin',
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    redirect('/login');
  }

  if (session.role !== 'admin') {
    redirect('/');
  }

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <a className="admin-logo" href="/">
          HAEGIN
        </a>
        <p className="admin-eyebrow">ADMIN ACCESS</p>
        <h1>{'\uAD00\uB9AC\uC790 \uD398\uC774\uC9C0'}</h1>
        <p className="admin-copy">
          {session.name}
          {'\uB2D8\uC740 \uAD00\uB9AC\uC790 \uAD8C\uD55C\uC73C\uB85C \uB85C\uADF8\uC778\uD588\uC2B5\uB2C8\uB2E4.'}
        </p>
      </section>
    </main>
  );
}
