import matter from 'gray-matter';
import { marked } from 'marked';
import type { BlogPost } from './types';

export function parseMarkdown(content: string, slug: string): BlogPost {
  const { data, content: markdown } = matter(content);
  
  const html = marked.parse(markdown) as string;
  
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    description: data.description || '',
    content: html,
    image: data.image,
    category: data.category,
    featured: data.featured,
    tags: data.tags,
  };
}

export function formatDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString);
  try {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    // Fallback to en-US if locale is invalid
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
