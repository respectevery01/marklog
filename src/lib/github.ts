import type { BlogConfig, GitHubFile, GitHubRepo, GitHubTree } from './types';

const GITHUB_API_BASE = 'https://api.github.com';

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Marklog-Blog',
};

export async function fetchRepo(user: string, repo: string): Promise<GitHubRepo> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${user}/${repo}`, { 
    headers,
    next: { revalidate: 3600 } // Cache for 1 hour to reduce rate limits
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('REPO_NOT_FOUND');
    }
    throw new Error('GITHUB_API_ERROR');
  }
  
  return response.json();
}

export async function fetchRepoTree(user: string, repo: string, branch: string = 'main'): Promise<GitHubTree> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${user}/${repo}/git/trees/${branch}?recursive=1`, {
    headers,
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('TREE_NOT_FOUND');
  }

  return response.json();
}

export async function fetchBlogFiles(user: string, repo: string): Promise<GitHubFile[]> {
  try {
    // First try to fetch repo info to get default branch
    const repoInfo = await fetchRepo(user, repo);
    const branch = repoInfo.default_branch || 'main';

    // Fetch the full tree
    const tree = await fetchRepoTree(user, repo, branch);
    
    // Filter for files in blog/ directory and ending with .md
    // Exclude files in blog/page/ directory
    // Map them to GitHubFile structure (simplified)
    return tree.tree
      .filter(item => 
        item.path.startsWith('blog/') && 
        !item.path.startsWith('blog/page/') &&
        item.path.endsWith('.md') && 
        item.type === 'blob'
      )
      .map(item => ({
        name: item.path.split('/').pop() || '',
        path: item.path,
        sha: item.sha,
        size: item.size || 0,
        url: item.url,
        html_url: `https://github.com/${user}/${repo}/blob/${branch}/${item.path}`,
        git_url: item.url,
        download_url: `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${item.path}`,
        type: 'file'
      }));
  } catch (e) {
    // Fallback to old method if tree fetch fails
    console.error('Tree fetch failed, falling back to contents API', e);
    const response = await fetch(`${GITHUB_API_BASE}/repos/${user}/${repo}/contents/blog`, { 
      headers,
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('BLOG_FOLDER_NOT_FOUND');
      }
      throw new Error('GITHUB_API_ERROR');
    }
    
    const files: GitHubFile[] = await response.json();
    return files.filter((file) => file.name.endsWith('.md'));
  }
}

export async function fetchFileContent(user: string, repo: string, path: string): Promise<string> {
  // Use raw content URL to avoid base64 decoding issues and potential size limits
  // Also avoids the need for atob/Buffer which might have issues in Edge
  try {
    const repoInfo = await fetchRepo(user, repo);
    const branch = repoInfo.default_branch || 'main';
    const rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
    
    // In Edge runtime, fetch might need explicit User-Agent
    const response = await fetch(rawUrl, {
      next: { revalidate: 60 },
      headers: {
        'User-Agent': 'Marklog-Blog'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return '';
      }
      // If raw fetch fails, we could fallback to API, but raw is generally more reliable for content
      throw new Error('GITHUB_RAW_ERROR');
    }

    return await response.text();
  } catch (e) {
    console.error('Error fetching file content:', e);
    return '';
  }
}

export async function findFileInRepo(user: string, repo: string, slug: string): Promise<{ content: string; path: string } | null> {
  try {
    const repoInfo = await fetchRepo(user, repo);
    const branch = repoInfo.default_branch || 'main';
    const tree = await fetchRepoTree(user, repo, branch);
    
    // Look for blog/${slug}.md or blog/page/${slug}.md
    const targetPaths = [`blog/${slug}.md`, `blog/page/${slug}.md`];
    const foundItem = tree.tree.find(item => targetPaths.includes(item.path));

    if (foundItem) {
      return {
        content: await fetchFileContent(user, repo, foundItem.path),
        path: foundItem.path
      };
    }
    
    return null;
  } catch (e) {
    console.error('Error finding file in repo:', e);
    // Fallback: try direct fetch
    let content = await fetchFileContent(user, repo, `blog/${slug}.md`);
    if (content) return { content, path: `blog/${slug}.md` };
    
    content = await fetchFileContent(user, repo, `blog/page/${slug}.md`);
    if (content) return { content, path: `blog/page/${slug}.md` };
    
    return null;
  }
}

export async function fetchBlogConfig(user: string, repo: string): Promise<BlogConfig | null> {
  try {
    const content = await fetchFileContent(user, repo, 'blog.config.yaml');
    
    if (!content) {
      return null;
    }
    
    const yaml = await import('js-yaml');
    const config = yaml.load(content) as BlogConfig;
    
    if (config) {
      return config;
    }
    
    return null;
  } catch {
    return null;
  }
}

export async function getFaviconUrl(user: string, repo: string): Promise<string | null> {
  try {
    const repoInfo = await fetchRepo(user, repo);
    const branch = repoInfo.default_branch || 'main';
    
    // Check for favicon files in root
    const tree = await fetchRepoTree(user, repo, branch);
    
    const faviconFile = tree.tree.find(item => 
      ['favicon.png', 'favicon.jpg', 'favicon.jpeg', 'favicon.svg', 'favicon.ico'].includes(item.path.toLowerCase())
    );
    
    if (faviconFile) {
      return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${faviconFile.path}`;
    }
    
    // Check blog config
    const config = await fetchBlogConfig(user, repo);
    if (config?.author?.avatar) {
      return config.author.avatar;
    }
    
    return null;
  } catch (e) {
    console.error('Error fetching favicon:', e);
    return null;
  }
}

