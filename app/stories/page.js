import { getPublishedPosts } from '../../lib/cms';
import './stories.css';

export const metadata = {
  title: 'HAEGIN | Stories',
  description: '해긴의 브랜드 소식과 제품 이야기',
};

export default async function StoriesPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="stories-page">
      <nav className="stories-nav">
        <a href="/">HAEGIN</a>
        <a href="/login">로그인</a>
      </nav>
      <header className="stories-header">
        <p>Stories</p>
        <h1>해긴의 이야기</h1>
      </header>
      <section className="stories-grid">
        {posts.length ? (
          posts.map((post) => (
            <article className="story-card" key={post.id}>
              {post.featured_image_url ? (
                <img alt={post.featured_image_alt || post.title} src={post.featured_image_url} />
              ) : null}
              <span>{post.category || 'HAEGIN'}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <small>{post.published_at || post.updated_at}</small>
              <a href={`/stories/${post.slug}`}>자세히 보기</a>
            </article>
          ))
        ) : (
          <p>아직 공개된 게시글이 없습니다.</p>
        )}
      </section>
    </main>
  );
}
