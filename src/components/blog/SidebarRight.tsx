import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { BlogPost } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';

interface BlogSidebarRightProps {
  user: string;
  repo: string;
  featuredPost?: BlogPost;
  lang: string;
}

export function BlogSidebarRight({ user, repo, featuredPost, lang }: BlogSidebarRightProps) {
  const t = getTranslation(lang as any);
  
  if (!featuredPost) return null;

  return (
    <div className="lg:col-span-3 space-y-6">
      <ScrollReveal direction="left" delay={100}>
        <Card className="bg-primary text-primary-foreground border-none">
          <CardHeader>
            <Badge className="w-fit bg-background text-foreground hover:bg-background/90">{t.featured}</Badge>
            <CardTitle className="mt-2 text-lg leading-tight">
              <Link href={`/${user}/${repo}/${featuredPost.slug}`} className="hover:underline">
                {featuredPost.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm opacity-90">
            {featuredPost.description.slice(0, 100)}...
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
