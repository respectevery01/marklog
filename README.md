# Marklog

Marklog是一个基于GitHub的博客平台，让你可以直接从GitHub仓库读取Markdown文件并展示为美观的博客。无需数据库，无需复杂设置，只需GitHub + Markdown即可开始你的博客之旅。

## ✨ 主要功能

- **GitHub 集成**：直接从GitHub仓库读取Markdown文件
- **多种主题**：支持Light、Dark和Ghibli三种主题
- **响应式设计**：在桌面、平板和移动设备上都能完美显示
- **丰富的Frontmatter支持**：支持title、date、description、image、category等多种元数据
- **实时更新**：推送到GitHub后，博客自动更新
- **无账户要求**：无需注册，直接使用GitHub仓库
- **自定义配置**：通过blog.config.yaml文件自定义博客设置
- **交互式背景**：鼠标移动时的蜘蛛网效果

## 🛠️ 技术栈

- **框架**：Next.js 14 (App Router)
- **UI组件**：shadcn/ui
- **样式**：Tailwind CSS
- **动画**：Anime.js
- **Markdown解析**：gray-matter + marked
- **GitHub API**：用于读取仓库内容

## 🚀 快速开始

### 1. 创建GitHub仓库

在GitHub上创建一个新的仓库，并在根目录创建一个`blog`文件夹。

### 2. 添加博客文章

在`blog`文件夹中创建Markdown文件，例如`hello-world.md`：

```markdown
---
title: Hello World
date: 2024-01-01
description: 我的第一篇博客
---

这是我的第一篇Marklog博客文章！
```

### 3. 访问你的博客

在浏览器中访问：
```
marklog.com/你的GitHub用户名/你的仓库名
```

例如：`marklog.com/username/my-blog`

## 📁 目录结构

```
blog/
  hello-world.md  # 博客文章
  about.md       # 关于页面
blog.config.yaml  # 博客配置文件
README.md         # 仓库说明
```

## ⚙️ 配置选项

在仓库根目录创建`blog.config.yaml`文件来自定义你的博客：

```yaml
title: 我的博客                  # 博客名称
description: 记录我的学习和思考    # 博客描述
theme: light                    # 主题：light | dark | ghibli
show_toc: true                  # 是否显示目录
show_repo_link: true            # 是否显示GitHub链接
```

## 🎨 主题

Marklog支持三种主题：

- **Light**：干净简洁的浅色主题
- **Dark**：优雅的深色主题
- **Ghibli**：吉卜力风格的温暖主题

在`blog.config.yaml`中设置`theme`选项来选择主题。

## 📝 Frontmatter 字段

博客文章支持以下Frontmatter字段：

| 字段 | 描述 |
|------|------|
| `title` | 文章标题，显示在文章列表和浏览器标签 |
| `date` | 文章日期，用于排序（最新的在前），格式：YYYY-MM-DD |
| `description` | 文章描述，在文章列表中显示预览 |
| `image` | 封面图片，包含url和alt字段 |
| `category` | 文章分类 |
| `featured` | 精选文章标记 |
| `tags` | 文章标签数组 |
| `author` | 文章作者 |

## 🌐 本地开发

如果你想在本地运行Marklog：

1. 克隆仓库
   ```bash
   git clone https://github.com/your-username/marklog.git
   cd marklog
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 访问 `http://localhost:3000`

## 🚢 部署

Marklog可以部署到任何支持Next.js的平台：

### Vercel（推荐）
1. 连接你的GitHub仓库到Vercel
2. 选择Next.js作为框架
3. 点击部署

### Netlify
1. 连接你的GitHub仓库到Netlify
2. 设置构建命令：`npm run build`
3. 设置发布目录：`.next`
4. 点击部署

## 🤝 贡献

欢迎贡献！如果你有任何想法或改进，请：

1. Fork 仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系

如果有任何问题或建议，欢迎通过以下方式联系：

- GitHub Issues: [https://github.com/your-username/marklog/issues](https://github.com/your-username/marklog/issues)
- Email: info@marklog.com

---

**Happy Blogging!** 🎉
