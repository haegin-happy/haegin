'use client';

import { useState } from 'react';

const emptyPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImageUrl: '',
  featuredImageAlt: '',
  category: '',
  status: 'draft',
  publishedAt: '',
  scheduledAt: '',
  seoTitle: '',
  seoDescription: '',
};

function fromPost(post) {
  if (!post) return emptyPost;
  return {
    id: post.id,
    title: post.title || '',
    slug: post.slug || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    featuredImageUrl: post.featured_image_url || post.featuredImageUrl || '',
    featuredImageAlt: post.featured_image_alt || post.featuredImageAlt || '',
    category: post.category || '',
    status: post.status || 'draft',
    publishedAt: post.published_at || post.publishedAt || '',
    scheduledAt: post.scheduled_at || post.scheduledAt || '',
    seoTitle: post.seo_title || post.seoTitle || '',
    seoDescription: post.seo_description || post.seoDescription || '',
  };
}

export default function PostForm({ post }) {
  const [form, setForm] = useState(() => fromPost(post));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function save() {
    setMessage('');
    setError('');

    if (!form.title.trim() || !form.content.trim()) {
      setError('제목과 본문은 필수입니다.');
      return;
    }

    if (!window.confirm('게시글을 저장할까요?')) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/posts', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || '저장에 실패했습니다.');
        return;
      }

      setMessage(result.message || '저장했습니다.');
      if (!form.id) {
        window.location.href = '/admin/posts';
      }
    } catch {
      setError('서버에 저장 요청을 보낼 수 없습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="admin-panel admin-form">
      {message ? <p className="admin-message">{message}</p> : null}
      {error ? <p className="admin-message admin-message--error">{error}</p> : null}
      <div className="admin-grid admin-grid--two">
        <label>
          제목
          <input maxLength={120} name="title" onChange={updateField} required value={form.title} />
        </label>
        <label>
          슬러그
          <input
            maxLength={80}
            name="slug"
            onChange={updateField}
            placeholder="비워두면 제목으로 생성"
            value={form.slug}
          />
        </label>
      </div>
      <label>
        요약문
        <textarea maxLength={240} name="excerpt" onChange={updateField} value={form.excerpt} />
      </label>
      <label>
        본문
        <textarea
          maxLength={12000}
          name="content"
          onChange={updateField}
          required
          value={form.content}
        />
      </label>
      <div className="admin-grid admin-grid--two">
        <label>
          대표 이미지 URL
          <input name="featuredImageUrl" onChange={updateField} value={form.featuredImageUrl} />
        </label>
        <label>
          대표 이미지 대체 텍스트
          <input
            maxLength={160}
            name="featuredImageAlt"
            onChange={updateField}
            value={form.featuredImageAlt}
          />
        </label>
      </div>
      {form.featuredImageUrl ? (
        <img alt={form.featuredImageAlt || ''} className="admin-preview" src={form.featuredImageUrl} />
      ) : null}
      <div className="admin-grid admin-grid--two">
        <label>
          카테고리
          <input maxLength={60} name="category" onChange={updateField} value={form.category} />
        </label>
        <label>
          공개 상태
          <select name="status" onChange={updateField} value={form.status}>
            <option value="draft">초안</option>
            <option value="published">공개</option>
            <option value="private">비공개</option>
          </select>
        </label>
      </div>
      <div className="admin-grid admin-grid--two">
        <label>
          게시일
          <input name="publishedAt" onChange={updateField} placeholder="YYYY-MM-DD HH:MM:SS" value={form.publishedAt} />
        </label>
        <label>
          예약일
          <input name="scheduledAt" onChange={updateField} placeholder="YYYY-MM-DD HH:MM:SS" value={form.scheduledAt} />
        </label>
      </div>
      <div className="admin-grid admin-grid--two">
        <label>
          SEO 제목
          <input maxLength={120} name="seoTitle" onChange={updateField} value={form.seoTitle} />
        </label>
        <label>
          SEO 설명
          <input
            maxLength={180}
            name="seoDescription"
            onChange={updateField}
            value={form.seoDescription}
          />
        </label>
      </div>
      <div className="admin-actions">
        <button disabled={isSaving} onClick={save} type="button">
          {isSaving ? '저장 중' : '저장'}
        </button>
        <a className="admin-button" href="/admin/posts">
          취소
        </a>
      </div>
    </section>
  );
}
