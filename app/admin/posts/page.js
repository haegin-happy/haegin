import AdminShell, { requireAdmin } from '../admin-shell';
import { getAllPosts } from '../../../lib/cms';
import PostsTable from './posts-table';

export const metadata = {
  title: 'HAEGIN | Posts Admin',
};

export default async function AdminPostsPage() {
  await requireAdmin();
  const posts = await getAllPosts();

  return (
    <AdminShell title="게시글 관리" description="브랜드 소식과 제품 이야기를 작성하고 공개 상태를 관리합니다.">
      <div className="admin-panel">
        <div className="admin-actions">
          <a className="admin-button admin-button--primary" href="/admin/posts/new">
            새 게시글 작성
          </a>
          <a className="admin-button" href="/stories">
            공개 게시글 보기
          </a>
        </div>
      </div>
      <PostsTable posts={posts} />
    </AdminShell>
  );
}
