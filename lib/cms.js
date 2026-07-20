import { getDb } from './db';

export const defaultContent = {
  hero: {
    sectionKey: 'hero',
    title: '조용한 우아함을 입다',
    subtitle: '전통의 선을 오늘의 일상으로 이어갑니다.',
    body: '해긴은 오래 입고 오래 기억되는 옷을 만듭니다.',
  },
  brand: {
    sectionKey: 'brand',
    title: '긴 시간 오래 입고, 오래 기억되는 옷을 만듭니다.',
    subtitle: 'The Purpose',
    body:
      'HAEGIN은 일상의 분주함 속에서도 잃지 말아야 할 고결함과 평온함을 제안합니다. 시간의 흐름에도 변하지 않는 가치를 정제된 선과 편안한 착용감 안에 담습니다.',
  },
  product: {
    sectionKey: 'product',
    title: '손끝에서 완성되는 시간',
    subtitle: 'Craft',
    body:
      '천연 린넨과 실크의 결을 살리고, 몸의 움직임을 고려한 입체적인 실루엣으로 HAEGIN만의 조용한 존재감을 완성합니다.',
  },
  collection: {
    sectionKey: 'collection',
    title: '고유한 아름다움',
    subtitle: 'Lookbook 2024',
    body: '전통 무복의 선, 매듭의 디테일, 일상에 어울리는 절제된 형태를 소개합니다.',
  },
  contact: {
    sectionKey: 'contact',
    title: '전통과 일상이 만나는 순간을 함께 만듭니다.',
    subtitle: 'Contact',
    body: '협업과 구매, 문의는 아래 외부 링크를 통해 이어집니다.',
  },
  footer: {
    sectionKey: 'footer',
    title: '오랜 행복을 짓는 옷',
    subtitle: 'HAEGIN',
    body: '© 2024 HAEGIN. Clothes for long-lasting happiness.',
  },
};

export const defaultImages = {
  hero: {
    imageKey: 'hero',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEseei3G1CMhcs9eNGeieW3qeaZUByE_lzBnbswnbFMNblMdCq1K61wN9Q9-CyfGabX4xW4yOWxmCA7zpV8HMsKO5QmNq4oXJVeQ1p8EUPDCFGfhGjHwHDeqWV6bSqmURCVjEc2cy8thQT7H4oYgGiilBOxaS3eLib6Oz_menTwIa65lLE-sUBi3ZDc6Pp2k1-D4GxpSu4F_47LZnqg2E-3DEfzvw0HlBVFtOz8AoVnc7tsP8Wo2bYbUO3QiMlDHlm4AhYlRbUN10',
    altText: '한옥 공간에서 촬영한 HAEGIN 의상',
    width: 1600,
    height: 1000,
  },
  craft: {
    imageKey: 'craft',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0C47JOStMzFg2b6v3P7j4eNHd_dxcY2VB_LikY0alOXkhTPddn0BkwiRwYcSVqGZEThEfyp8E9uY3bVPqsehvC-fFWMzyJmed-cIxZqCb_Xddk1GezJrn92p9BtnG1IZ2NtvQoZF7jbcoyV92KKVzgUDv0iMnEhllYqUYpqnLWQfrSEo942PFwjAYKgDXGCIGP1sT7iHGQO214--Pj2LF4S52Rn3p9ck71is_8I89m5anzOndJ8tvlK6EVd-ZS357ceVU-s9yQO8',
    altText: '전통 매듭과 직물 디테일',
    width: 1200,
    height: 1500,
  },
};

export const defaultLinks = {
  purchase: {
    linkKey: 'purchase',
    label: '구매 페이지로 이동',
    url: '/kr/collection',
    isActive: true,
  },
  kakao: {
    linkKey: 'kakao',
    label: '카카오톡으로 문의하기',
    url: '',
    isActive: false,
  },
  naver: {
    linkKey: 'naver',
    label: '네이버 톡톡 문의',
    url: '',
    isActive: false,
  },
  instagram: {
    linkKey: 'instagram',
    label: '인스타그램 보기',
    url: '',
    isActive: false,
  },
  blog: {
    linkKey: 'blog',
    label: '블로그 보기',
    url: '',
    isActive: false,
  },
};

export function normalizeSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function isValidExternalUrl(value) {
  if (!value) {
    return true;
  }

  if (String(value).startsWith('/')) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function byKey(rows, keyName, defaults) {
  const result = { ...defaults };

  for (const row of rows || []) {
    result[row[keyName]] = { ...result[row[keyName]], ...row };
  }

  return result;
}

async function safeExecute(query, fallback) {
  try {
    const db = getDb();
    return await query(db);
  } catch (error) {
    if (error?.message === 'Missing Turso environment variables.') {
      return fallback;
    }

    throw error;
  }
}

export async function getSiteContent() {
  return safeExecute(async (db) => {
    const result = await db.execute('SELECT * FROM site_content');
    return byKey(result.rows, 'section_key', defaultContent);
  }, defaultContent);
}

export async function getSiteImages() {
  return safeExecute(async (db) => {
    const result = await db.execute('SELECT * FROM site_images');
    return byKey(result.rows, 'image_key', defaultImages);
  }, defaultImages);
}

export async function getExternalLinks() {
  return safeExecute(async (db) => {
    const result = await db.execute('SELECT * FROM external_links');
    return byKey(result.rows, 'link_key', defaultLinks);
  }, defaultLinks);
}

export async function getPublishedPosts({ limit } = {}) {
  return safeExecute(async (db) => {
    const result = await db.execute({
      sql: `
        SELECT *
        FROM posts
        WHERE status = 'published'
          AND (published_at IS NULL OR published_at <= datetime('now'))
        ORDER BY COALESCE(published_at, updated_at) DESC
        LIMIT ?
      `,
      args: [limit || 50],
    });
    return result.rows;
  }, []);
}

export async function getAllPosts() {
  return safeExecute(async (db) => {
    const result = await db.execute(`
      SELECT *
      FROM posts
      ORDER BY updated_at DESC
    `);
    return result.rows;
  }, []);
}

export async function getPostBySlug(slug) {
  return safeExecute(async (db) => {
    const result = await db.execute({
      sql: `
        SELECT *
        FROM posts
        WHERE slug = ?
          AND status = 'published'
          AND (published_at IS NULL OR published_at <= datetime('now'))
        LIMIT 1
      `,
      args: [slug],
    });
    return result.rows[0] || null;
  }, null);
}

export async function getPostById(id) {
  return safeExecute(async (db) => {
    const result = await db.execute({
      sql: 'SELECT * FROM posts WHERE id = ? LIMIT 1',
      args: [id],
    });
    return result.rows[0] || null;
  }, null);
}

export async function getDashboardStats() {
  const posts = await getAllPosts();
  const images = await getSiteImages();

  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter((post) => post.status === 'published').length,
    privatePosts: posts.filter((post) => post.status === 'private').length,
    recentPost: posts[0] || null,
    recentImage: Object.values(images)[0] || null,
  };
}
