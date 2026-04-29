'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_EMAILS = [
  'admin@ufbrand.com',
  'faheem@ufbrand.com',
  'faheemseyadmd@gmail.com' // Added your email for easy testing
];

// ── AUTH STORE ──────────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { name, email }
      users: [],  // registered users: [{ name, email, password }]

      register: (name, email, password) => {
        const existing = get().users.find(u => u.email === email);
        if (existing) return { success: false, error: 'Email already registered.' };
        const newUser = { name, email, password };
        set(s => ({ users: [...s.users, newUser], user: { name, email } }));
        return { success: true };
      },

      login: (email, password) => {
        const found = get().users.find(u => u.email === email && u.password === password);
        if (!found) return { success: false, error: 'Invalid email or password.' };
        set({ user: { name: found.name, email: found.email } });
        return { success: true };
      },

      logout: () => set({ user: null }),

      checkIsAdmin: () => {
        const user = get().user;
        return user && ADMIN_EMAILS.includes(user.email.toLowerCase());
      }
    }),
    { name: 'ufbrand-auth' }
  )
);

// ── CART STORE ──────────────────────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ id, title, image, price, size, quantity }]

      addItem: (product, size) => {
        const key = `${product.id}-${size}`;
        const existing = get().items.find(i => i._key === key);
        if (existing) {
          set(s => ({
            items: s.items.map(i => i._key === key ? { ...i, quantity: i.quantity + 1 } : i)
          }));
        } else {
          set(s => ({
            items: [...s.items, { ...product, size, quantity: 1, _key: key }]
          }));
        }
      },

      removeItem: (key) => set(s => ({ items: s.items.filter(i => i._key !== key) })),

      updateQty: (key, qty) => {
        if (qty < 1) {
          set(s => ({ items: s.items.filter(i => i._key !== key) }));
        } else {
          set(s => ({ items: s.items.map(i => i._key === key ? { ...i, quantity: qty } : i) }));
        }
      },

      clearCart: () => set({ items: [] }),

      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      get totalPrice() {
        return get().items.reduce((sum, i) => {
          const price = parseFloat(String(i.currentPrice).replace(/[^0-9.]/g, '')) || 0;
          return sum + price * i.quantity;
        }, 0);
      },
    }),
    { name: 'ufbrand-cart' }
  )
);
