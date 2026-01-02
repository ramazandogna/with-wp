import Link from 'next/link';
import { Container } from './Container';
import { LucideSparkles } from 'lucide-react';
import { Button, Input } from '../ui';

export function Footer() {
  return (
    <>
      <footer className="bg-background relative mt-4 min-h-40">
        <Container>
          <div className="flex w-full rounded-lg p-8">
            {/* 
            Items Container
            */}
            <span className="flex h-full w-full flex-col-reverse rounded-2xl p-6 max-lg:gap-8 lg:flex-row">
              <div className="flex h-full w-full flex-col text-[13px] max-md:justify-center lg:flex-row">
                {/* --- 
                NEWSLETTER SIGNUP SECTION 
                --- */}
                <div className="flex max-md:flex-col">
                  {/* 
                  SUPPORT SECTION 
                  */}
                  <div className="text-foreground/70 mb-8 flex w-full min-w-[180px] flex-1 flex-col gap-[11px] px-8 max-sm:justify-center max-sm:text-center">
                    <h6 className="mb-2 text-foreground gap-[15px] font-bold uppercase">SUPPORT</h6>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/help">Help Center</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/faqs">FAQs</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/submit-ticket">Submit a Ticket</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/readers-guide">Reader’s Guide</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/advertising">Advertising</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/report-issue">Report an Issue</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/tech-support">Technical Support</Link>
                    </div>
                  </div>

                  {/* 
                  RESOURCES SECTION
                  */}
                  <div className="text-foreground/70 mb-8 flex w-full min-w-[180px] flex-1 flex-col gap-[11px] px-8 max-sm:justify-center max-sm:text-center">
                    <h6 className="mb-2 text-foreground gap-[15px] font-bold uppercase">RESOURCES</h6>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/archives">Blog Archives</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/popular">Popular Posts</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/newsletter">Newsletter Signup</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/research">Research Reports</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/podcasts">Podcast Episodes</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/ebooks">E-books & Guides</Link>
                    </div>
                    <div className="hover:text-destructive/40 transition-color duration-400">
                      <Link href="/case-studies">Case Studies</Link>
                    </div>
                  </div>
                </div>

                {/* 
                ABOUT SECTION 
                */}
                <div className="text-foreground/70 mb-8 flex w-full min-w-[180px] flex-1 flex-col gap-[11px] px-8 max-md:justify-center max-sm:text-center">
                  <h6 className="mb-2 text-foreground gap-[15px] font-bold uppercase">ABOUT</h6>
                  <div className="hover:text-destructive/40 transition-color duration-400">
                    <Link href="/about-blog">About the Blog</Link>
                  </div>
                  <div className="hover:text-destructive/40 transition-color duration-400">
                    <Link href="/team">Meet the Team</Link>
                  </div>
                  <div className="hover:text-destructive/40 transition-color duration-400">
                    <Link href="/guidelines">Guidelines</Link>
                  </div>
                  <div className="hover:text-destructive/40 transition-color duration-400">
                    <Link href="/story">Our Story</Link>
                  </div>
                  <div className="hover:text-destructive/40 transition-color duration-400">
                    <Link href="/press">Press Inquiries</Link>
                  </div>
                  <div className="hover:text-destructive/40 transition-color duration-400">
                    <Link href="/contact">Contact Us</Link>
                  </div>
                  <div className="hover:text-destructive/40 transition-color duration-400">
                    <Link href="/privacy">Privacy Policy</Link>
                  </div>
                </div>
              </div>

              {/* --- 
              NEWSLETTER SIGNUP SECTION 
              --- */}
              <div className="ml-auto flex h-full flex-col gap-[10px] max-lg:px-8 lg:ml-10 lg:gap-6 lg:border-l lg:pl-10 lg:min-w-[366px]">
                {/*
                Logo Section
                */}
                <Link href="/" className="group/logo flex items-center gap-3">
                  <span className="bg-primary/10 group-hover/logo:bg-destructive/40 flex items-center justify-center rounded-lg p-2 transition-colors">
                    <LucideSparkles className="text-primary h-6 w-6 transition-transform duration-600 group-hover/logo:rotate-90" />
                  </span>
                  <span className="text-foreground group-hover/logo:text-primary/30 text-xl font-bold tracking-wide transition-colors duration-600">
                    Ramazan
                  </span>
                </Link>
                {/*
                Privacy & Terms
                */}
                <p className="terms">
                  By pressing the Sign up button, you confirm that you have read and are agreeing to
                  our{" "}
                  <Link
                    className="bg-destructive/10 hover:bg-destructive/40 rounded px-1 py-0.5 transition-colors hover:underline"
                    href="/privacy"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  {" "}and{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="bg-destructive/10 hover:bg-destructive/40 rounded px-1 py-0.5 transition-colors hover:underline"
                  >
                    {" "}Terms of Use
                  </Link>
                </p>

                {/*
                Newsletter Input & Signup Button
                */}
                <div className="flex sm:h-[35px] items-center justify-center max-sm:flex-col max-sm:gap-2 mt-4">
                  <Input
                    className="max-sm:h-[35px] focus:stroke-destructive/40 h-full"
                    placeholder="Your email.."
                    type="text"
                  />
                  <Button
                    className="max-sm:h-[35px] bg-destructive/40 max-sm:w-full ml-2 h-full min-w-[30px] rounded-md whitespace-nowrap"
                    variant="destructive"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </span>
          </div>
        </Container>
      </footer>
    </>
  );
}
