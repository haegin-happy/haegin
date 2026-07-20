'use client';

import { useState } from 'react';

const statusLabels = {
  draft: '초안',
  published: '공개',
  private: '비공개',
};

export default function PostsTable({ posts }) {
  const [items, setItems] = useState(posts);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function removePost(post) {
    setMessage('');
    setError('');

    if (!window.confirm(`"${post.title}" 게시글을 삭제할까요?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || '삭제에 실패했습니다.');
        return;
      }

      setItems((current) => current.filter((item) => item.id !== post.id));
      setMessage(result.message || '삭제했습니다.');
    } catch {
      setError('서버에 삭제 요청을 보낼 수 없습니다.');
    }
  }

  return (
    <section className="admin-panel">
      {message ? <p className="admin-message">{message}</p> : null}
      {error ? <p className="admin-message admin-message--error">{error}</p> : null}
      <table className="admin-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>상태</th>
            <th>카테고리</th>
            <th>수정일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            items.map((post) => (
              <tr key={post.id}>
                <td>
                  <strong>{post.title}</strong>
                  <br />
                  <span>{post.slug}</span>
                </td>
                <td>{statusLabels[post.status] || post.status}</td>
                <td>{post.category || '-'}</td>
                <td>{post.updated_at || post.updatedAt || '-'}</td>
                <td>
                  <div className="admin-actions">
                    <a className="admin-button" href={`/admin/posts/${post.id}/edit`}>
                      수정
                    </a>
                    <button className="danger-button" onClick={() => removePost(post)} type="button">
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">아직 게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
