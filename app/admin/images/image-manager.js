'use client';

import { useState } from 'react';

const imageLabels = {
  hero: '메인 히어로 이미지',
  craft: '브랜드/제품 소개 이미지',
};

function toArray(images) {
  return Object.values(images).map((item) => ({
    ...item,
    imageKey: item.imageKey || item.image_key,
    imageUrl: item.imageUrl || item.image_url,
    altText: item.altText || item.alt_text,
  }));
}

export default function ImageManager({ images }) {
  const [items, setItems] = useState(() => toArray(images));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  function updateItem(index, field, value) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  }

  async function save() {
    setMessage('');
    setError('');

    if (!window.confirm('이미지 변경사항을 저장할까요?')) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || '이미지 저장에 실패했습니다.');
        return;
      }

      setMessage(result.message || '저장했습니다.');
    } catch {
      setError('서버에 저장 요청을 보낼 수 없습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="admin-panel admin-form">
      <p className="form-help">
        JPG, PNG, WEBP 이미지 URL을 입력하세요. 파일 업로드 저장소는 Vercel Blob 또는 Cloudinary 연결 후 확장하는 구조입니다.
      </p>
      {message ? <p className="admin-message">{message}</p> : null}
      {error ? <p className="admin-message admin-message--error">{error}</p> : null}

      {items.map((item, index) => (
        <div className="admin-card" key={item.imageKey}>
          <h2>{imageLabels[item.imageKey] || item.imageKey}</h2>
          {item.imageUrl ? (
            <img alt={item.altText || ''} className="admin-preview" src={item.imageUrl} />
          ) : null}
          <label>
            이미지 URL
            <input
              onChange={(event) => updateItem(index, 'imageUrl', event.target.value)}
              required
              value={item.imageUrl || ''}
            />
          </label>
          <label>
            대체 텍스트
            <input
              maxLength={160}
              onChange={(event) => updateItem(index, 'altText', event.target.value)}
              required
              value={item.altText || ''}
            />
          </label>
          <div className="admin-grid admin-grid--two">
            <label>
              권장 너비
              <input
                min="0"
                onChange={(event) => updateItem(index, 'width', event.target.value)}
                type="number"
                value={item.width || ''}
              />
            </label>
            <label>
              권장 높이
              <input
                min="0"
                onChange={(event) => updateItem(index, 'height', event.target.value)}
                type="number"
                value={item.height || ''}
              />
            </label>
          </div>
        </div>
      ))}

      <button disabled={isSaving} onClick={save} type="button">
        이미지 저장
      </button>
    </section>
  );
}
