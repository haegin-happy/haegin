import AdminShell, { requireAdmin } from '../admin-shell';
import { getExternalLinks, getSiteContent } from '../../../lib/cms';
import ContentManager from './content-manager';

export const metadata = {
  title: 'HAEGIN | Content Admin',
};

export default async function AdminContentPage() {
  await requireAdmin();
  const content = await getSiteContent();
  const links = await getExternalLinks();

  return (
    <AdminShell
      title="홈페이지 문구와 링크"
      description="메인 화면 문구와 외부 구매/문의 링크를 수정합니다."
    >
      <ContentManager content={content} links={links} />
    </AdminShell>
  );
}
