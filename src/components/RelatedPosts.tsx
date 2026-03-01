'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { formatDate } from '@/lib/markdown';
import type { BlogPost } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';

interface RelatedPostsProps {
  currentSlug: string;
  posts: BlogPost[];
  user: string;
  repo: string;
  lang: string;
}

export function RelatedPosts({ currentSlug, posts, user, repo, lang }: RelatedPostsProps) {
  const t = getTranslation(lang as any);
  
  // Filter out current post
  const otherPosts = posts.filter(post => post.slug !== currentSlug);
  
  // Get 4 random posts
  const randomPosts = otherPosts
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (randomPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t-2 border-black">
      <h2 className="text-2xl font-bold uppercase mb-8">{t.maybeLikeMore || 'Maybe like more'}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {randomPosts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 100} direction="up">
            <Link href={`/${user}/${repo}/${post.slug}`} className="block group h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-black">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {post.category && (
                      <Badge variant="secondary" className="rounded-sm">
                        {post.category}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{formatDate(post.date, lang)}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
