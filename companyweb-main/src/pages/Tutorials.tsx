import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { TutorialHero } from '../components/tutorials/TutorialHero';
import { TutorialCategories } from '../components/tutorials/TutorialCategories';
import { CtaSection } from '../components/home/CtaSection';
export function Tutorials() {
  return <MainLayout>
      <TutorialHero />
      <TutorialCategories />
      <CtaSection />
    </MainLayout>;
}