import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-pixel-body selection:bg-black selection:text-white pixel-bg-grid">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group p-2">
            <div className="w-8 h-8 bg-black group-hover:bg-transparent group-hover:border-2 group-hover:border-black transition-all duration-0" />
            <span className="text-xl font-bold font-pixel-title uppercase tracking-tighter">Marklog</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/guide" className="text-sm font-bold uppercase hover:underline decoration-2 underline-offset-4 p-2">
              Guide
            </Link>
            <Link href="/themes" className="text-sm font-bold uppercase hover:underline decoration-2 underline-offset-4 p-2">
              Themes
            </Link>
            <Link href="/about" className="text-sm font-bold uppercase hover:underline decoration-2 underline-offset-4 p-2">
              About
            </Link>
            <Button asChild variant="ghost" size="sm" className="font-bold uppercase">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>
          </div>
          <button className="lg:hidden p-2 border-2 border-black hover:bg-black hover:text-white transition-colors" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="3" x2="21" y1="6" y2="6"></line>
              <line x1="3" x2="21" y1="12" y2="12"></line>
              <line x1="3" x2="21" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-40 pb-32 border-b-2 border-black bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <ScrollReveal direction="left" className="inline-block">
                  <div className="px-3 py-1 border-2 border-black bg-gray-100 text-xs font-bold uppercase tracking-wider shadow-pixel-sm">
                    GitHub-powered blogging
                  </div>
                </ScrollReveal>
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-pixel-title leading-[1.2] tracking-normal">
                    <span className="block mb-2">WRITE IN</span>
                    <span className="inline-block bg-black text-white px-4 py-1 mb-2">MARKDOWN</span>
                    <span className="block mb-2">STORE IN</span>
                    <span className="inline-block bg-black text-white px-4 py-1">GITHUB</span>
                  </h1>
                </div>
                <ScrollReveal direction="left" delay={100}>
                  <p className="text-xl leading-relaxed max-w-xl border-l-4 border-black pl-6 py-1">
                    No database. No CMS. Just you, your text editor, and your git repository. The purest way to blog.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={200} className="flex flex-col sm:flex-row gap-6">
                  <Button asChild size="lg" className="font-pixel-title text-sm h-14 px-8">
                    <Link href="/guide">
                      START WRITING
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-pixel-title text-sm h-14 px-8">
                    <Link href="/themes">
                      EXPLORE THEMES
                    </Link>
                  </Button>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="right" delay={200} className="relative aspect-square lg:aspect-auto lg:h-[640px] border-2 border-black bg-gray-50 p-6 shadow-pixel-lg">
                <div className="absolute inset-0 pattern-grid-lg opacity-10"></div>
                <div className="relative h-full w-full border-2 border-black bg-white p-8 overflow-hidden flex flex-col shadow-pixel">
                  <div className="flex items-center gap-3 border-b-2 border-black pb-6 mb-6">
                    <div className="w-4 h-4 bg-black"></div>
                    <div className="w-4 h-4 border-2 border-black"></div>
                    <div className="w-4 h-4 border-2 border-black"></div>
                    <div className="flex-1 text-right font-pixel-body text-sm">blog.md</div>
                  </div>
                  <div className="font-pixel-body text-base space-y-6 flex-1 overflow-hidden opacity-80">
                    <div className="space-y-2 text-gray-500">
                      <p>---</p>
                      <p>title: "Hello World"</p>
                      <p>date: "2024-01-01"</p>
                      <p>---</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-2xl font-bold text-black"># The Future of Blogging</p>
                      <p className="leading-relaxed">This is how blogging should be. Simple, text-based, and version controlled.</p>
                      <div className="h-6 bg-black w-4 animate-pulse inline-block"></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-b-2 border-black bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="sr-only">Features</h2>
            <div className="grid md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
              {[
                {
                  title: 'NO DATABASE',
                  desc: 'Your content lives in your repo. We just render it.',
                  icon: '01'
                },
                {
                  title: 'THEMABLE',
                  desc: 'Switch between Light, Dark, Ghibli, or Pixel themes.',
                  icon: '02'
                },
                {
                  title: 'FAST',
                  desc: 'Built on Next.js for static-like performance.',
                  icon: '03'
                },
              ].map((feature, i) => (
                <ScrollReveal key={feature.title} delay={i * 100} className="p-16 hover:bg-gray-50 transition-colors group">
                  <div className="text-5xl font-bold mb-8 opacity-20 group-hover:opacity-100 transition-opacity font-pixel-title text-stroke">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight font-pixel-title">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{feature.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 border-b-2 border-black bg-gray-50 pixel-bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal className="mb-20">
              <h2 className="text-5xl font-bold uppercase tracking-tighter mb-6 font-pixel-title">How it works</h2>
              <div className="h-3 w-32 bg-black"></div>
            </ScrollReveal>
            
            <div className="space-y-12">
              {[
                {
                  step: '01',
                  title: 'Create Repo',
                  desc: 'Create a GitHub repository. Add a folder for your posts.'
                },
                {
                  step: '02',
                  title: 'Write Content',
                  desc: 'Write your posts in Markdown. Commit and push.'
                },
                {
                  step: '03',
                  title: 'Deploy',
                  desc: 'Connect your repo to Marklog. Your blog is live.'
                }
              ].map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 150} direction="up" className="flex flex-col md:flex-row gap-10 items-start md:items-center p-10 border-2 border-black bg-white shadow-pixel hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-pixel-lg transition-all">
                  <div className="text-6xl font-bold font-pixel-title text-black/10 select-none">{item.step}</div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-3xl font-bold uppercase font-pixel-title">{item.title}</h3>
                    <p className="font-pixel-body text-base text-gray-600 max-w-lg">{item.desc}</p>
                  </div>
                  <div className="hidden md:flex w-16 h-16 border-2 border-black items-center justify-center shadow-pixel-sm bg-black text-white shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

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
                <li><Link href="/about" className="hover:text-gray-300 hover:underline decoration-2 underline-offset-4">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-6 border-b border-white/20 pb-2">Social</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="https://github.com" className="hover:text-gray-300 hover:underline decoration-2 underline-offset-4">GitHub</Link></li>
                <li><Link href="https://twitter.com" className="hover:text-gray-300 hover:underline decoration-2 underline-offset-4">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2024 Marklog. No rights reserved.</p>
            <p>Designed for builders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
