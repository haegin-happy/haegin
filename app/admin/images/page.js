import AdminShell, { requireAdmin } from '../admin-shell';
import { getSiteImages } from '../../../lib/cms';
import ImageManager from './image-manager';

export const metadata = {
  title: 'HAEGIN | Image Admin',
};

export default async function AdminImagesPage() {
  await requireAdmin();
  const images = await getSiteImages();

  return (
    <AdminShell
      title="사진 관리"
      description="현재 버전은 Vercel 배포에 안전한 외부 이미지 URL 방식으로 이미지를 교체합니다."
    >
      <ImageManager images={images} />
    </AdminShell>
  );
}
