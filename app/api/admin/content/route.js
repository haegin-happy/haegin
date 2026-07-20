import { getDb } from '../../../../lib/db';
import { requireAdminApi } from '../../../../lib/admin';

export const runtime = 'nodejs';

export async function POST(request) {
  const { response } = await requireAdminApi();
  if (response) return response;

  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!items.length) {
      return Response.json({ message: '저장할 문구가 없습니다.' }, { status: 400 });
    }

    const db = getDb();
    for (const item of items) {
      const sectionKey = String(item.sectionKey || '').trim();
      const title = String(item.title || '').trim();
      const subtitle = String(item.subtitle || '').trim();
      const textBody = String(item.body || '').trim();

      if (!sectionKey || !title) {
        return Response.json(
          { message: '섹션 키와 제목은 필수입니다.' },
          { status: 400 }
        );
      }

      await db.execute({
        sql: `
          INSERT INTO site_content (section_key, title, subtitle, body, updated_at)
          VALUES (?, ?, ?, ?, datetime('now'))
          ON CONFLICT(section_key) DO UPDATE SET
            title = excluded.title,
            subtitle = excluded.subtitle,
            body = excluded.body,
            updated_at = datetime('now')
        `,
        args: [sectionKey, title, subtitle, textBody],
      });
    }

    return Response.json({ message: '홈페이지 문구를 저장했습니다.' });
  } catch (error) {
    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json(
        { message: 'Turso 환경변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    return Response.json({ message: '문구 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
