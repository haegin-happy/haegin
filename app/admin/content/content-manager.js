'use client';

import { useMemo, useState } from 'react';

const contentLabels = {
  hero: '메인 영역',
  brand: '브랜드 소개',
  product: '제품 소개',
  collection: '컬렉션 소개',
  contact: '문의 영역',
  footer: '하단 안내',
};

const linkLabels = {
  purchase: '상품 구매 링크',
  kakao: '카카오톡 문의 링크',
  naver: '네이버 톡톡 링크',
  instagram: '인스타그램 링크',
  blog: '블로그 링크',
};

function toArray(source, keyName) {
  return Object.values(source).map((item) => ({
    ...item,
    [keyName]: item[keyName] || item.sectionKey || item.section_key || item.linkKey || item.link_key,
    sectionKey: item.sectionKey || item.section_key,
    linkKey: item.linkKey || item.link_key,
    isActive: Boolean(item.isActive ?? item.is_active),
  }));
}

export default function ContentManager({ content, links }) {
  const [contentItems, setContentItems] = useState(() => toArray(content, 'sectionKey'));
  const [linkItems, setLinkItems] = useState(() => toArray(links, 'linkKey'));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const hasRequiredTitles = useMemo(
    () => contentItems.every((item) => String(item.title || '').trim()),
    [contentItems]
  );

  function updateContent(index, field, value) {
    setContentItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  }

  function updateLink(index, field, value) {
    setLinkItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  }

  async function save(endpoint, payload, confirmText) {
    setMessage('');
    setError('');

    if (!window.confirm(confirmText)) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || '저장에 실패했습니다.');
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
    <div className="admin-panel">
      {message ? <p className="admin-message">{message}</p> : null}
      {error ? <p className="admin-message admin-message--error">{error}</p> : null}

      <section className="admin-form">
        <h2>문구 관리</h2>
        <p className="form-help">제목은 필수입니다. 저장 후 공개 홈페이지에 즉시 반영됩니다.</p>
        {contentItems.map((item, index) => (
          <div className="admin-card" key={item.sectionKey}>
            <h3>{contentLabels[item.sectionKey] || item.sectionKey}</h3>
            <label>
              제목
              <input
                maxLength={120}
                onChange={(event) => updateContent(index, 'title', event.target.value)}
                required
                value={item.title || ''}
              />
            </label>
            <label>
              부제목
              <input
                maxLength={180}
                onChange={(event) => updateContent(index, 'subtitle', event.target.value)}
                value={item.subtitle || ''}
              />
            </label>
            <label>
              본문
              <textarea
                maxLength={1200}
                onChange={(event) => updateContent(index, 'body', event.target.value)}
                value={item.body || ''}
              />
            </label>
          </div>
        ))}
        <button
          disabled={isSaving || !hasRequiredTitles}
          onClick={() =>
            save('/api/admin/content', { items: contentItems }, '문구 변경사항을 저장할까요?')
          }
          type="button"
        >
          문구 저장
        </button>
      </section>

      <section className="admin-form" id="links">
        <h2>외부 링크 관리</h2>
        <p className="form-help">
          URL은 http, https 또는 내부 경로(/stories)만 허용합니다. 비활성 링크는 공개 버튼에서 숨깁니다.
        </p>
        {linkItems.map((item, index) => (
          <div className="admin-card" key={item.linkKey}>
            <h3>{linkLabels[item.linkKey] || item.linkKey}</h3>
            <label>
              버튼 문구
              <input
                maxLength={80}
                onChange={(event) => updateLink(index, 'label', event.target.value)}
                required
                value={item.label || ''}
              />
            </label>
            <label>
              URL
              <input
                onChange={(event) => updateLink(index, 'url', event.target.value)}
                placeholder="https:// 또는 /로 시작"
                value={item.url || ''}
              />
            </label>
            <label>
              <span>
                <input
                  checked={Boolean(item.isActive)}
                  onChange={(event) => updateLink(index, 'isActive', event.target.checked)}
                  type="checkbox"
                />{' '}
                공개 버튼으로 표시
              </span>
            </label>
          </div>
        ))}
        <button
          disabled={isSaving}
          onClick={() =>
            save('/api/admin/links', { items: linkItems }, '외부 링크 변경사항을 저장할까요?')
          }
          type="button"
        >
          링크 저장
        </button>
      </section>
    </div>
  );
}
