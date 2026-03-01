import Link from 'next/link';

interface BlogHeaderProps {
  user: string;
  repo: string;
  blogTitle: string;
  navLinks: { label: string; url: string }[];
}

export function BlogHeader({ user, repo, blogTitle, navLinks }: BlogHeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${user}/${repo}`} className="text-lg font-bold">
          {blogTitle}
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.url} 
              href={link.url.startsWith('http') ? link.url : `/${user}/${repo}${link.url === '/' ? '' : link.url}`}
              className="text-sm font-medium hover:text-primary transition-colors"
              target={link.url.startsWith('http') ? '_blank' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
