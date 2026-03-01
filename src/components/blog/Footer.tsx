import Link from 'next/link';
import { getTranslation } from '@/lib/i18n';
import type { BlogConfig } from '@/lib/types';

interface BlogFooterProps {
  user: string;
  repo: string;
  config: BlogConfig;
}

export function BlogFooter({ user, repo, config }: BlogFooterProps) {
  const lang = config.language || 'en';
  const t = getTranslation(lang as any);
  
  const blogTitle = config.title || repo;
  const description = config.description || '';
  
  return (
    <footer className="border-t border-border mt-20 py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-lg font-bold mb-4">{blogTitle}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">{config.footer || description}</p>
        <div className="text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {config.author?.name || user}. {t.allRightsReserved}</p>
          <p className="mt-2">{t.poweredBy} <Link href="/" className="underline hover:text-foreground">Marklog</Link></p>
        </div>
      </div>
    </footer>
  );
}
