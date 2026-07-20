import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const members = sqliteTable(
  'members',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id').notNull().unique(),
    name: text('name').notNull(),
    passwordHash: text('password_hash').notNull(),
    phone: text('phone').notNull().unique(),
    role: text('role', { enum: ['member', 'admin'] }).notNull().default('member'),
    createdAt: text('created_at').notNull().default("datetime('now')"),
    updatedAt: text('updated_at').notNull().default("datetime('now')"),
  },
  (table) => ({
    userIdIndex: uniqueIndex('idx_members_user_id').on(table.userId),
    phoneIndex: uniqueIndex('idx_members_phone').on(table.phone),
  })
);

export const siteContent = sqliteTable(
  'site_content',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sectionKey: text('section_key').notNull().unique(),
    title: text('title').notNull(),
    subtitle: text('subtitle'),
    body: text('body'),
    updatedAt: text('updated_at').notNull().default("datetime('now')"),
  },
  (table) => ({
    sectionKeyIndex: uniqueIndex('idx_site_content_section_key').on(table.sectionKey),
  })
);

export const siteImages = sqliteTable(
  'site_images',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    imageKey: text('image_key').notNull().unique(),
    imageUrl: text('image_url').notNull(),
    altText: text('alt_text').notNull(),
    width: integer('width'),
    height: integer('height'),
    updatedAt: text('updated_at').notNull().default("datetime('now')"),
  },
  (table) => ({
    imageKeyIndex: uniqueIndex('idx_site_images_image_key').on(table.imageKey),
  })
);

export const externalLinks = sqliteTable(
  'external_links',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    linkKey: text('link_key').notNull().unique(),
    label: text('label').notNull(),
    url: text('url'),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(false),
    updatedAt: text('updated_at').notNull().default("datetime('now')"),
  },
  (table) => ({
    linkKeyIndex: uniqueIndex('idx_external_links_link_key').on(table.linkKey),
  })
);

export const posts = sqliteTable(
  'posts',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    content: text('content').notNull(),
    featuredImageUrl: text('featured_image_url'),
    featuredImageAlt: text('featured_image_alt'),
    category: text('category'),
    status: text('status', { enum: ['draft', 'published', 'private'] })
      .notNull()
      .default('draft'),
    publishedAt: text('published_at'),
    scheduledAt: text('scheduled_at'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    createdAt: text('created_at').notNull().default("datetime('now')"),
    updatedAt: text('updated_at').notNull().default("datetime('now')"),
  },
  (table) => ({
    slugIndex: uniqueIndex('idx_posts_slug').on(table.slug),
  })
);

export const postTags = sqliteTable(
  'post_tags',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tag: text('tag').notNull(),
    createdAt: text('created_at').notNull().default("datetime('now')"),
  },
  (table) => ({
    postTagIndex: uniqueIndex('idx_post_tags_post_id_tag').on(table.postId, table.tag),
  })
);
