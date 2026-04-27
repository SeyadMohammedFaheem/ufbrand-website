'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { id, name, price, image, size, quantity }

      addItem: (product) => {
        const existing = get().items.find(
          (i) => i.id === product.id && i.size === product.size
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === product.id && i.size === product.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (id, size) => {
        set({ items: get().items.filter((i) => !(i.id === id && i.size === size)) });
      },

      updateQty: (id, size, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity: qty } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      get count() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: 'ufbrand-cart' }
  )
);
