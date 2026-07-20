import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts, getExternalLinks } from '../../../lib/cms';
import '../stories.css';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'HAEGIN | Story' };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const [post, posts, links] = await Promise.all([
    getPostBySlug(slug),
    getPublishedPosts(),
    getExternalLinks(),
  ]);

  if (!post) {
    notFound();
  }

  const index = posts.findIndex((item) => item.slug === post.slug);
  const previous = index > 0 ? posts[index - 1] : null;
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
  const purchase = links.purchase;

  return (
    <main className="stories-page story-detail">
      <nav className="stories-nav">
        <a href="/">HAEGIN</a>
        <a href="/stories">목록</a>
      </nav>
      <article>
        <header className="stories-header">
          <p>{post.category || 'Story'}</p>
          <h1>{post.title}</h1>
          <span>{post.published_at || post.updated_at}</span>
        </header>
        {post.featured_image_url ? (
          <img
            alt={post.featured_image_alt || post.title}
            className="story-hero"
            src={post.featured_image_url}
          />
        ) : null}
        <div className="story-body">
          {String(post.content || '')
            .split('\n')
            .map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
        </div>
        <div className="story-links">
          {previous ? <a href={`/stories/${previous.slug}`}>이전 글</a> : null}
          <a href="/stories">목록으로 돌아가기</a>
          {next ? <a href={`/stories/${next.slug}`}>다음 글</a> : null}
          {purchase?.isActive && purchase.url ? (
            <a href={purchase.url} rel="noopener noreferrer" target={purchase.url.startsWith('/') ? undefined : '_blank'}>
              {purchase.label}
            </a>
          ) : null}
        </div>
      </article>
    </main>
  );
}
