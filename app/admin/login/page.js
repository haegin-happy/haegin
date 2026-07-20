import '../../admin/admin.css';
import AdminLoginForm from './admin-login-form';

export const metadata = {
  title: 'HAEGIN | Admin Login',
};

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <a className="admin-logo" href="/">
          HAEGIN
        </a>
        <p className="admin-eyebrow">ADMIN LOGIN</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
