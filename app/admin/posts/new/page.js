import AdminShell, { requireAdmin } from '../../admin-shell';
import PostForm from '../post-form';

export const metadata = {
  title: 'HAEGIN | New Post',
};

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <AdminShell title="새 게시글 작성" description="초안으로 저장한 뒤 공개 상태로 전환할 수 있습니다.">
      <PostForm />
    </AdminShell>
  );
}
