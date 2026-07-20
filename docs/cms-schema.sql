-- HAEGIN admin CMS schema for Turso/libSQL.

CREATE TABLE IF NOT EXISTS site_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  body TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_key TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS external_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  url TEXT,
  is_active INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'private')),
  published_at TEXT,
  scheduled_at TEXT,
  seo_title TEXT,
  seo_description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS post_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  tag TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(post_id, tag),
  FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_site_content_section_key ON site_content(section_key);
CREATE INDEX IF NOT EXISTS idx_site_images_image_key ON site_images(image_key);
CREATE INDEX IF NOT EXISTS idx_external_links_link_key ON external_links(link_key);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_updated_at ON posts(updated_at);
CREATE INDEX IF NOT EXISTS idx_post_tags_post_id ON post_tags(post_id);

-- Initial content rows.
INSERT INTO site_content (section_key, title, subtitle, body)
VALUES
  ('hero', '조용한 우아함을 입다', '전통의 선을 오늘의 일상으로 이어갑니다.', '해긴은 오래 입고 오래 기억되는 옷을 만듭니다.'),
  ('brand', '긴 시간 오래 입고, 오래 기억되는 옷을 만듭니다.', 'The Purpose', 'HAEGIN은 일상의 분주함 속에서도 잃지 말아야 할 고결함과 평온함을 제안합니다.'),
  ('product', '손끝에서 완성되는 시간', 'Craft', '천연 린넨과 실크의 결을 살리고, 몸의 움직임을 고려한 입체적인 실루엣을 완성합니다.'),
  ('collection', '고유한 아름다움', 'Lookbook 2024', '전통 무복의 선, 매듭의 디테일, 일상에 어울리는 절제된 형태를 소개합니다.'),
  ('contact', '전통과 일상이 만나는 순간을 함께 만듭니다.', 'Contact', '협업과 구매, 문의는 아래 외부 링크를 통해 이어집니다.'),
  ('footer', '오랜 행복을 짓는 옷', 'HAEGIN', '© 2024 HAEGIN. Clothes for long-lasting happiness.')
ON CONFLICT(section_key) DO NOTHING;

INSERT INTO external_links (link_key, label, url, is_active)
VALUES
  ('purchase', '구매 페이지로 이동', '/kr/collection', 1),
  ('kakao', '카카오톡으로 문의하기', '', 0),
  ('naver', '네이버 톡톡 문의', '', 0),
  ('instagram', '인스타그램 보기', '', 0),
  ('blog', '블로그 보기', '', 0)
ON CONFLICT(link_key) DO NOTHING;
