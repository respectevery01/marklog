# Marklog

<div align="center">
  <h3>Minimalist GitHub-Powered Blog Platform</h3>
  <p>Write in Markdown, store in GitHub, publish instantly.</p>
  
  <a href="https://www.producthunt.com/products/marklog-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-marklog-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1091336&theme=light&t=1772798068137" alt="Marklog - WRITE IN MARKDOWN STORE IN GITHUB | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</div>

Marklog allows you to turn any GitHub repository into a beautiful, fast, and responsive blog. No database, no CMS—just you, your text editor, and your git repository.

## ✨ Features

- **GitHub Integration**: Direct fetching of Markdown files from your repositories.
- **Zero Config**: Works out of the box with sensible defaults.
- **Themes**: Built-in support for multiple themes (Light, Dark, Ghibli).
- **Responsive**: Perfect reading experience on mobile, tablet, and desktop.
- **Frontmatter**: Full support for metadata like title, date, description, and tags.
- **Fast**: Built on Next.js 14 App Router for optimal performance.

## 🚀 Getting Started

### Method 1: Use Any Repository

1. Go to [marklog.xyz](https://marklog.xyz) (or your deployment URL).
2. Enter your `username/repository` in the input field.
3. Start reading!

### Method 2: Create a Dedicated Blog Repo

1. Create a new repository on GitHub (e.g., `my-blog`).
2. Create a `blog` folder in the root.
3. Add Markdown files inside the `blog` folder.
   
   Example `hello-world.md`:
   ```markdown
   ---
   title: Hello World
   date: 2024-03-01
   description: My first post on Marklog
   ---
   
   # Welcome
   
   This is my first post!
   ```
4. Visit `marklog.xyz/your-username/my-blog`.

## ⚙️ Configuration

You can customize your blog by adding a `blog.config.yaml` file to the root of your repository:

```yaml
title: My Awesome Blog
description: Thoughts and ideas
theme: ghibli # Options: light, dark, ghibli
show_toc: true
socials:
  twitter: https://twitter.com/username
  github: https://github.com/username
analytics:
  google: "G-XXXXXXXXXX" # Google Analytics ID
```

## 🎨 Themes

Marklog comes with beautiful built-in themes:

- **Light**: Clean, minimal, and easy to read.
- **Dark**: Easy on the eyes for night reading.
- **Ghibli**: A warm, colorful theme inspired by Studio Ghibli.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Markdown**: Marked & Gray-matter
- **Animations**: Framer Motion / Anime.js
## Support me
  <a href='https://ko-fi.com/E1E51932I0' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Support me on Ko-fi' /></a>
  
## 📝 License

MIT © Marklog
