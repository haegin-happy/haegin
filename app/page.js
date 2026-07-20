'use client';

import { useEffect, useState } from 'react';

const fallback = {
  content: {
    hero: {
      title: '조용한 우아함을 입다',
      subtitle: '전통의 선을 오늘의 일상으로 이어갑니다.',
    },
    brand: {
      title: '긴 시간 오래 입고, 오래 기억되는 옷을 만듭니다.',
      subtitle: 'The Purpose',
      body:
        'HAEGIN은 일상의 분주함 속에서도 잃지 말아야 할 고결함과 평온함을 제안합니다. 시간의 흐름에도 변하지 않는 가치를 정제된 선과 편안한 착용감 안에 담습니다.',
    },
    product: {
      title: '손끝에서 완성되는 시간',
      subtitle: 'Craft',
      body:
        '천연 린넨과 실크의 결을 살리고, 몸의 움직임을 고려한 입체적인 실루엣으로 HAEGIN만의 조용한 존재감을 완성합니다.',
    },
    collection: {
      title: '고유한 아름다움',
      subtitle: 'Lookbook 2024',
    },
    contact: {
      title: '전통과 일상이 만나는 순간을 함께 만듭니다.',
      subtitle: 'Contact',
      body: '협업과 구매, 문의는 아래 외부 링크를 통해 이어집니다.',
    },
  },
  images: {
    hero: {
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBEseei3G1CMhcs9eNGeieW3qeaZUByE_lzBnbswnbFMNblMdCq1K61wN9Q9-CyfGabX4xW4yOWxmCA7zpV8HMsKO5QmNq4oXJVeQ1p8EUPDCFGfhGjHwHDeqWV6bSqmURCVjEc2cy8thQT7H4oYgGiilBOxaS3eLib6Oz_menTwIa65lLE-sUBi3ZDc6Pp2k1-D4GxpSu4F_47LZnqg2E-3DEfzvw0HlBVFtOz8AoVnc7tsP8Wo2bYbUO3QiMlDHlm4AhYlRbUN10',
      altText: '한옥 공간에서 촬영한 HAEGIN 의상',
    },
    craft: {
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB0C47JOStMzFg2b6v3P7j4eNHd_dxcY2VB_LikY0alOXkhTPddn0BkwiRwYcSVqGZEThEfyp8E9uY3bVPqsehvC-fFWMzyJmed-cIxZqCb_Xddk1GezJrn92p9BtnG1IZ2NtvQoZF7jbcoyV92KKVzgUDv0iMnEhllYqUYpqnLWQfrSEo942PFwjAYKgDXGCIGP1sT7iHGQO214--Pj2LF4S52Rn3p9ck71is_8I89m5anzOndJ8tvlK6EVd-ZS357ceVU-s9yQO8',
      altText: '전통 매듭과 직물 디테일',
    },
  },
  links: {
    purchase: { label: '컬렉션 보기', url: '/kr/collection', isActive: true },
  },
};

const collectionItems = [
  ['백주름 쾌자', '전통 무복의 선에서 영감을 받은 현대적인 아우터'],
  ['전통매듭', '하나의 매듭으로 완성하는 고전적 우아함'],
  ['한복 액세서리', '일상에 품격을 더하는 작고 정교한 조각'],
];

function normalize(data) {
  const images = Object.fromEntries(
    Object.entries(data?.images || fallback.images).map(([key, image]) => [
      key,
      {
        imageUrl: image.imageUrl || image.image_url,
        altText: image.altText || image.alt_text,
      },
    ])
  );
  const links = Object.fromEntries(
    Object.entries(data?.links || fallback.links).map(([key, link]) => [
      key,
      {
        label: link.label,
        url: link.url,
        isActive: Boolean(link.isActive ?? link.is_active),
      },
    ])
  );

  return {
    content: { ...fallback.content, ...(data?.content || {}) },
    images: { ...fallback.images, ...images },
    links: { ...fallback.links, ...links },
  };
}

function externalAttrs(url) {
  return url?.startsWith('/') ? {} : { rel: 'noopener noreferrer', target: '_blank' };
}

export default function HomePage() {
  const [site, setSite] = useState(fallback);

  useEffect(() => {
    let mounted = true;
    fetch('/api/site')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (mounted && data) setSite(normalize(data));
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const { content, images, links } = site;
  const purchase = links.purchase?.isActive && links.purchase.url ? links.purchase : null;
  const contactLinks = Object.entries(links)
    .filter(([key, link]) => key !== 'purchase' && link.isActive && link.url)
    .map(([, link]) => link);

  return (
    <main className="home-page">
      <nav className="top-nav" aria-label="주요 메뉴">
        <a className="brand" href="/">HAEGIN</a>
        <div className="nav-links">
          <a href="/kr/brand">브랜드</a>
          <a href={purchase?.url || '/kr/collection'}>컬렉션</a>
          <a href="#craft">장인정신</a>
          <a href="/stories">저널</a>
          <a href="#contact">문의</a>
        </div>
        <div className="nav-actions">
          <a className="inquiry" href="#contact">문의하기</a>
          <a aria-label="로그인" className="login-icon" href="/login" title="로그인">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="3.25" />
              <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </a>
        </div>
      </nav>

      <section className="hero">
        <img alt={images.hero.altText} src={images.hero.imageUrl} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p>Born from Tradition</p>
          <h1>{content.hero.title}</h1>
          <span>{content.hero.subtitle}</span>
          <div className="hero-actions">
            <a href="/kr/brand">브랜드 소개 보기</a>
            <a href={purchase?.url || '/kr/collection'} {...externalAttrs(purchase?.url)}>
              {purchase?.label || '컬렉션 보기'}
            </a>
          </div>
        </div>
      </section>

      <section className="intro" id="brand">
        <p className="eyebrow">{content.brand.subtitle}</p>
        <h2>{content.brand.title}</h2>
        <p>{content.brand.body}</p>
      </section>

      <section className="split" id="craft">
        <div>
          <p className="eyebrow">{content.product.subtitle}</p>
          <h2>{content.product.title}</h2>
          <p>{content.product.body}</p>
          <a className="text-link" href="/kr/brand">더 자세히 보기</a>
        </div>
        <img alt={images.craft.altText} src={images.craft.imageUrl} />
      </section>

      <section className="collection" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{content.collection.subtitle}</p>
            <h2>{content.collection.title}</h2>
          </div>
          <a href={purchase?.url || '/kr/collection'}>전체 보기</a>
        </div>
        <div className="collection-grid">
          {collectionItems.map(([title, text]) => (
            <article className="collection-item" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">{content.contact.subtitle}</p>
        <h2>{content.contact.title}</h2>
        <p>{content.contact.body}</p>
        <div className="contact-actions">
          {contactLinks.length ? (
            contactLinks.map((link) => (
              <a href={link.url} key={link.url} {...externalAttrs(link.url)}>
                {link.label}
              </a>
            ))
          ) : (
            <a href="mailto:hello@haegin.example">협업 문의하기</a>
          )}
          <a href="/stories">해긴 이야기 보기</a>
        </div>
      </section>

      <style jsx>{`
        .home-page { min-height: 100vh; background: #fbf9fa; color: #1b1b1d; font-family: 'Libre Franklin', Arial, sans-serif; }
        .top-nav { position: fixed; inset: 0 0 auto; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 32px; min-height: 88px; padding: 20px clamp(24px, 6vw, 64px); background: rgba(251,249,250,.88); border-bottom: 1px solid rgba(197,198,205,.45); backdrop-filter: blur(14px); }
        .brand, h1, h2, h3 { color: #0a1525; font-family: 'Source Serif 4', Georgia, serif; }
        .brand { font-size: 32px; font-weight: 600; text-decoration: none; }
        .nav-links, .nav-actions { display: flex; align-items: center; gap: 24px; }
        .nav-links a, .inquiry { color: #44474c; font-size: 14px; font-weight: 700; text-decoration: none; }
        .login-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; color: #0a1525; }
        .login-icon svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.7; }
        .hero { position: relative; min-height: 92vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 120px 24px 72px; text-align: center; }
        .hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.03); }
        .hero-overlay { position: absolute; inset: 0; background: rgba(10,21,37,.24); }
        .hero-content { position: relative; z-index: 1; max-width: 760px; color: #fff; }
        .hero-content p, .eyebrow { margin: 0 0 16px; color: #685d4b; font-size: 14px; font-weight: 800; letter-spacing: .05em; line-height: 1.4; text-transform: uppercase; }
        .hero-content p { color: rgba(255,255,255,.82); }
        .hero-content h1 { margin: 0 0 20px; color: #fff; font-size: clamp(44px, 7vw, 72px); font-weight: 600; line-height: 1.12; }
        .hero-content span { display: block; font-size: 20px; line-height: 1.7; }
        .hero-actions, .contact-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 36px; }
        .hero-actions a, .contact-actions a { min-width: 160px; border: 1px solid #fff; color: #fff; font-size: 14px; font-weight: 800; padding: 16px 24px; text-align: center; text-decoration: none; }
        .hero-actions a:first-child, .contact-actions a:first-child { background: #fff; color: #0a1525; }
        .intro, .split, .collection, .contact { max-width: 1120px; margin: 0 auto; padding: 112px clamp(24px, 6vw, 64px); }
        .intro { text-align: center; }
        .intro h2, .split h2, .collection h2, .contact h2 { margin: 0 0 28px; font-size: clamp(34px, 5vw, 52px); font-weight: 500; line-height: 1.24; }
        .intro p:last-child, .split p, .collection-item p, .contact p { color: #44474c; font-size: 18px; line-height: 1.75; }
        .intro p:last-child { max-width: 760px; margin: 0 auto; }
        .split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, .9fr); gap: 56px; align-items: center; }
        .split img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border: 1px solid #c5c6cd; }
        .text-link { display: inline-block; margin-top: 28px; border-bottom: 1px solid #0a1525; color: #0a1525; font-weight: 800; padding-bottom: 4px; text-decoration: none; }
        .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 32px; }
        .section-heading a { color: #44474c; font-weight: 800; text-decoration: none; }
        .collection-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        .collection-item { min-height: 220px; display: flex; flex-direction: column; justify-content: end; border: 1px solid #c5c6cd; background: #fff; padding: 28px; }
        .collection-item h3 { margin: 0 0 12px; font-size: 28px; font-weight: 500; line-height: 1.25; }
        .collection-item p { margin: 0; }
        .contact { max-width: none; background: #0a1525; color: #fff; text-align: center; }
        .contact h2, .contact .eyebrow { color: #fff; }
        .contact h2 { max-width: 780px; margin-left: auto; margin-right: auto; }
        .contact p { max-width: 720px; margin: 0 auto; color: rgba(255,255,255,.78); }
        @media (max-width: 860px) { .top-nav { gap: 16px; } .nav-links, .inquiry { display: none; } .split, .collection-grid { grid-template-columns: 1fr; } .section-heading { align-items: start; flex-direction: column; } }
      `}</style>
    </main>
  );
}
