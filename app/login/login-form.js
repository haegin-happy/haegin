'use client';

import { useState } from 'react';

const copy = {
  ko: {
    title: '\uB85C\uADF8\uC778',
    eyebrow: 'MEMBER ACCESS',
    intro:
      '\uC544\uC774\uB514\uC640 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.',
    userId: '\uC544\uC774\uB514',
    password: '\uBE44\uBC00\uBC88\uD638',
    userPlaceholder: 'haegin_member',
    passwordPlaceholder: '\uBE44\uBC00\uBC88\uD638 \uC785\uB825',
    submit: '\uB85C\uADF8\uC778',
    submitting: '\uB85C\uADF8\uC778 \uC911',
    success: '\uB85C\uADF8\uC778\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
    error:
      '\uB85C\uADF8\uC778 \uC694\uCCAD\uC744 \uBCF4\uB0BC \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    signupLead:
      '\uC544\uC9C1 \uD68C\uC6D0\uC774 \uC544\uB2C8\uC2E0\uAC00\uC694?',
    signup: '\uD68C\uC6D0\uAC00\uC785',
    visualTitle: 'Timeless Rituals',
    visualText: 'A quiet beginning for long-lasting happiness.',
  },
  en: {
    title: 'Member Access',
    eyebrow: 'MEMBER ACCESS',
    intro: 'Enter your member ID and password to continue.',
    userId: 'Member ID',
    password: 'Password',
    userPlaceholder: 'haegin_member',
    passwordPlaceholder: 'Enter password',
    submit: 'Login',
    submitting: 'Signing in',
    success: 'Signed in.',
    error: 'Could not send the login request.',
    signupLead: 'Not a member?',
    signup: 'Join',
    visualTitle: 'Timeless Rituals',
    visualText: 'A quiet beginning for long-lasting happiness.',
  },
};

export default function LoginForm({ locale = 'ko' }) {
  const text = copy[locale] || copy.ko;
  const [form, setForm] = useState({ userId: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', message: result.message });
        return;
      }

      setStatus({ type: 'success', message: result.message || text.success });
      window.location.href = result.member?.role === 'admin' ? '/admin' : '/';
    } catch {
      setStatus({ type: 'error', message: text.error });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-visual" aria-hidden="true">
        <div className="login-visual__image" />
        <div className="login-visual__content">
          <h1>{text.visualTitle}</h1>
          <p>{text.visualText}</p>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <a className="login-logo" href="/">
            HAEGIN
          </a>

          <div className="login-heading">
            <p>{text.eyebrow}</p>
            <h2>{text.title}</h2>
            <span>{text.intro}</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>{text.userId}</span>
              <input
                autoComplete="username"
                name="userId"
                onChange={updateField}
                placeholder={text.userPlaceholder}
                required
                type="text"
                value={form.userId}
              />
            </label>

            <label>
              <span>{text.password}</span>
              <input
                autoComplete="current-password"
                name="password"
                onChange={updateField}
                placeholder={text.passwordPlaceholder}
                required
                type="password"
                value={form.password}
              />
            </label>

            {status.message ? (
              <p className={`login-message login-message--${status.type}`}>
                {status.message}
              </p>
            ) : null}

            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? text.submitting : text.submit}
            </button>
          </form>

          <p className="login-signup">
            {text.signupLead} <a href="/signup">{text.signup}</a>
          </p>
        </div>
      </section>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          background: #fbf9fa;
          color: #1b1b1d;
          font-family: 'Libre Franklin', Arial, sans-serif;
        }

        .login-visual {
          position: relative;
          width: 50%;
          min-height: 100vh;
          overflow: hidden;
          background: #e4e2e3;
        }

        .login-visual__image {
          position: absolute;
          inset: 0;
          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRF0WDKx6Y2vWY3EYhQlc92BM3vtFDUSnTSuT65kXLPKVzHzR1-GxQxqKzB6ysd9SAADKrKUwL30v7kuGGfEQVY9PHCLxzY-U6GFfPC2ZJZnlegBxnNWY3eJr_BxojIcR33DmDc6TeJBUec-wjoZonXEWUx5W96-GrNXnjW29t_JHaZzKzC7UEeEIiWPXyTdduaFDjBNpFoxFor2WuxmjooHhnzp7tJw-3U20BbezDNIjtZS7ernkPnJqyBOwsuRMInZGxS5g3km8');
          background-position: center;
          background-size: cover;
          opacity: 0.74;
          transform: scale(1.03);
        }

        .login-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(251, 249, 250, 0.2);
          backdrop-filter: blur(2px);
        }

        .login-visual__content {
          position: relative;
          z-index: 1;
          height: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px;
          text-align: center;
        }

        .login-visual__content h1,
        .login-logo,
        .login-heading h2 {
          color: #0a1525;
          font-family: 'Source Serif 4', Georgia, serif;
        }

        .login-visual__content h1 {
          margin: 0 0 20px;
          font-size: 48px;
          font-weight: 600;
          line-height: 1.2;
        }

        .login-visual__content p {
          margin: 0;
          max-width: 380px;
          color: #44474c;
          font-size: 20px;
          font-style: italic;
          line-height: 1.6;
        }

        .login-panel {
          width: 50%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
        }

        .login-logo {
          display: inline-block;
          margin-bottom: 72px;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: 0;
          text-decoration: none;
        }

        .login-heading {
          margin-bottom: 44px;
        }

        .login-heading p,
        .login-form span {
          margin: 0 0 10px;
          color: #44474c;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          line-height: 1.4;
        }

        .login-heading h2 {
          margin: 0 0 12px;
          font-size: 40px;
          font-weight: 500;
          line-height: 1.3;
        }

        .login-heading > span {
          display: block;
          color: #44474c;
          font-size: 18px;
          line-height: 1.6;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .login-form label {
          display: flex;
          flex-direction: column;
        }

        .login-form input {
          width: 100%;
          box-sizing: border-box;
          border: 0;
          border-bottom: 1px solid #c5c6cd;
          border-radius: 0;
          background: transparent;
          color: #1b1b1d;
          font: inherit;
          font-size: 18px;
          line-height: 1.6;
          padding: 10px 0 12px;
        }

        .login-form input:focus {
          border-bottom-color: #0a1525;
          outline: none;
        }

        .login-form input::placeholder {
          color: #75777d;
        }

        .login-form button {
          margin-top: 10px;
          width: 100%;
          border: 1px solid #0a1525;
          background: transparent;
          color: #0a1525;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          line-height: 1.4;
          padding: 20px 24px;
          transition:
            background 0.3s ease,
            color 0.3s ease,
            opacity 0.3s ease;
        }

        .login-form button:hover:not(:disabled) {
          background: #0a1525;
          color: #ffffff;
        }

        .login-form button:disabled {
          cursor: wait;
          opacity: 0.6;
        }

        .login-message {
          margin: -6px 0 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .login-message--success {
          color: #2b4a5c;
        }

        .login-message--error {
          color: #ba1a1a;
        }

        .login-signup {
          margin: 28px 0 0;
          color: #44474c;
          font-size: 16px;
          line-height: 1.6;
          text-align: center;
        }

        .login-signup a {
          color: #0a1525;
          font-weight: 600;
          text-underline-offset: 4px;
        }

        @media (max-width: 820px) {
          .login-page {
            display: block;
          }

          .login-visual {
            display: none;
          }

          .login-panel {
            width: auto;
            padding: 48px 24px;
          }

          .login-logo {
            margin-bottom: 56px;
          }

          .login-heading h2 {
            font-size: 34px;
          }
        }
      `}</style>
    </main>
  );
}
