import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HomeNav } from '@/components/home-nav';

export default function GuidePage() {
  const steps = [
    {
      number: '01',
      title: 'Create a blog folder',
      description: 'In any public GitHub repo, create a folder called blog',
      code: `your-repo/
  blog/    <- create this
  README.md`,
    },
    {
      number: '02',
      title: 'Add your first post',
      description: 'Create a .md file inside the blog folder. The filename becomes the URL.',
      code: `blog/hello-world.md -> /user/repo/hello-world`,
    },
    {
      number: '03',
      title: 'Add frontmatter',
      description: 'The stuff between the --- lines is called frontmatter. It is metadata about your post.',
      code: `---
title: Hello World
date: 2024-01-01
description: My first post
---

Your content here...`,
    },
    {
      number: '04',
      title: 'Visit your blog',
      description: 'That is it! Your blog is live at:',
      code: `marklog.xyz/your-username/your-repo`,
      highlight: true,
    },
  ];

  const frontmatterFields = [
    { name: 'title', description: 'Shows in the post list and browser tab' },
    { name: 'date', description: 'Used to sort posts (newest first). Format: YYYY-MM-DD' },
    { name: 'description', description: 'Shows as a preview in the post list' },
    { name: 'image', description: 'Cover image with url and alt fields' },
    { name: 'category', description: 'Post category' },
    { name: 'featured', description: 'Featured post flag' },
    { name: 'tags', description: 'Array of post tags' },
    { name: 'author', description: 'Post author' },
  ];

  const configOptions = [
    { name: 'title', description: 'Your blog name. Shows in the header and browser tab' },
    { name: 'description', description: 'A short tagline. Shows below the title' },
    { name: 'theme', description: 'Theme: light | dark | ghibli | pixel' },
    { name: 'show_toc', description: 'Show table of contents on posts. true or false' },
    { name: 'show_repo_link', description: 'Show "View on GitHub" link. true or false' },
    { name: 'analytics', description: 'Google Analytics ID. Example: analytics: { google: "G-XXXXXXXXXX" }' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-pixel-body selection:bg-black selection:text-white pixel-bg-grid">
      {/* Nav */}
      <HomeNav />

      <div className="max-w-7xl mx-auto px-6 py-8 max-w-4xl pt-32">
        {/* Hero */}
        <ScrollReveal className="mb-16 border-b-2 border-black pb-12 bg-white/90 backdrop-blur-sm p-8">
          <div className="inline-block px-3 py-1 border-2 border-black bg-gray-100 text-xs font-bold uppercase tracking-wider mb-6 shadow-pixel-sm">
            5 Minutes Setup
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tighter uppercase leading-none font-pixel-title">
            No account needed.<br/>Just <span className="bg-black text-white px-2">GitHub</span> + <span className="bg-black text-white px-2">Markdown</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl border-l-4 border-black pl-6">
            The simplest way to blog. Your content, your repo, your rules.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="space-y-12 mb-24">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100} direction="right" className="relative group">
              <div className="absolute -left-4 -top-4 text-6xl font-bold text-gray-100 -z-10 group-hover:text-black/5 transition-colors font-pixel-title">
                {step.number}
              </div>
              <Card className="hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-pixel-lg transition-all bg-white">
                <CardHeader className="border-b-2 border-black pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border-2 border-black bg-black text-white flex items-center justify-center font-bold text-sm shadow-pixel-sm">
                      {step.number}
                    </div>
                    <CardTitle className="text-xl uppercase tracking-tight">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-6 font-medium">{step.description}</p>
                  <div className="bg-gray-50 border-2 border-black p-4 relative shadow-pixel-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-black/5"></div>
                    <pre className="text-sm overflow-x-auto font-pixel-body">
                      {step.code}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Frontmatter */}
        <ScrollReveal className="mb-24">
          <h2 className="text-3xl font-bold mb-8 tracking-tighter uppercase flex items-center gap-4 font-pixel-title">
            <div className="w-4 h-4 bg-black"></div>
            Frontmatter Fields
          </h2>
          <Card className="bg-white">
            <CardContent className="p-0">
              <div className="divide-y-2 divide-black">
                {frontmatterFields.map((field) => (
                  <div key={field.name} className="flex flex-col md:flex-row md:items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="md:w-48 mb-2 md:mb-0">
                      <code className="bg-black text-white px-2 py-1 text-sm font-bold shadow-pixel-sm">{field.name}</code>
                    </div>
                    <span className="text-gray-600 text-sm flex-1">{field.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Config */}
        <ScrollReveal className="mb-24">
          <h2 className="text-3xl font-bold mb-8 tracking-tighter uppercase flex items-center gap-4 font-pixel-title">
            <div className="w-4 h-4 bg-black"></div>
            Config Options
          </h2>
          <Card className="bg-white">
            <CardHeader className="border-b-2 border-black bg-gray-50">
              <CardTitle className="font-pixel-body text-sm">blog.config.yaml</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 border-b-2 border-black bg-white">
                <p className="text-gray-600 mb-4 font-bold uppercase text-xs tracking-wider">
                  Example Configuration
                </p>
                <pre className="p-4 bg-gray-900 text-gray-100 border-2 border-black text-sm overflow-x-auto shadow-pixel-sm font-pixel-body">
{`title: My Blog
description: My personal blog
theme: pixel  # light | dark | ghibli | pixel
show_toc: true
show_repo_link: true
analytics:
  google: "G-XXXXXXXXXX"`}
                </pre>
              </div>
              <div className="divide-y-2 divide-black">
                {configOptions.map((option) => (
                  <div key={option.name} className="flex flex-col md:flex-row md:items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="md:w-48 mb-2 md:mb-0">
                      <code className="bg-black text-white px-2 py-1 text-sm font-bold shadow-pixel-sm">{option.name}</code>
                    </div>
                    <span className="text-gray-600 text-sm flex-1">{option.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Tips */}
        <ScrollReveal className="mb-24">
          <h2 className="text-3xl font-bold mb-8 tracking-tighter uppercase flex items-center gap-4 font-pixel-title">
            <div className="w-4 h-4 bg-black"></div>
            Pro Tips
          </h2>
          <Card className="bg-yellow-50">
            <CardContent className="p-8 space-y-4">
              <ul className="list-disc pl-5 space-y-2 marker:text-black">
                <li className="text-gray-800 font-medium">Use descriptive filenames. <code className="bg-white border-2 border-black px-1 mx-1 shadow-pixel-sm">how-to-learn-rust.md</code> is better than <code className="bg-white border-2 border-black px-1 mx-1 shadow-pixel-sm">post1.md</code></li>
                <li className="text-gray-800 font-medium">Changes appear instantly. Push to GitHub and your blog updates automatically.</li>
                <li className="text-gray-800 font-medium">Multiple blogs? No problem. Each repo with a <code className="bg-white border-2 border-black px-1 mx-1 shadow-pixel-sm">/blog</code> folder becomes a separate blog.</li>
              </ul>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="text-center py-12 border-t-2 border-black bg-white">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-tighter font-pixel-title">Ready to ship?</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Stop configuring. Start writing.
          </p>
          <Button asChild size="lg" className="font-pixel-title text-xs">
            <Link href="/">
              BACK TO HOME
            </Link>
          </Button>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 font-pixel-body">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-6 font-pixel-title">Marklog</h2>
              <p className="text-sm text-gray-400 max-w-sm">
                The anti-platform blogging platform. <br/>
                Open source, free, and yours forever.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-6 border-b border-white/20 pb-2">Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/guide" className="hover:text-gray-300 hover:underline decoration-2 underline-offset-4">Guide</Link></li>
                <li><Link href="/themes" className="hover:text-gray-300 hover:underline decoration-2 underline-offset-4">Themes</Link></li>
              
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-6 border-b border-white/20 pb-2">Social</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="https://github.com/respectevery01/marklog" className="hover:text-gray-300 hover:underline decoration-2 underline-offset-4">GitHub</Link></li>
                <li><Link href="https://twitter.com/jaskdon" className="hover:text-gray-300 hover:underline decoration-2 underline-offset-4">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 Marklog. All rights reserved.</p>
            <p>Designed for builders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
