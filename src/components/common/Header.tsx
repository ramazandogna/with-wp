'use client';
//next
import Link from 'next/link';
//react
import { useState } from 'react';
//components
import { Container } from '@/components/common';
import { Button } from '@/components/ui';
//icons
import { LucideSparkles, MenuIcon } from 'lucide-react';

export function Header() {
  //states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  console.log('ismenuopen:', isMenuOpen);
  console.log('ismenuvisible', isMenuVisible);

  // Open Menu
  const openMenu = () => {
    setIsMenuVisible(true);
    setTimeout(() => setIsMenuOpen(true), 300);
  };

  // Close Menu
  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setIsMenuVisible(false), 300);
  };

  // Toggle Menu
  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <>
      <header className="fixed z-50 max-h-[100px] w-full pt-8">
        <Container>
          <nav className="bg-background/50 border-border/20 flex items-center justify-between rounded-lg border px-8 py-4 shadow-lg backdrop-blur-lg">
            {/*
            Logo 
            */}
            <Link href="/" className="group/logo flex items-center gap-3">
              <span className="bg-primary/10 group-hover/logo:bg-primary/30 flex items-center justify-center rounded-lg p-2 transition-colors">
                <LucideSparkles className="text-primary h-6 w-6" />
              </span>
              <span className="text-foreground group-hover:text-primary text-xl font-bold tracking-wide transition-colors">
                Ramazan
              </span>
            </Link>
            {/*
            Mobile Menü Icon
            */}
            <div
              onClick={toggleMenu}
              className="group/ham flex h-[50px] w-[50px] cursor-pointer items-center justify-center sm:hidden"
            >
              <MenuIcon className="text-foreground h-8 w-8 transition-transform group-hover/ham:scale-[105%] md:hidden" />
            </div>
            {/* 
            Desktop Menu Items 
            */}
            <div className="flex items-center gap-3 max-sm:hidden">
              <Link className="w-full py-3" href={'#'}>
                <Button variant="link">Home</Button>
              </Link>
              <Link className="w-full py-3" href={'#'}>
                <Button variant="link">Docs</Button>
              </Link>
              <Link className="w-full py-3" href={'#'}>
                <Button variant="link">About</Button>
              </Link>
              <Link className="w-full py-3" href={'#'}>
                <Button variant="link">Contact</Button>
              </Link>
            </div>
          </nav>
        </Container>
      </header>
      {/* 
      Mobile Menu Items 
      */}
      {isMenuVisible && (
        <div
          className={`bg-background/50 fixed inset-0 z-40 backdrop-blur-md transition-opacity duration-300 sm:hidden ${
            isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <nav
            className={`bg-background/80 border-border/20 header-padding fixed top-0 left-0 h-full w-[75vw] max-w-xs border-l shadow-lg backdrop-blur-lg transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col items-start gap-2 px-8 py-6 sm:hidden`}
          >
            <Link className="w-full py-3" href={'#'}>
              <Button className="text-lg font-bold!" variant="link">
                Home
              </Button>
            </Link>
            <Link className="w-full py-3" href={'#'}>
              <Button className="text-lg font-bold!" variant="link">
                Docs
              </Button>
            </Link>
            <Link className="w-full py-3" href={'#'}>
              <Button className="text-lg font-bold!" variant="link">
                About
              </Button>
            </Link>
            <Link className="w-full py-3" href={'#'}>
              <Button className="text-lg font-bold!" variant="link">
                Contact
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
