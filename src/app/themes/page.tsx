import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HomeNav } from '@/components/home-nav';

export default function ThemesPage() {
  const themes = [
    {
      name: 'light',
      label: 'Light',
      description: 'Clean and simple light theme',
      bg: 'bg-white',
      text: 'text-slate-900',
      accent: 'bg-slate-100',
      border: 'border-slate-200',
      sampleCode: `theme: light`,
    },
    {
      name: 'dark',
      label: 'Dark',
      description: 'Elegant dark theme',
      bg: 'bg-slate-950',
      text: 'text-slate-100',
      accent: 'bg-slate-800',
      border: 'border-slate-800',
      sampleCode: `theme: dark`,
    },
    {
      name: 'ghibli',
      label: 'Ghibli',
      description: 'Studio Ghibli inspired warm theme',
      bg: 'bg-[#f5f0e6]',
      text: 'text-[#2d4a3e]',
      accent: 'bg-[#e8dfd0]',
      border: 'border-[#d4c9b8]',
      sampleCode: `theme: ghibli`,
    },
    {
      name: 'pixel',
      label: 'Pixel',
      description: 'Retro pixel art style theme',
      bg: 'bg-white',
      text: 'text-black font-mono',
      accent: 'bg-gray-100',
      border: 'border-black border-2',
      sampleCode: `theme: pixel`,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-pixel-body selection:bg-black selection:text-white pixel-bg-grid">
      {/* Nav */}
      <HomeNav />

      <div className="max-w-7xl mx-auto px-6 py-8 max-w-6xl pt-32">
        {/* Hero */}
        <ScrollReveal className="mb-16 border-b-2 border-black pb-12 bg-white/90 backdrop-blur-sm p-8">
          <div className="inline-block px-3 py-1 border-2 border-black bg-gray-100 text-xs font-bold uppercase tracking-wider mb-6 shadow-pixel-sm">
            Theme Gallery
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tighter uppercase leading-none font-pixel-title">
            Pick Your <span className="bg-black text-white px-2">Vibe</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl border-l-4 border-black pl-6">
            4 distinct themes. Fully customizable.
          </p>
        </ScrollReveal>

        {/* Config Example */}
        <ScrollReveal className="mb-24">
          <h2 className="text-3xl font-bold mb-8 tracking-tighter uppercase flex items-center gap-4 font-pixel-title">
            <div className="w-4 h-4 bg-black"></div>
            Quick Config
          </h2>
          <Card className="max-w-md bg-white">
            <CardHeader className="border-b-2 border-black bg-gray-50">
              <CardTitle className="font-pixel-body text-sm">blog.config.yaml</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="p-6 bg-white text-sm overflow-x-auto font-pixel-body">
{`title: "My Blog"
description: "Thoughts on code and life"
theme: "pixel" # Try: light, dark, ghibli, pixel
show_toc: true
show_repo_link: true
analytics:
  google: "G-XXXXXXXXXX"`}
              </pre>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Theme Previews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {themes.map((theme, i) => (
            <ScrollReveal key={theme.name} delay={i * 100} className="group">
              <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
                <h2 className="text-lg font-bold uppercase font-pixel-title">{theme.label}</h2>
                <code className="text-xs bg-gray-100 px-2 py-1 border border-black shadow-pixel-sm">{theme.sampleCode}</code>
              </div>
              <Card className={`hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all overflow-hidden h-full flex flex-col ${theme.bg === 'bg-slate-950' ? 'bg-slate-950' : theme.bg === 'bg-[#f5f0e6]' ? 'bg-[#f5f0e6]' : 'bg-white'}`}>
                <CardContent className="p-6 flex-1">
                  <div className={`text-xs font-bold mb-3 uppercase tracking-widest ${theme.text} opacity-60`}>Featured</div>
                  <h3 className={`text-xl font-bold mb-4 leading-tight ${theme.text}`}>
                    Getting Started
                  </h3>
                  <div className={`h-1 w-8 mb-4 ${theme.text === 'text-slate-100' ? 'bg-slate-700' : 'bg-black/20'}`}></div>
                  <p className={`text-xs mb-6 ${theme.text} opacity-80 leading-relaxed`}>
                    This is how your blog looks with bold, italic, and inline code.
                  </p>
                  <code className={`text-xs px-2 py-1 ${theme.text === 'text-slate-100' ? 'bg-white/10' : 'bg-black/5'} ${theme.text}`}>
                    const blog = 'marklog';
                  </code>
                </CardContent>
                <div className={`border-t-2 ${theme.name === 'dark' ? 'border-slate-800' : 'border-black/10'} px-6 py-4 bg-black/5`}>
                  <p className={`text-xs font-bold uppercase tracking-wider ${theme.text} opacity-60`}>{theme.description}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Preview Blog Section */}
        <div className="mb-24">
          <ScrollReveal className="mb-16 border-b-2 border-black pb-8 bg-white/90 backdrop-blur-sm p-4">
            <h2 className="text-3xl font-bold tracking-tighter uppercase flex items-center gap-4 font-pixel-title">
              <div className="w-4 h-4 bg-black"></div>
              Live Previews
            </h2>
          </ScrollReveal>
          
          <div className="grid gap-16">
            {/* Light Preview */}
            <ScrollReveal direction="left" className="relative">
              <div className="absolute -top-6 left-0 text-sm font-bold uppercase tracking-wider bg-black text-white px-3 py-1 shadow-pixel-sm font-pixel-title">
                Light Theme
              </div>
              <Card className="bg-white border-2 border-black">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-gray-100 border border-gray-200 px-3 py-1 text-xs font-medium text-gray-800 uppercase tracking-wide">Technology</span>
                    <span className="bg-black text-white px-3 py-1 text-xs font-medium uppercase tracking-wide">Featured</span>
                  </div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">The Future of AI</h1>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 font-medium">
                    <span>By Jane Doe</span>
                    <span>•</span>
                    <span>January 15, 2024</span>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                    Artificial Intelligence is transforming industries and our daily lives in ways we never thought possible. From healthcare to finance, the impact is profound and far-reaching.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Dark Preview */}
            <ScrollReveal direction="right" className="relative">
              <div className="absolute -top-6 left-0 text-sm font-bold uppercase tracking-wider bg-black text-white px-3 py-1 shadow-pixel-sm font-pixel-title">
                Dark Theme
              </div>
              <Card className="bg-slate-950 border-2 border-black">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 uppercase tracking-wide">Technology</span>
                    <span className="bg-white text-slate-950 px-3 py-1 text-xs font-medium uppercase tracking-wide">Featured</span>
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">The Future of AI</h1>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 font-medium">
                    <span>By Jane Doe</span>
                    <span>•</span>
                    <span>January 15, 2024</span>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    Artificial Intelligence is transforming industries and our daily lives in ways we never thought possible. From healthcare to finance, the impact is profound and far-reaching.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Ghibli Preview */}
            <ScrollReveal direction="left" className="relative">
              <div className="absolute -top-6 left-0 text-sm font-bold uppercase tracking-wider bg-black text-white px-3 py-1 shadow-pixel-sm font-pixel-title">
                Ghibli Theme
              </div>
              <Card className="bg-[#f5f0e6] border-2 border-black">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-[#e8dfd0] border border-[#d4c9b8] px-3 py-1 text-xs font-medium text-[#2d4a3e] uppercase tracking-wide rounded-sm">Technology</span>
                    <span className="bg-[#8b5a2b] text-white px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-sm">Featured</span>
                  </div>
                  <h1 className="text-4xl font-bold text-[#2d4a3e] mb-4 tracking-tight font-serif">The Future of AI</h1>
                  <div className="flex items-center gap-4 text-sm text-[#5a7a6a] mb-8 font-medium">
                    <span>By Jane Doe</span>
                    <span>•</span>
                    <span>January 15, 2024</span>
                  </div>
                  <p className="text-[#3d5a4e] text-lg leading-relaxed max-w-2xl font-serif">
                    Artificial Intelligence is transforming industries and our daily lives in ways we never thought possible. From healthcare to finance, the impact is profound and far-reaching.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Pixel Preview */}
            <ScrollReveal direction="right" className="relative">
              <div className="absolute -top-6 left-0 text-sm font-bold uppercase tracking-wider bg-black text-white px-3 py-1 shadow-pixel-sm font-pixel-title">
                Pixel Theme
              </div>
              <Card className="bg-white border-2 border-black">
                <CardContent className="p-8 md:p-12 font-pixel-body">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-gray-100 border-2 border-black px-3 py-1 text-xs font-bold text-black uppercase tracking-wide shadow-pixel-sm">Technology</span>
                    <span className="bg-black text-white border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-pixel-sm">Featured</span>
                  </div>
                  <h1 className="text-4xl font-bold text-black mb-4 tracking-tighter uppercase font-pixel-title">The Future of AI</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 font-bold border-b-2 border-black pb-2 inline-flex">
                    <span>By Jane Doe</span>
                    <span>//</span>
                    <span>January 15, 2024</span>
                  </div>
                  <p className="text-black text-lg leading-relaxed max-w-2xl">
                    Artificial Intelligence is transforming industries and our daily lives in ways we never thought possible. From healthcare to finance, the impact is profound and far-reaching.
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal className="text-center py-12 border-t-2 border-black bg-white">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-tighter font-pixel-title">Ready to choose?</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Set the theme in your config and push to GitHub.
          </p>
          <Button asChild size="lg" className="font-pixel-title text-xs">
            <Link href="/guide">
              BACK TO GUIDE
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