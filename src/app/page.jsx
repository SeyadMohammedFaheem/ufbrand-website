import { Hero } from '@/components/layout/Hero';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { CustomerReviews } from '@/components/sections/CustomerReviews';
import { RecentEditorial } from '@/components/sections/RecentEditorial';

export const revalidate = 0; // Force Next.js to always fetch fresh data

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://ufbrand.in/#organization',
        name: 'UF Brand',
        url: 'https://ufbrand.in',
        logo: 'https://ufbrand.in/images/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9899990772',
          contactType: 'customer service',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ufbrand.in/#website',
        url: 'https://ufbrand.in',
        name: 'UF Brand',
        publisher: {
          '@id': 'https://ufbrand.in/#organization',
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <NewArrivals />
      <PromoBanner />
      <CustomerReviews />
      <RecentEditorial />
    </main>
  );
}
