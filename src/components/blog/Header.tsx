'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogHeaderProps {
  user: string;
  repo: string;
  blogTitle: string;
  navLinks: { label: string; url: string }[];
}

export function BlogHeader({ user, repo, blogTitle, navLinks }: BlogHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={`/${user}/${repo}`} className="text-2xl font-bold">
          {blogTitle}
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.url} 
              href={link.url.startsWith('http') ? link.url : `/${user}/${repo}${link.url === '/' ? '' : link.url}`}
              className="text-lg font-bold hover:text-primary transition-colors"
              target={link.url.startsWith('http') ? '_blank' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 ease-in-out overflow-hidden shadow-lg",
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.url} 
              href={link.url.startsWith('http') ? link.url : `/${user}/${repo}${link.url === '/' ? '' : link.url}`}
              className="text-lg font-bold uppercase hover:underline decoration-2 underline-offset-4"
              target={link.url.startsWith('http') ? '_blank' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
