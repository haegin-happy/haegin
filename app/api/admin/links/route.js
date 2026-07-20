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
      return Response.json({ message: '저장할 링크가 없습니다.' }, { status: 400 });
    }

    const db = getDb();
    for (const item of items) {
      const linkKey = String(item.linkKey || '').trim();
      const label = String(item.label || '').trim();
      const url = String(item.url || '').trim();
      const isActive = item.isActive ? 1 : 0;

      if (!linkKey || !label) {
        return Response.json({ message: '링크 키와 라벨은 필수입니다.' }, { status: 400 });
      }

      if (!isValidExternalUrl(url)) {
        return Response.json({ message: `${label} URL 형식이 올바르지 않습니다.` }, { status: 400 });
      }

      await db.execute({
        sql: `
          INSERT INTO external_links (link_key, label, url, is_active, updated_at)
          VALUES (?, ?, ?, ?, datetime('now'))
          ON CONFLICT(link_key) DO UPDATE SET
            label = excluded.label,
            url = excluded.url,
            is_active = excluded.is_active,
            updated_at = datetime('now')
        `,
        args: [linkKey, label, url, isActive],
      });
    }

    return Response.json({ message: '외부 링크를 저장했습니다.' });
  } catch (error) {
    if (error?.message === 'Missing Turso environment variables.') {
      return Response.json(
        { message: 'Turso 환경변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    return Response.json({ message: '링크 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
