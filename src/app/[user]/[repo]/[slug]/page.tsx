import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeLoader } from '@/components/ThemeLoader';
import { fetchBlogConfig, fetchRepo, findFileInRepo } from '@/lib/github';
import { parseMarkdown, formatDate } from '@/lib/markdown';
import type { BlogPost, BlogConfig } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { BlogHeader } from '@/components/blog/Header';
import { BlogFooter } from '@/components/blog/Footer';
import { RelatedPosts } from '@/components/RelatedPosts';
import { fetchBlogFiles } from '@/lib/github';

interface PageProps {
  params: Promise<{ user: string; repo: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { user, repo, slug } = await params;
  let config: BlogConfig | null = null;
  let postTitle = slug;
  let siteTitle = repo;

  try {
    const configPromise = fetchBlogConfig(user, repo).catch(() => null);
    const repoPromise = fetchRepo(user, repo).catch(() => null);
    
    const [configResult, repoResult] = await Promise.all([configPromise, repoPromise]);
    
    config = configResult;
    if (repoResult) siteTitle = repoResult.name;
    if (config?.title) siteTitle = config.title;

    // Try fetching content to get title using the optimized finder
    const fileResult = await findFileInRepo(user, repo, slug);
    
    if (fileResult) {
      const { parseMarkdown } = await import('@/lib/markdown');
      const post = parseMarkdown(fileResult.content, slug);
      if (post.title) postTitle = post.title;
    }
  } catch (e) {
    // ignore
  }

  return {
    title: `${postTitle} - ${siteTitle}`,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { user, repo, slug } = await params;

  let config: BlogConfig = { theme: 'light' };
  let post: BlogPost | null = null;
  let allPosts: BlogPost[] = [];
  let error: string | null = null;
  let repoInfo: any = null;
  let isPage = false;

  try {
    const configPromise = fetchBlogConfig(user, repo).catch(() => null);
    const repoPromise = fetchRepo(user, repo).catch(() => null);
    // Fetch all files to get related posts
    const filesPromise = fetchBlogFiles(user, repo).catch(() => []);
    
    const [configResult, repoResult, filesResult] = await Promise.all([
      configPromise, 
      repoPromise,
      filesPromise
    ]);
    
    if (configResult) {
      config = configResult;
    }

    repoInfo = repoResult;

    // Use optimized finder to get file content and path
    const fileResult = await findFileInRepo(user, repo, slug);
    
    if (fileResult) {
      // Determine if it's a page based on path
      if (fileResult.path.includes('/page/')) {
        isPage = true;
      }
      post = parseMarkdown(fileResult.content, slug);
    } else {
      error = 'ARTICLE_NOT_FOUND';
    }

    // Process all posts for related section
    if (filesResult.length > 0) {
      const fileContents = await Promise.all(
        filesResult.map(async (file) => {
          // We only need basic info for related posts, but we need content for metadata parsing
          // This might be slow if there are many posts. 
          // Optimization: fetch content only for a few random files?
          // For now, let's try to fetch all to filter correctly.
          try {
            const response = await fetch(file.download_url);
            const content = await response.text();
            const slug = file.name.replace('.md', '');
            return parseMarkdown(content, slug);
          } catch {
            return null;
          }
        })
      );
      allPosts = fileContents.filter((p): p is BlogPost => p !== null);
    }

  } catch (err: any) {
    console.error('Error in BlogPostPage:', err);
    if (err.message === 'REPO_NOT_FOUND') {
      error = 'REPO_NOT_FOUND';
    } else {
      error = 'UNKNOWN_ERROR';
    }
  }

  const themeClass = config.theme || 'light';
  const lang = config.language || 'en';
  const t = getTranslation(lang);
  const blogTitle = config.title || repoInfo?.name || repo;
  const blogDescription = config.description || repoInfo?.description;

  // Translate error message
  if (error) {
    if (error === 'REPO_NOT_FOUND') error = t.repoNotFound;
    else if (error === 'ARTICLE_NOT_FOUND') error = t.articleNotFound;
    else error = t.tryAgain;
  }

  // Default Nav if not provided
  const navLinks = config.nav || [
    { label: 'Home', url: `/${user}/${repo}` },
    { label: 'GitHub', url: repoInfo?.html_url || `https://github.com/${user}/${repo}` },
  ];

  return (
    <>
      <ThemeLoader theme={themeClass} />
      <div className={`min-h-screen selection:bg-black selection:text-white pixel-bg-grid ${themeClass}`}>
        <BlogHeader 
          user={user} 
          repo={repo} 
          blogTitle={blogTitle} 
          navLinks={navLinks} 
        />

        <main className="max-w-7xl mx-auto px-6 py-12 pt-32 lg:pt-40">
          <div className="container mx-auto max-w-4xl">
            <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
              <Link href={`/${user}/${repo}`}>← {t.backToList}</Link>
            </Button>

            {error ? (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">{t.error}</h1>
                <p className="text-muted-foreground mb-8">{error === 'UNKNOWN_ERROR' ? t.tryAgain : error}</p>
                <Button asChild>
                  <Link href={`/${user}/${repo}`}>{t.backToList}</Link>
                </Button>
              </div>
            ) : post ? (
              <article className={isPage ? "max-w-3xl mx-auto" : ""}>
                {post.image && !isPage && (
                  <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden border-2 border-border shadow-pixel">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt || post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                
                <header className={`mb-8 ${isPage ? 'text-center border-b-2 border-border pb-8' : ''}`}>
                  {!isPage && (
                    <div className="flex items-center gap-2 mb-4">
                      {post.category && (
                        <Badge variant="secondary" className="rounded-sm">
                          <Link href={`/${user}/${repo}/category/${post.category}`} className="hover:underline">
                            {post.category}
                          </Link>
                        </Badge>
                      )}
                      {post.featured && (
                        <Badge className="rounded-sm">{t.featured}</Badge>
                      )}
                    </div>
                  )}
                  
                  <h1 className={`font-bold mb-4 ${isPage ? 'text-4xl uppercase' : 'text-4xl md:text-5xl leading-tight'}`}>
                    {post.title}
                  </h1>
                  
                  {!isPage && (
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <time>{formatDate(post.date, lang)}</time>
                      {/* Author removed from frontmatter, using global config author if needed, but per request remove repo info/author from post meta if redundant */}
                    </div>
                  )}
                  
                  {post.description && !isPage && (
                    <p className="mt-4 text-lg text-muted-foreground border-l-4 border-primary pl-4 italic">{post.description}</p>
                  )}
                </header>
                
                <div 
                  className={`prose prose-lg dark:prose-invert max-w-none 
                    prose-img:rounded-md prose-img:border-2 prose-img:border-border 
                    prose-headings:font-bold 
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    ${isPage ? 'prose-p:text-justify' : ''}`} 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
                
                <div className="mt-12 pt-8">
                   {/* Tags removed as per request */}
                  <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
                    <Link href={`/${user}/${repo}`}>← {t.backToList}</Link>
                  </Button>
                </div>
              </article>
            ) : (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">{t.articleNotFound}</h1>
                <Button asChild>
                  <Link href={`/${user}/${repo}`}>{t.backToList}</Link>
                </Button>
              </div>
            )}

            {!isPage && !error && allPosts.length > 0 && (
              <RelatedPosts 
                currentSlug={slug}
                posts={allPosts}
                user={user}
                repo={repo}
                lang={lang}
              />
            )}
          </div>
        </main>

        <BlogFooter 
          user={user} 
          repo={repo} 
          config={config} 
        />
      </div>
    </>
  );
}
