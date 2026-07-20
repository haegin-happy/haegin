import { getDb } from '../../../../lib/db';
import { isValidExternalUrl, normalizeSlug } from '../../../../lib/cms';
import { requireAdminApi } from '../../../../lib/admin';

export const runtime = 'nodejs';

const statuses = new Set(['draft', 'published', 'private']);

function cleanText(value) {
  return String(value || '').trim();
}

function postPayload(body) {
  const title = cleanText(body.title);
  const slug = normalizeSlug(body.slug || title);
  const content = cleanText(body.content);
  const featuredImageUrl = cleanText(body.featuredImageUrl);

  if (!title || !slug || !content) {
    return { error: '제목, 슬러그, 본문은 필수입니다.' };
  }

  if (featuredImageUrl && !isValidExternalUrl(featuredImageUrl)) {
    return { error: '대표 이미지 URL 형식이 올바르지 않습니다.' };
  }

  const status = statuses.has(body.status) ? body.status : 'draft';

  return {
    data: {
      id: body.id ? Number(body.id) : null,
      title,
      slug,
      excerpt: cleanText(body.excerpt),
      content,
      featuredImageUrl,
      featuredImageAlt: cleanText(body.featuredImageAlt),
      category: cleanText(body.category),
      status,
      publishedAt: cleanText(body.publishedAt),
      scheduledAt: cleanText(body.scheduledAt),
      seoTitle: cleanText(body.seoTitle),
      seoDescription: cleanText(body.seoDescription),
    },
  };
}

export async function POST(request) {
  const { response } = await requireAdminApi();
  if (response) return response;

  try {
    const body = await request.json();
    const { data, error } = postPayload(body);
    if (error) return Response.json({ message: error }, { status: 400 });

    const db = getDb();
    await db.execute({
      sql: `
        INSERT INTO posts (
          title, slug, excerpt, content, featured_image_url, featured_image_alt,
          category, status, published_at, scheduled_at, seo_title, seo_description,
          created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `,
      args: [
        data.title,
        data.slug,
        data.excerpt,
        data.content,
        data.featuredImageUrl,
        data.featuredImageAlt,
        data.category,
        data.status,
        data.publishedAt || null,
        data.scheduledAt || null,
        data.seoTitle,
        data.seoDescription,
      ],
    });

    return Response.json({ message: '게시글을 작성했습니다.' }, { status: 201 });
  } catch (error) {
    if (String(error?.message || '').includes('UNIQUE constraint failed')) {
      return Response.json({ message: '이미 사용 중인 슬러그입니다.' }, { status: 409 });
    }

    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json({ message: 'Turso 환경변수가 설정되지 않았습니다.' }, { status: 500 });
    }

    return Response.json({ message: '게시글 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PUT(request) {
  const { response } = await requireAdminApi();
  if (response) return response;

  try {
    const body = await request.json();
    const { data, error } = postPayload(body);
    if (error) return Response.json({ message: error }, { status: 400 });
    if (!data.id) return Response.json({ message: '게시글 ID가 필요합니다.' }, { status: 400 });

    const db = getDb();
    await db.execute({
      sql: `
        UPDATE posts SET
          title = ?, slug = ?, excerpt = ?, content = ?,
          featured_image_url = ?, featured_image_alt = ?, category = ?,
          status = ?, published_at = ?, scheduled_at = ?,
          seo_title = ?, seo_description = ?, updated_at = datetime('now')
        WHERE id = ?
      `,
      args: [
        data.title,
        data.slug,
        data.excerpt,
        data.content,
        data.featuredImageUrl,
        data.featuredImageAlt,
        data.category,
        data.status,
        data.publishedAt || null,
        data.scheduledAt || null,
        data.seoTitle,
        data.seoDescription,
        data.id,
      ],
    });

    return Response.json({ message: '게시글을 저장했습니다.' });
  } catch (error) {
    if (String(error?.message || '').includes('UNIQUE constraint failed')) {
      return Response.json({ message: '이미 사용 중인 슬러그입니다.' }, { status: 409 });
    }

    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json({ message: 'Turso 환경변수가 설정되지 않았습니다.' }, { status: 500 });
    }

    return Response.json({ message: '게시글 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { response } = await requireAdminApi();
  if (response) return response;

  try {
    const { id } = await request.json();
    if (!id) return Response.json({ message: '게시글 ID가 필요합니다.' }, { status: 400 });

    const db = getDb();
    await db.execute({ sql: 'DELETE FROM posts WHERE id = ?', args: [Number(id)] });
    return Response.json({ message: '게시글을 삭제했습니다.' });
  } catch (error) {
    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json({ message: 'Turso 환경변수가 설정되지 않았습니다.' }, { status: 500 });
    }

    return Response.json({ message: '게시글 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
