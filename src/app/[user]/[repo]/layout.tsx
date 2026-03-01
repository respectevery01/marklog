import type { Metadata } from 'next';
import { getFaviconUrl, fetchBlogConfig } from '@/lib/github';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ user: string; repo: string }> }): Promise<Metadata> {
  const { user, repo } = await params;
  const iconUrl = await getFaviconUrl(user, repo);

  if (iconUrl) {
    return {
      icons: {
        icon: iconUrl,
        shortcut: iconUrl,
        apple: iconUrl,
      },
    };
  }
  
  return {};
}

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ user: string; repo: string }>;
}) {
  const { user, repo } = await params;
  const config = await fetchBlogConfig(user, repo);

  return (
    <>
      {config?.analytics?.google && <GoogleAnalytics gaId={config.analytics.google} />}
      {children}
    </>
  );
}
