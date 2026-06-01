import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './sarpo-data';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CompletedOrder {
  id: string;
  items: CartItem[];
  totalPrice: number;
  customer: { name: string; phone: string; address: string };
  paymentMethod: string;
  createdAt: string;
}

interface CartState {
  items: CartItem[];
  completedOrders: CompletedOrder[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  moveToCompleted: (orderId: string, customer: { name: string; phone: string; address: string }, paymentMethod: string) => void;
  clearCompleted: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      completedOrders: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      moveToCompleted: (orderId, customer, paymentMethod) => {
        set((state) => {
          const currentItems = [...state.items];
          const totalPrice = currentItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          const newOrder: CompletedOrder = {
            id: orderId,
            items: currentItems,
            totalPrice,
            customer,
            paymentMethod,
            createdAt: new Date().toISOString(),
          };
          return {
            items: [],
            completedOrders: [newOrder, ...state.completedOrders],
          };
        });
      },
      clearCompleted: () => set({ completedOrders: [] }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: 'siluet-basic-cart',
    }
  )
);
