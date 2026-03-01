export interface BlogConfig {
  theme?: 'light' | 'dark' | 'ghibli' | 'pixel';
  title?: string;
  description?: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  nav?: {
    label: string;
    url: string;
  }[];
  language?: 'en' | 'zh-cn';
  footer?: string;
  analytics?: {
    google?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  // author is removed from frontmatter, but we might want to keep it in type if we want to display it
  // However, the user said remove it from frontmatter. We'll use config.author instead.
  // But wait, if different posts have different authors? The user implies a single author blog (config based).
  // So I'll remove author from here as per request "remove author part from frontmatter".
  image?: {
    url: string;
    alt?: string;
  };
  category?: string;
  featured?: boolean;
  tags?: string[];
}

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'dir';
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}

export interface GitHubTree {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
}
