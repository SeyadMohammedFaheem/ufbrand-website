import React from 'react';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { getProducts } from '@/lib/sheets';

export const revalidate = 300 // 5 minutes

export async function generateMetadata({ params }) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return {
      title: 'Product Not Found | UF Brand',
    };
  }

  return {
    title: `${product.name} | UF Brand`,
    description: product.description || `Shop the latest ${product.name} at UF Brand. Premium handcrafted ethnic wear.`,
    openGraph: {
      title: `${product.name} | UF Brand`,
      description: product.description || `Shop the latest ${product.name} at UF Brand.`,
      images: [product.image || '/images/hero-brand.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | UF Brand`,
      description: product.description || `Shop the latest ${product.name} at UF Brand.`,
      images: [product.image || '/images/hero-brand.png'],
    },
  };
}

export default async function ProductDetail({ params }) {
  // Await the params object (required in recent Next.js versions)
  const { id } = await params;

  // Fetch all products from Google Sheets
  const products = await getProducts();

  // Find the specific product by ID
  const sheetProduct = products.find((p) => String(p.id) === String(id));

  // If the product doesn't exist in the sheet, show 404
  if (!sheetProduct) {
    notFound();
  }

  // Map the sheet data to the format expected by our components
  const type = sheetProduct.type?.toUpperCase() || 'KURTI'
  const isFabric = type === 'FABRIC'
  const isSaree = type === 'SAREE'
  const isStitched = type === 'KURTI' || type === 'SUIT'

  const product = {
    id: sheetProduct.id,
    title: sheetProduct.name,
    originalPrice: `₹${(sheetProduct.price * 1.5).toFixed(0)}`,
    currentPrice: `₹${sheetProduct.price}`,
    discount: '33% off',
    type,

    // ✅ Sizing Logic
    sizes: isStitched 
      ? ['XS', 'S', 'M', 'L', 'XL', 'XXL'] 
      : isFabric 
        ? ['2.10 mtrs'] 
        : [],
    sizeLabel: isFabric ? 'LENGTH' : 'SELECT SIZE',
    isFabric,
    isSaree,

    description: sheetProduct.description || 'Premium quality product.',
    features: isFabric
      ? ['Unstitched fabric', 'Length: 2.10 metres', 'Ready to stitch']
      : isSaree
        ? ['Traditional drape', 'Includes blouse piece', 'Intricate design']
        : ['Stitched & ready to wear', 'Premium stitching', 'Machine washable'],
    images: sheetProduct.images?.length > 0 ? sheetProduct.images : [sheetProduct.image || '/placeholder.png'],
    shortCode: sheetProduct.shortCode,
    material: sheetProduct.material || 'Premium quality materials',
    price: sheetProduct.price
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images[0],
    description: product.description,
    sku: product.shortCode || product.id,
    brand: {
      '@type': 'Brand',
      name: 'UF Brand',
    },
    offers: {
      '@type': 'Offer',
      url: `https://ufbrand.in/products/${product.id}`,
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };



  return (
    <main className="w-full bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left Column: Image Gallery (1-Column Stack) */}
          <div className="w-full lg:w-[60%] flex-shrink-0">
            <ProductGallery images={product.images} />
          </div>

          {/* Right Column: Sticky Product Info */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-36 pb-16">
            <ProductInfo product={product} />
          </div>

        </div>
      </div>
    </main>
  );
}
