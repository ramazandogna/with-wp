import { Container } from './Container';
import { Button } from '@/components/ui/button';
import { LucideSparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full pt-8">
      <Container>
        <nav className="flex items-center justify-between rounded-lg border border-white/30 bg-white/5 px-8 py-4 shadow-lg backdrop-blur-3xl">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center rounded-lg bg-white/10 p-2">
              <LucideSparkles className="h-6 w-6 text-white/80" />
            </span>
            <span className="text-xl font-bold tracking-wide text-white">React Bits</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-base font-medium text-white/90 transition-colors hover:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="text-base font-medium text-white/90 transition-colors hover:text-white"
            >
              Docs
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
