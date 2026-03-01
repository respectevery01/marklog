import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeLoader } from '@/components/ThemeLoader';
import { fetchBlogFiles, fetchBlogConfig, fetchRepo } from '@/lib/github';
import { parseMarkdown } from '@/lib/markdown';
import type { BlogPost, BlogConfig } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';
import { BlogHeader } from '@/components/blog/Header';
import { BlogFooter } from '@/components/blog/Footer';
import { BlogSidebarLeft } from '@/components/blog/SidebarLeft';
import { BlogSidebarRight } from '@/components/blog/SidebarRight';
import { PostCard } from '@/components/PostCard';

interface PageProps {
  params: Promise<{ user: string; repo: string; category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { user, repo, category } = await params;
  const decodedCategory = decodeURIComponent(category);
  
  let config: BlogConfig | null = null;
  let repoInfo: any = null;

  try {
    const [configResult, repoResult] = await Promise.all([
      fetchBlogConfig(user, repo).catch(() => null),
      fetchRepo(user, repo).catch(() => null)
    ]);
    config = configResult;
    repoInfo = repoResult;
  } catch (e) {
    // ignore
  }

  const title = config?.title || repoInfo?.name || repo;
  
  return {
    title: `${decodedCategory} - ${title}`,
    description: `Posts in category ${decodedCategory}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { user, repo, category } = await params;
  const decodedCategory = decodeURIComponent(category);

  let config: BlogConfig = { theme: 'light' };
  let posts: BlogPost[] = [];
  let error: string | null = null;
  let repoInfo: any = null;

  try {
    const configPromise = fetchBlogConfig(user, repo).catch(() => null);
    const filesPromise = fetchBlogFiles(user, repo).catch(() => []);
    const repoPromise = fetchRepo(user, repo).catch(() => null);

    const [configResult, filesResult, repoResult] = await Promise.all([
      configPromise,
      filesPromise,
      repoPromise
    ]);

    if (configResult) {
      config = configResult;
    }

    repoInfo = repoResult;

    const fileContents = await Promise.all(
      filesResult.map(async (file) => {
        const response = await fetch(file.download_url);
        const content = await response.text();
        const slug = file.name.replace('.md', '');
        return parseMarkdown(content, slug);
      })
    );

    posts = fileContents.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  } catch (err: any) {
    console.error('Blog fetch error:', err);
    if (err.message === 'REPO_NOT_FOUND') {
      error = 'REPO_NOT_FOUND';
    } else if (err.message === 'BLOG_FOLDER_NOT_FOUND') {
      error = 'BLOG_FOLDER_NOT_FOUND';
    } else {
      error = 'UNKNOWN_ERROR';
    }
  }

  const themeClass = config.theme || 'light';
  const blogTitle = config.title || repoInfo?.name || repo;
  const blogDescription = config.description || repoInfo?.description;
  const lang = config.language || 'en';
  const t = getTranslation(lang);

  if (error) {
    if (error === 'REPO_NOT_FOUND') error = t.repoNotFound;
    else if (error === 'BLOG_FOLDER_NOT_FOUND') error = t.blogFolderNotFound;
    else error = t.tryAgain;
  }

  // Default Nav if not provided
  const navLinks = config.nav || [
    { label: 'Home', url: `/${user}/${repo}` },
    { label: 'GitHub', url: repoInfo?.html_url || `https://github.com/${user}/${repo}` },
  ];

  // Sidebar data (derived from ALL posts)
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[];
  const archives = Array.from(new Set(posts.map(p => {
    const date = new Date(p.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))).sort().reverse();

  // Filtered posts for main content
  const filteredPosts = posts.filter(post => post.category === decodedCategory);
  const featuredPost = posts.find(p => p.featured); // Still show global featured post

  return (
    <>
      <ThemeLoader theme={themeClass} />
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <BlogHeader 
          user={user} 
          repo={repo} 
          blogTitle={blogTitle} 
          navLinks={navLinks} 
        />

        <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <BlogSidebarLeft 
              user={user} 
              repo={repo} 
              config={config} 
              categories={categories} 
              archives={archives} 
              lang={lang}
            />

            {/* Center - Main Feed */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-2xl font-bold">{t.categories}: {decodedCategory}</h2>
                 <span className="text-muted-foreground">{filteredPosts.length} posts</span>
              </div>

              {error ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{t.error}</CardTitle>
                    <CardDescription>{error}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/">{t.backToHome}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : filteredPosts.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{t.noPosts}</CardTitle>
                    <CardDescription>{t.noPostsDesc}</CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                filteredPosts.map((post, i) => (
                  <PostCard 
                    key={post.slug} 
                    post={post} 
                    user={user} 
                    repo={repo} 
                    index={i} 
                    lang={lang}
                  />
                ))
              )}
            </div>

            <BlogSidebarRight 
              user={user} 
              repo={repo} 
              featuredPost={featuredPost} 
              lang={lang}
            />
          </div>
        </div>

        <BlogFooter 
          user={user} 
          blogTitle={blogTitle} 
          description={blogDescription} 
          config={config} 
          lang={lang}
        />
      </div>
    </>
  );
}
