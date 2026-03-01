export const translations = {
  en: {
    backToHome: 'Back Home',
    backToList: 'Back to List',
    readMore: 'Read More →',
    featured: 'Featured',
    categories: 'Categories',
    archives: 'Archives',
    tags: 'Tags',
    error: 'Error',
    noPosts: 'No Posts Found',
    noPostsDesc: 'Add some .md files to your blog folder.',
    repoNotFound: 'Repository not found',
    blogFolderNotFound: 'Blog folder not found',
    tryAgain: 'Please try again later',
    articleNotFound: 'Article not found',
    author: 'Author',
    publishedOn: 'Published on',
    poweredBy: 'Powered by',
    allRightsReserved: 'All rights reserved.',
  },
  'zh-cn': {
    backToHome: '返回首页',
    backToList: '返回列表',
    readMore: '阅读更多 →',
    featured: '精选',
    categories: '分类',
    archives: '归档',
    tags: '标签',
    error: '出错了',
    noPosts: '暂无文章',
    noPostsDesc: 'blog 文件夹中还没有 .md 文件',
    repoNotFound: '仓库不存在',
    blogFolderNotFound: '未找到 blog 文件夹，请确保仓库中有 blog 文件夹',
    tryAgain: '请稍后重试',
    articleNotFound: '文章不存在',
    author: '作者',
    publishedOn: '发布于',
    poweredBy: 'Powered by',
    allRightsReserved: '保留所有权利。',
  }
};

export type Language = keyof typeof translations;

export function getTranslation(lang: Language = 'en') {
  return translations[lang] || translations.en;
}
