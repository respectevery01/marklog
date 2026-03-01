'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HomeNavInput() {
  const [path, setPath] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!path.trim()) return;
    
    // Remove leading/trailing slashes
    const cleanPath = path.trim().replace(/^\/+|\/+$/g, '');
    router.push(`/${cleanPath}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md w-full mx-auto lg:mx-0">
      <div className="relative flex items-center">
        <span className="absolute left-4 text-gray-500 font-mono select-none hidden sm:inline">
          marklog.xyz/
        </span>
        <span className="absolute left-4 text-gray-500 font-mono select-none sm:hidden">
          /
        </span>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="username/repo"
          className="w-full h-14 pl-8 sm:pl-32 pr-14 bg-gray-50 border-2 border-black rounded-full font-mono text-base sm:text-lg focus:outline-none focus:ring-0 focus:bg-white transition-colors"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={!path.trim()}
          className={cn(
            "absolute right-2 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100",
            !path.trim() && "cursor-not-allowed"
          )}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
