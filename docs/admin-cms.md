# HAEGIN Admin CMS

## Access

- Admin login: `/admin/login`
- Admin home: `/admin`
- Content and external links: `/admin/content`
- Images: `/admin/images`
- Posts: `/admin/posts`
- New post: `/admin/posts/new`
- Public stories: `/stories`

## Admin Account

The admin login uses the existing member authentication flow.

1. Create a member through the existing signup flow or directly in Turso.
2. Make that member an admin:

```sql
UPDATE members SET role = 'admin' WHERE user_id = 'your_admin_id';
```

Only users with `role = 'admin'` can access `/admin` and admin APIs.

## Environment Variables

```env
TURSO_VALUE_URL=libsql://your-database-name-your-org.turso.io
TURSO_CURRENT_AUTH_TOKEN=your-turso-auth-token
HAEGIN_AUTH_SECRET=replace-with-a-long-random-session-secret
```

Do not expose these values in client code.

## Database Migration

Run the SQL in:

- `docs/turso-members-schema.sql`
- `docs/cms-schema.sql`

The CMS tables are:

- `site_content`
- `site_images`
- `external_links`
- `posts`
- `post_tags`

## Image Storage

The first CMS version stores image URLs in Turso and does not persist uploaded files to the local filesystem. This is intentional because Vercel deployments do not provide durable local file storage.

Recommended next storage options:

- Vercel Blob if the site is deployed on Vercel and you want simple project-native storage.
- Cloudinary if image transformations and responsive delivery are important.
- Supabase Storage if the project later moves more data into Supabase.

After choosing a storage provider, add an upload API that stores files externally and writes only the final image URL and alt text to `site_images` or `posts`.

## Editing Content

Use `/admin/content` to edit:

- Main hero title and subtitle
- Brand intro title and body
- Product/craft title and body
- Collection title
- Contact title and body
- External purchase and inquiry links

External links must start with `http://`, `https://`, or `/`. Inactive links are hidden from public buttons.

## Editing Images

Use `/admin/images` to update:

- Main hero image
- Craft/product intro image

Each image requires:

- Image URL
- Alt text
- Optional recommended width and height

## Editing Posts

Use `/admin/posts` to manage posts.

Supported statuses:

- `draft`: hidden from public pages
- `published`: visible on `/stories`
- `private`: hidden from public pages

Public pages render post content as text paragraphs, not raw HTML. This avoids XSS from admin-entered content.

## Deployment

1. Set all environment variables in Vercel.
2. Run Turso migrations before testing admin saves.
3. Deploy normally.
4. Promote one member to `admin`.
5. Log in at `/admin/login`.

## Verified

- `npm.cmd run build`
- Public home route `/`
- Public CMS API `/api/site`
- Public stories list `/stories`
- Admin login `/admin/login`
- Protected admin routes redirect when logged out
