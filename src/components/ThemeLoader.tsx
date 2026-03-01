'use client';

import { useEffect } from 'react';

interface ThemeLoaderProps {
  theme: string;
}

export function ThemeLoader({ theme }: ThemeLoaderProps) {
  useEffect(() => {
    const themeFile = `/themes/${theme}.css`;
    let link = document.getElementById('theme-stylesheet') as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.id = 'theme-stylesheet';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    link.href = themeFile;

    if (theme === 'ghibli') {
      let texture = document.getElementById('ghibli-texture');
      if (!texture) {
        texture = document.createElement('div');
        texture.id = 'ghibli-texture';
        texture.className = 'ghibli-texture';
        document.body.appendChild(texture);
      }
    } else {
      const texture = document.getElementById('ghibli-texture');
      if (texture) {
        texture.remove();
      }
    }

    if (theme === 'pixel') {
      let grid = document.getElementById('pixel-grid');
      if (!grid) {
        grid = document.createElement('div');
        grid.id = 'pixel-grid';
        grid.className = 'pixel-grid';
        document.body.appendChild(grid);
      }
    } else {
      const grid = document.getElementById('pixel-grid');
      if (grid) {
        grid.remove();
      }
    }
  }, [theme]);

  return null;
}
