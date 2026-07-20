'use client';

import { useState } from 'react';

export default function AdminLoginForm() {
  const [form, setForm] = useState({ userId: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || '로그인에 실패했습니다.');
        return;
      }

      if (result.member?.role !== 'admin') {
        setMessage('관리자 권한이 있는 계정만 접근할 수 있습니다.');
        return;
      }

      window.location.href = '/admin';
    } catch {
      setMessage('로그인 요청을 처리할 수 없습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <label>
        아이디
        <input
          autoComplete="username"
          name="userId"
          onChange={updateField}
          required
          value={form.userId}
        />
      </label>
      <label>
        비밀번호
        <input
          autoComplete="current-password"
          name="password"
          onChange={updateField}
          required
          type="password"
          value={form.password}
        />
      </label>
      {message ? <p className="admin-message admin-message--error">{message}</p> : null}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? '로그인 중' : '관리자 로그인'}
      </button>
    </form>
  );
}
