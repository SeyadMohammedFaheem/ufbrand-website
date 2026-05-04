'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <main className="min-h-screen flex" aria-label="Sign in">
      {/* ── Left: Brand Panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-14 bg-[#30323E]">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/images/hero-brand.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#30323E]/90 via-[#30323E]/70 to-[#D4147A]/30" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <img src="/images/logo.png" alt="UF BRAND" className="h-12 w-auto object-contain brightness-0 invert" />
        </Link>

        {/* Center content */}
        <div className="relative z-10 max-w-sm">
          <p className="text-[#D4147A] text-[10px] font-black uppercase tracking-[0.35em] mb-4">Welcome Back</p>
          <h1 className="text-5xl font-serif font-black text-white leading-[1.08] mb-5">
            Modern<br />
            <span className="italic font-light text-white/75">Heritage.</span>
          </h1>
          <p className="text-white/60 text-sm font-light leading-relaxed">
            Sign in to access your orders, track deliveries, and discover your saved favourites.
          </p>

          {/* Trust stats */}
          <div className="mt-10 flex flex-col gap-3">
            {[
              { icon: <Star size={13} fill="currentColor" />, text: '4.9★ · 52,000+ happy customers' },
              { icon: <ShieldCheck size={13} />, text: 'Trusted since 2016 · Secure checkout' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-white/50 text-[11px] font-medium">
                <span className="text-[#D4147A]">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="relative z-10 text-white/30 text-[10px] uppercase tracking-widest font-bold">
          ufbrand.in · Ethnic wear since 2016
        </p>
      </div>

      {/* ── Right: Form Panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 bg-[#FAF9F6]">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden mb-10">
          <img src="/images/logo.png" alt="UF BRAND" className="h-12 w-auto object-contain" />
        </Link>

        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-black text-[#30323E] mb-1">Sign in</h2>
            <p className="text-zinc-400 text-sm font-light">
              New here?{' '}
              <Link href="/signup" className="text-[#D4147A] font-semibold hover:underline underline-offset-2">
                Create an account
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 text-sm px-4 py-3 mb-6 rounded-r-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-900 rounded-xl outline-none focus:border-[#D4147A] focus:ring-2 focus:ring-[#D4147A]/10 transition-all placeholder:text-zinc-300"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="login-password"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500"
                >
                  Password
                </label>
                <button type="button" className="text-[10px] text-[#D4147A] font-semibold hover:underline underline-offset-2">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-900 rounded-xl outline-none focus:border-[#D4147A] focus:ring-2 focus:ring-[#D4147A]/10 transition-all pr-12 placeholder:text-zinc-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full bg-[#D4147A] hover:bg-[#b01065] disabled:bg-zinc-200 disabled:text-zinc-400 text-white py-4 font-black uppercase tracking-widest text-sm transition-all mt-1 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#D4147A]/25 hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>Sign In <ArrowRight size={14} /></>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-zinc-300 mt-8 leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-zinc-500 transition-colors">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-zinc-500 transition-colors">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
