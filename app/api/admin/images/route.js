import { getDb } from '../../../../lib/db';
import { isValidExternalUrl } from '../../../../lib/cms';
import { requireAdminApi } from '../../../../lib/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const { response } = await requireAdminApi();
  if (response) return response;

  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!items.length) {
      return Response.json({ message: '저장할 이미지가 없습니다.' }, { status: 400 });
    }

    const db = getDb();
    for (const item of items) {
      const imageKey = String(item.imageKey || '').trim();
      const imageUrl = String(item.imageUrl || '').trim();
      const altText = String(item.altText || '').trim();
      const width = Number(item.width || 0) || null;
      const height = Number(item.height || 0) || null;

      if (!imageKey || !imageUrl || !altText) {
        return Response.json(
          { message: '이미지 키, URL, 대체 텍스트는 필수입니다.' },
          { status: 400 }
        );
      }

      if (!isValidExternalUrl(imageUrl)) {
        return Response.json({ message: `${imageKey} 이미지 URL 형식이 올바르지 않습니다.` }, { status: 400 });
      }

      await db.execute({
        sql: `
          INSERT INTO site_images (image_key, image_url, alt_text, width, height, updated_at)
          VALUES (?, ?, ?, ?, ?, datetime('now'))
          ON CONFLICT(image_key) DO UPDATE SET
            image_url = excluded.image_url,
            alt_text = excluded.alt_text,
            width = excluded.width,
            height = excluded.height,
            updated_at = datetime('now')
        `,
        args: [imageKey, imageUrl, altText, width, height],
      });
    }

    return Response.json({ message: '이미지를 저장했습니다.' });
  } catch (error) {
    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json(
        { message: 'Turso 환경변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    return Response.json({ message: '이미지 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
