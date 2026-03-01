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
  params: Promise<{ user: string; repo: string; date: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { user, repo, date } = await params;
  const decodedDate = decodeURIComponent(date);
  
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
    title: `Archive ${decodedDate} - ${title}`,
    description: `Posts from ${decodedDate}`,
  };
}

export default async function ArchivePage({ params }: PageProps) {
  const { user, repo, date } = await params;
  const decodedDate = decodeURIComponent(date);

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

  // Sidebar data
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[];
  const archives = Array.from(new Set(posts.map(p => {
    const d = new Date(p.date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }))).sort().reverse();

  // Filtered posts
  const filteredPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    const [targetYear, targetMonth] = decodedDate.split('-');
    
    const yearMatch = postDate.getFullYear() === parseInt(targetYear);
    if (!targetMonth) return yearMatch;
    
    const monthMatch = (postDate.getMonth() + 1) === parseInt(targetMonth);
    return yearMatch && monthMatch;
  });

  const featuredPost = posts.find(p => p.featured);

  return (
    <div className={`min-h-screen selection:bg-black selection:text-white pixel-bg-grid ${themeClass}`}>
      <ThemeLoader theme={themeClass} />
      
      <BlogHeader 
        user={user} 
        repo={repo} 
        blogTitle={blogTitle} 
        navLinks={navLinks} 
      />

      <main className="max-w-7xl mx-auto px-6 py-12 pt-32 lg:pt-40">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Left */}
          <aside className="lg:block w-full lg:w-64 space-y-8 order-1 lg:order-none">
            <BlogSidebarLeft 
              user={user} 
              repo={repo} 
              config={config} 
              categories={categories} 
              archives={archives} 
              lang={lang}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-12 order-2 lg:order-none">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-bold uppercase tracking-wider">{t.archives}: {decodedDate}</h2>
               <span className="text-muted-foreground">{filteredPosts.length} posts</span>
            </div>

            <div className="grid gap-8">
              {error ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{t.error}</CardTitle>
                    <CardDescription>{error}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href={`/${user}/${repo}`}>{t.backToList}</Link>
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
          </div>

          {/* Sidebar Right */}
          <aside className="lg:w-80 space-y-8 order-3 lg:order-none hidden lg:block">
            <BlogSidebarRight 
              user={user} 
              repo={repo} 
              config={config} 
              lang={lang}
            />
          </aside>
        </div>
      </main>

      <BlogFooter 
        user={user} 
        repo={repo} 
        config={config} 
      />
    </div>
  );
}
