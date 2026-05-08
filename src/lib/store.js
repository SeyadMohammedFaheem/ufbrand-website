'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const ADMIN_EMAILS = [
  'admin@ufbrand.com',
  'faheem@ufbrand.com',
  'faheemseyadmd@gmail.com'
];

// ── AUTH STORE ──────────────────────────────────────────────────────────────
export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,

  // Initialize: listen for auth changes
  init: () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        set({ 
          user: { 
            name: firebaseUser.displayName, 
            email: firebaseUser.email,
            uid: firebaseUser.uid 
          }, 
          loading: false 
        });
      } else {
        set({ user: null, loading: false });
      }
    });
  },

  register: async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      set({ user: { name, email, uid: userCredential.user.uid } });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ 
        user: { 
          name: userCredential.user.displayName, 
          email: userCredential.user.email,
          uid: userCredential.user.uid 
        } 
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid email or password.' };
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  checkIsAdmin: () => {
    const user = get().user;
    return user && ADMIN_EMAILS.includes(user.email.toLowerCase());
  }
}));

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
