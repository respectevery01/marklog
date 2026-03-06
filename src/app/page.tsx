import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HomeNav } from '@/components/home-nav';
import { HomeNavInput } from '@/components/home-nav-input';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black font-pixel-body selection:bg-black selection:text-white pixel-bg-grid">
      {/* Nav */}
      <HomeNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 md:pt-40 pb-20 md:pb-32 border-b-2 border-black bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="space-y-8 md:space-y-10">
                <ScrollReveal direction="left" className="inline-block">
                  <div className="px-3 py-1 border-2 border-black bg-gray-100 text-xs font-bold uppercase tracking-wider shadow-pixel-sm">
                    GitHub-powered blogging
                  </div>
                </ScrollReveal>
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-pixel-title leading-[1.2] tracking-normal">
                    <span className="block mb-2">WRITE IN</span>
                    <span className="inline-block bg-black text-white px-3 py-1 md:px-4 md:py-1 mb-2">MARKDOWN</span>
                    <span className="block mb-2">STORE IN</span>
                    <span className="inline-block bg-black text-white px-3 py-1 md:px-4 md:py-1">GITHUB</span>
                  </h1>
                </div>
                <ScrollReveal direction="left" delay={100}>
                  <p className="text-lg md:text-xl leading-relaxed max-w-xl border-l-4 border-black pl-4 md:pl-6 py-1">
                    No database. No CMS. Just you, your text editor, and your git repository. The purest way to blog.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={200} className="flex flex-col gap-6">
                  <div className="max-w-md w-full">
                    <HomeNavInput />
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm font-medium text-gray-500">
                    <span>Try:</span>
                    <Link href="/respectevery01/marklog-blog" className="text-black underline decoration-2 underline-offset-4 hover:text-gray-600 transition-colors break-all sm:break-normal">
                      demo/blog
                    </Link>
                  </div>
                  
                  {/* Product Hunt Badge */}
                  <div className="pt-2">
                    <a 
                      href="https://www.producthunt.com/products/marklog-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-marklog-2" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1091336&theme=light&t=1772798068137" 
                        alt="Marklog - WRITE IN MARKDOWN STORE IN GITHUB | Product Hunt" 
                        style={{ width: '250px', height: '54px' }} 
                        width="250" 
                        height="54" 
                      />
                    </a>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal direction="right" delay={200} className="relative aspect-square lg:aspect-auto lg:h-[640px] border-2 border-black bg-gray-50 p-4 md:p-6 shadow-pixel-lg mt-8 lg:mt-0">
                <div className="absolute inset-0 pattern-grid-lg opacity-10"></div>
                <div className="relative h-full w-full border-2 border-black bg-white p-4 md:p-8 overflow-hidden flex flex-col shadow-pixel">
                  <div className="flex items-center gap-3 border-b-2 border-black pb-4 md:pb-6 mb-4 md:mb-6">
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
