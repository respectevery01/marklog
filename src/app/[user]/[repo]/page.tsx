import Link from 'next/link';
import { notFound } from 'next/navigation';
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
  params: Promise<{ user: string; repo: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { user, repo } = await params;
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
  const description = config?.description || repoInfo?.description || `Blog by ${user}`;

  return {
    title: `${title}`,
    description,
  };
}

export default async function BlogListPage({ params }: PageProps) {
  const { user, repo } = await params;

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

    posts = fileContents.sort((a, b) => {
      // Sort by featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

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

  // Default Nav if not provided
  const navLinks = config.nav || [
    { label: 'Home', url: `/${user}/${repo}` },
    { label: 'GitHub', url: repoInfo?.html_url || `https://github.com/${user}/${repo}` },
  ];

  // Get categories and archives
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[];
  const archives = Array.from(new Set(posts.map(p => {
    const date = new Date(p.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))).sort().reverse();

  if (error) {
    if (error === 'REPO_NOT_FOUND') error = t.repoNotFound;
    else if (error === 'BLOG_FOLDER_NOT_FOUND') error = t.blogFolderNotFound;
    else error = t.tryAgain;
  }

  return (
    <div className={`min-h-screen selection:bg-black selection:text-white pixel-bg-grid ${themeClass}`}>
      <ThemeLoader theme={config.theme || 'light'} />
      
      <BlogHeader 
        blogTitle={blogTitle} 
        user={user} 
        repo={repo} 
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
            <div className="grid gap-8">
              {posts.map((post, index) => (
                <PostCard 
                  key={post.slug} 
                  post={post} 
                  user={user} 
                  repo={repo} 
                  index={index}
                  lang={lang}
                />
              ))}
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
