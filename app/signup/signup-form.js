'use client';

import { useState } from 'react';

const initialForm = {
  name: '',
  userId: '',
  password: '',
  phone: '',
};

export default function SignupForm() {
  const [form, setForm] = useState(initialForm);
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
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', message: result.message });
        return;
      }

      setForm(initialForm);
      setStatus({ type: 'success', message: result.message });
    } catch {
      setStatus({
        type: 'error',
        message: '회원가입 요청을 보낼 수 없습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-visual" aria-hidden="true">
        <div className="signup-visual__image" />
        <div className="signup-visual__content">
          <h1>Join HAEGIN</h1>
          <p>Quiet rituals, lasting happiness.</p>
        </div>
      </section>

      <section className="signup-panel">
        <div className="signup-card">
          <a className="signup-logo" href="/">
            HAEGIN
          </a>

          <div className="signup-heading">
            <p>MEMBER REGISTRATION</p>
            <h2>회원가입</h2>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              <span>이름</span>
              <input
                autoComplete="name"
                name="name"
                onChange={updateField}
                placeholder="홍길동"
                required
                type="text"
                value={form.name}
              />
            </label>

            <label>
              <span>아이디</span>
              <input
                autoComplete="username"
                name="userId"
                onChange={updateField}
                placeholder="haegin_member"
                required
                type="text"
                value={form.userId}
              />
            </label>

            <label>
              <span>비밀번호</span>
              <input
                autoComplete="new-password"
                name="password"
                onChange={updateField}
                placeholder="8자 이상 입력"
                required
                type="password"
                value={form.password}
              />
            </label>

            <label>
              <span>전화번호</span>
              <input
                autoComplete="tel"
                name="phone"
                onChange={updateField}
                placeholder="010-0000-0000"
                required
                type="tel"
                value={form.phone}
              />
            </label>

            {status.message ? (
              <p className={`signup-message signup-message--${status.type}`}>
                {status.message}
              </p>
            ) : null}

            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? '가입 처리 중' : '가입하기'}
            </button>
          </form>
        </div>
      </section>

      <style jsx>{`
        .signup-page {
          min-height: 100vh;
          display: flex;
          background: #fbf9fa;
          color: #1b1b1d;
          font-family: 'Libre Franklin', Arial, sans-serif;
        }

        .signup-visual {
          position: relative;
          width: 50%;
          min-height: 100vh;
          overflow: hidden;
          background: #e4e2e3;
        }

        .signup-visual__image {
          position: absolute;
          inset: 0;
          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRF0WDKx6Y2vWY3EYhQlc92BM3vtFDUSnTSuT65kXLPKVzHzR1-GxQxqKzB6ysd9SAADKrKUwL30v7kuGGfEQVY9PHCLxzY-U6GFfPC2ZJZnlegBxnNWY3eJr_BxojIcR33DmDc6TeJBUec-wjoZonXEWUx5W96-GrNXnjW29t_JHaZzKzC7UEeEIiWPXyTdduaFDjBNpFoxFor2WuxmjooHhnzp7tJw-3U20BbezDNIjtZS7ernkPnJqyBOwsuRMInZGxS5g3km8');
          background-position: center;
          background-size: cover;
          opacity: 0.74;
          transform: scale(1.03);
        }

        .signup-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(251, 249, 250, 0.2);
          backdrop-filter: blur(2px);
        }

        .signup-visual__content {
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

        .signup-visual__content h1 {
          margin: 0 0 20px;
          color: #0a1525;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 48px;
          font-weight: 600;
          line-height: 1.2;
        }

        .signup-visual__content p {
          margin: 0;
          max-width: 380px;
          color: #44474c;
          font-size: 20px;
          font-style: italic;
          line-height: 1.6;
        }

        .signup-panel {
          width: 50%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px;
        }

        .signup-card {
          width: 100%;
          max-width: 420px;
        }

        .signup-logo {
          display: inline-block;
          margin-bottom: 72px;
          color: #0a1525;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: 0;
          text-decoration: none;
        }

        .signup-heading {
          margin-bottom: 44px;
        }

        .signup-heading p,
        .signup-form span {
          margin: 0 0 10px;
          color: #44474c;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          line-height: 1.4;
        }

        .signup-heading h2 {
          margin: 0;
          color: #0a1525;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 40px;
          font-weight: 500;
          line-height: 1.3;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .signup-form label {
          display: flex;
          flex-direction: column;
        }

        .signup-form input {
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

        .signup-form input:focus {
          border-bottom-color: #0a1525;
          outline: none;
        }

        .signup-form input::placeholder {
          color: #75777d;
        }

        .signup-form button {
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

        .signup-form button:hover:not(:disabled) {
          background: #0a1525;
          color: #ffffff;
        }

        .signup-form button:disabled {
          cursor: wait;
          opacity: 0.6;
        }

        .signup-message {
          margin: -6px 0 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .signup-message--success {
          color: #2b4a5c;
        }

        .signup-message--error {
          color: #ba1a1a;
        }

        @media (max-width: 820px) {
          .signup-page {
            display: block;
          }

          .signup-visual {
            display: none;
          }

          .signup-panel {
            width: auto;
            padding: 48px 24px;
          }

          .signup-logo {
            margin-bottom: 56px;
          }

          .signup-heading h2 {
            font-size: 34px;
          }
        }
      `}</style>
    </main>
  );
}
