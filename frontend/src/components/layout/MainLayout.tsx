import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnimatedBackground } from '../AnimatedBackground';
interface MainLayoutProps {
  children: React.ReactNode;
  showBackground?: boolean;
}
export function MainLayout({
  children,
  showBackground = false
}: MainLayoutProps) {
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0F0B1F] via-[#1B1537] to-[#0F0B1F] relative">
      {showBackground && <AnimatedBackground />}
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>;
}