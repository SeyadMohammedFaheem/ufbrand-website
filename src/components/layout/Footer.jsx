import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#FCECEF] text-[#5C1234] pt-16 pb-8 relative overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Contact Us & Discover */}
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide">Contact Us</h4>
              <div className="text-sm font-light leading-relaxed flex flex-col gap-1">
                <p>+91 9899990772 | Care@UFBRAND.in</p>
                <p>09:00 AM-07:00 PM (Monday-Saturday)</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide">Discover</h4>
              <div className="flex flex-col gap-3">
                <Link href="/gift-cards" className="text-sm font-light hover:text-[#D4147A] transition-colors">Gift Cards</Link>
                <Link href="/sale" className="text-sm font-light hover:text-[#D4147A] transition-colors">Sale</Link>
              </div>
            </div>
          </div>

          {/* Column 2: Explore More */}
          <div className="flex flex-col">
            <h4 className="text-lg font-bold mb-4 tracking-wide">Explore More</h4>
            <div className="flex flex-col gap-3">
              {['New', 'Suits', 'Kurtas', 'Libas Art', 'Dresses', 'Sarees', 'Lehengas', 'Loungewear', 'Bottomwear', 'Extra Love', 'Co Ords', 'Sharara', 'Purple Edit', 'Press Release', 'Franchise Enquiry'].map((item) => (
                <Link key={item} href={`/collections/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-light hover:text-[#D4147A] transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Customer Experience */}
          <div className="flex flex-col">
            <h4 className="text-lg font-bold mb-4 tracking-wide">Customer Experience</h4>
            <div className="flex flex-col gap-3">
              {['About Us', 'Terms & Conditions', 'Shipping Policy', 'Return Policy', 'Privacy Policy', 'Refund Policy', 'ESG Policy', 'Annual Return', 'CSR Policy', 'Raise Return', 'Track Order', 'Store Locator', 'Contact Us', 'Bulk Order Query', 'Sitemap', 'FAQ\'s'].map((item) => (
                <Link key={item} href={`/pages/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-sm font-light hover:text-[#D4147A] transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter, Follow Us, App, Payments */}
          <div className="flex flex-col gap-8">
            
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-3 tracking-wide">Subscribe To Our Newsletter</h4>
              <p className="text-sm font-light mb-4">Be The First Know About New Launches Sales. Trend Update & More</p>
              <form className="flex w-full relative border border-[#5C1234]">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent text-[#5C1234] placeholder:text-[#5C1234]/60 py-2.5 px-4 focus:outline-none text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#5C1234] hover:text-[#D4147A] transition-colors px-3"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </form>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide">Follow Us</h4>
              <div className="flex gap-4">
                {/* Instagram */}
                <a href="#" className="hover:text-[#D4147A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                {/* Facebook */}
                <a href="#" className="hover:text-[#D4147A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                {/* Youtube */}
                <a href="#" className="hover:text-[#D4147A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                </a>
                {/* X (Twitter) */}
                <a href="#" className="hover:text-[#D4147A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                </a>
              </div>
            </div>

            {/* Download App */}
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide">Download The App</h4>
              <div className="flex gap-3">
                <button className="bg-[#6A1A41] text-white text-[10px] py-2 px-3 rounded flex items-center gap-1.5 hover:bg-[#D4147A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                  Google Play
                </button>
                <button className="bg-[#6A1A41] text-white text-[10px] py-2 px-3 rounded flex items-center gap-1.5 hover:bg-[#D4147A] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.78,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.22,1.5 14.08,0.3C13.06,0.34 11.83,0.97 11.08,1.79C10.42,2.5 9.84,3.69 10.03,4.9C11.18,5 12.28,4.35 13,3.5Z" /></svg>
                  App Store
                </button>
              </div>
            </div>

            {/* Secure Payment */}
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide">Secure Payment</h4>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-[#1A1F71] rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
                <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-[#00B9F5] text-[8px] font-bold">Paytm</div>
                <div className="w-10 h-6 bg-[#EB001B] rounded flex items-center justify-center text-white text-[8px] font-bold overflow-hidden relative"><div className="w-4 h-4 rounded-full bg-[#F79E1B] absolute right-1 mix-blend-screen"></div><div className="w-4 h-4 rounded-full bg-white absolute left-1 opacity-20"></div>MC</div>
                <div className="w-10 h-6 bg-[#006FCF] rounded flex items-center justify-center text-white text-[7px] font-bold leading-none text-center">AMEX</div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex justify-center items-center pt-8">
          <p className="text-xs font-light">
            © UFBRAND {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}
