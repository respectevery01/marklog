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
  // Sidebar cards removed as per request to move featured posts to top
  return null;
}
