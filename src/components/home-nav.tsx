'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group p-2">
          <div className="w-8 h-8 bg-black group-hover:bg-transparent group-hover:border-2 group-hover:border-black transition-all duration-0" />
          <span className="text-xl font-bold font-pixel-title uppercase tracking-tighter">Marklog</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/guide" className="text-sm font-bold uppercase hover:underline decoration-2 underline-offset-4 p-2">
            Guide
          </Link>
          <Link href="/themes" className="text-sm font-bold uppercase hover:underline decoration-2 underline-offset-4 p-2">
            Themes
          </Link>
          <Button asChild variant="ghost" size="sm" className="font-bold uppercase">
            <Link href="https://github.com/respectevery01/marklog" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 border-2 border-black hover:bg-black hover:text-white transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 right-0 bg-white border-b-2 border-black transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="flex flex-col p-6 space-y-4">
          <Link 
            href="/guide" 
            className="text-lg font-bold uppercase hover:underline decoration-2 underline-offset-4"
            onClick={() => setIsOpen(false)}
          >
            Guide
          </Link>
          <Link 
            href="/themes" 
            className="text-lg font-bold uppercase hover:underline decoration-2 underline-offset-4"
            onClick={() => setIsOpen(false)}
          >
            Themes
          </Link>
          <Link 
            href="https://github.com/respectevery01/marklog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg font-bold uppercase hover:underline decoration-2 underline-offset-4"
            onClick={() => setIsOpen(false)}
          >
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
}
