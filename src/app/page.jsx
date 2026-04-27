import { Hero } from '@/components/layout/Hero';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { CustomerReviews } from '@/components/sections/CustomerReviews';
import { RecentEditorial } from '@/components/sections/RecentEditorial';

export const revalidate = 0; // Force Next.js to always fetch fresh data

export default function Home() {
  // Force recompile to clear Turbopack cache
  return (
    <main>
      <Hero />
      <NewArrivals />
      <PromoBanner />
      <CustomerReviews />
      <RecentEditorial />
    </main>
  );
}
