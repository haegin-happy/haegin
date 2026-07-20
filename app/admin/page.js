import AdminShell, { requireAdmin } from './admin-shell';
import { getDashboardStats } from '../../lib/cms';

export const metadata = {
  title: 'HAEGIN | Admin',
};

export default async function AdminPage() {
  const session = await requireAdmin();
  const stats = await getDashboardStats();

  return (
    <AdminShell
      title="관리자 홈"
      description={`${session.name || session.userId}님, 홈페이지 콘텐츠를 관리할 수 있습니다.`}
    >
      <div className="admin-grid admin-grid--stats">
        <article>
          <span>전체 게시글</span>
          <strong>{stats.totalPosts}</strong>
        </article>
        <article>
          <span>공개 게시글</span>
          <strong>{stats.publishedPosts}</strong>
        </article>
        <article>
          <span>비공개 게시글</span>
          <strong>{stats.privatePosts}</strong>
        </article>
      </div>

      <div className="admin-panel">
        <h2>빠른 작업</h2>
        <div className="admin-actions">
          <a className="admin-button admin-button--primary" href="/admin/posts/new">
            새 게시글 작성
          </a>
          <a className="admin-button" href="/">
            홈페이지 바로가기
          </a>
          <a className="admin-button" href="/admin/content">
            문구와 링크 수정
          </a>
        </div>
      </div>

      <div className="admin-panel">
        <h2>최근 상태</h2>
        <p>
          최근 게시글:{' '}
          {stats.recentPost ? stats.recentPost.title : '아직 게시글이 없습니다.'}
        </p>
        <p>
          최근 이미지:{' '}
          {stats.recentImage ? stats.recentImage.altText || stats.recentImage.alt_text : '기본 이미지를 사용 중입니다.'}
        </p>
      </div>
    </AdminShell>
  );
}
