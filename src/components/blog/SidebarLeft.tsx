import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FaGithub, FaTwitter, FaGlobe, FaLinkedin } from 'react-icons/fa';
import type { BlogConfig } from '@/lib/types';
import { getTranslation } from '@/lib/i18n';

interface BlogSidebarLeftProps {
  user: string;
  repo: string;
  config: BlogConfig;
  categories: string[];
  archives: string[];
  lang: string;
}

export function BlogSidebarLeft({ user, repo, config, categories, archives, lang }: BlogSidebarLeftProps) {
  const t = getTranslation(lang as any);
  
  return (
    <div className="lg:col-span-3 space-y-6">
      <ScrollReveal direction="right" delay={100}>
        <Card>
          <CardContent className="p-6 text-center">
            {config.author?.avatar ? (
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-border">
                <Image src={config.author.avatar} alt={config.author.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-3xl font-bold">
                {(config.author?.name || user)[0].toUpperCase()}
              </div>
            )}
            <h2 className="text-xl font-bold mb-2">{config.author?.name || user}</h2>
            <p className="text-sm text-muted-foreground mb-4">{config.author?.bio || `Creator of ${repo}`}</p>
            
            {config.social && (
              <div className="flex justify-center gap-4">
                {config.social.github && (
                  <Link href={config.social.github} target="_blank" className="text-muted-foreground hover:text-foreground text-xl">
                    <FaGithub />
                  </Link>
                )}
                {config.social.twitter && (
                  <Link href={config.social.twitter} target="_blank" className="text-muted-foreground hover:text-foreground text-xl">
                    <FaTwitter />
                  </Link>
                )}
                {config.social.linkedin && (
                  <Link href={config.social.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground text-xl">
                    <FaLinkedin />
                  </Link>
                )}
                {config.social.website && (
                  <Link href={config.social.website} target="_blank" className="text-muted-foreground hover:text-foreground text-xl">
                    <FaGlobe />
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={200}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider">{t.categories}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <Link key={cat} href={`/${user}/${repo}/category/${cat}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={300}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider">{t.archives || 'Archives'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {archives.map(archive => (
                <Link key={archive} href={`/${user}/${repo}/archive/${archive}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {archive}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
