import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/markdown';
import type { BlogPost } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';

interface PostCardProps {
  post: BlogPost;
  user: string;
  repo: string;
  index: number;
  lang: string;
}

export function PostCard({ post, user, repo, index, lang }: PostCardProps) {
  const t = getTranslation(lang as any);
  
  return (
    <ScrollReveal delay={index * 100} direction="up">
      <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {post.image && (
          <div className="relative h-64 w-full border-b border-border shrink-0">
            <Image
              src={post.image.url}
              alt={post.image.alt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-3">
            {post.featured && (
              <Badge className="rounded-sm bg-yellow-500 hover:bg-yellow-600 text-white gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </Badge>
            )}
            {post.category && (
              <Badge variant="secondary" className="rounded-sm">
                <Link href={`/${user}/${repo}/category/${post.category}`} className="hover:underline">
                  {post.category}
                </Link>
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">{formatDate(post.date, lang)}</span>
          </div>
          <CardTitle className="text-2xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
            <Link href={`/${user}/${repo}/${post.slug}`}>
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-2">
              {/* Tags removed as per request */}
            </div>
            <Button variant="link" className="p-0 h-auto font-bold" asChild>
              <Link href={`/${user}/${repo}/${post.slug}`}>
                {t.readMore}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
}
