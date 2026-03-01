import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ScrollReveal';
import type { BlogPost, BlogConfig } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';

interface BlogSidebarRightProps {
  user: string;
  repo: string;
  config: BlogConfig;
  lang: string;
}

export function BlogSidebarRight({ user, repo, config, lang }: BlogSidebarRightProps) {
  // Sidebar cards removed as per request to move featured posts to top
  return null;
}
