import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white text-[#30323E] border-t border-zinc-100" aria-label="Footer">

      {/* ── Trust Badges Bar ── */}
      <div className="border-b border-zinc-100 py-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <ShieldCheck size={18} className="text-[#D4147A]" />, title: '9 Years of Trust', sub: 'Serving customers since 2016' },
              { icon: <Truck size={18} className="text-[#D4147A]" />, title: 'Pan-India Delivery', sub: '2–4 business days' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#D4147A]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Secure Payment', sub: 'UPI, Cards, Net Banking' },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#D4147A]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>, title: 'WhatsApp Support', sub: '+91 9899990772' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="text-[11px] font-black text-[#30323E] uppercase tracking-wider">{item.title}</p>
                  <p className="text-[10px] text-zinc-400 font-medium mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="UF Brand Home">
              <img src="/images/logo.png" alt="UF BRAND" className="h-12 w-auto object-contain mb-4" />
            </Link>
            <p className="text-[13px] text-zinc-500 font-light leading-relaxed mb-5 max-w-xs">
              Premium women's ethnic wear. 9 years of excellence in delivering timeless elegance across India.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/ufbrand_salwar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-zinc-100 hover:bg-[#D4147A] hover:text-white text-zinc-500 rounded-full flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="https://wa.me/919899990772"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-zinc-100 hover:bg-[#25D366] hover:text-white text-zinc-500 rounded-full flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#30323E] mb-5">Collections</h3>
            <ul className="flex flex-col gap-3">
              {['New Arrivals', 'Kurta Sets', 'Silk Sarees', 'Festive Wear', 'Co-ord Sets', 'Fabric'].map(link => (
                <li key={link}>
                  <Link
                    href={`/products?search=${link.toLowerCase()}`}
                    className="text-[13px] text-zinc-500 hover:text-[#D4147A] transition-colors font-medium"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#30323E] mb-5">Help</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Return Policy', href: '/returns' },
                { label: 'Size Guide', href: '/size-guide' },
                { label: 'Blog / Journal', href: '/blog' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-zinc-500 hover:text-[#D4147A] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#30323E] mb-5">Get in Touch</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Email</p>
                <a href="mailto:Care@UFBRAND.in" className="text-[13px] font-medium text-zinc-600 hover:text-[#D4147A] transition-colors">
                  Care@UFBRAND.in
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">WhatsApp</p>
                <a href="https://wa.me/919899990772" className="text-[13px] font-medium text-zinc-600 hover:text-[#D4147A] transition-colors">
                  +91 9899990772
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Support Hours</p>
                <p className="text-[12px] text-zinc-500 font-light leading-relaxed">Mon–Sat, 10am–7pm IST</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-zinc-100 py-5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            © {new Date().getFullYear()} UF Brand Salwar. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-[10px] font-medium text-zinc-300">
            <span>Payments secured by</span>
            <span className="font-black text-zinc-400 ml-1">UPI · Razorpay</span>
          </div>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#D4147A] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#D4147A] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
