import { notFound } from 'next/navigation';
import AdminShell, { requireAdmin } from '../../../admin-shell';
import { getPostById } from '../../../../../lib/cms';
import PostForm from '../../post-form';

export const metadata = {
  title: 'HAEGIN | Edit Post',
};

export default async function EditPostPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <AdminShell title="게시글 수정" description="수정 내용은 저장 후 공개 페이지에 반영됩니다.">
      <PostForm post={post} />
    </AdminShell>
  );
}
