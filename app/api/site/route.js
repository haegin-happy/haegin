import { getExternalLinks, getSiteContent, getSiteImages } from '../../../lib/cms';

export async function GET() {
  const [content, images, links] = await Promise.all([
    getSiteContent(),
    getSiteImages(),
    getExternalLinks(),
  ]);

  const publicLinks = Object.fromEntries(
    Object.entries(links).filter(([, link]) => Boolean(link.isActive ?? link.is_active))
  );

  return Response.json({ content, images, links: publicLinks });
}
