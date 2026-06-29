// Product service — swap mock data for real API calls when backend is ready
import { Product } from '../types';
import { PRODUCTS } from '../data';

export const ProductService = {
  getAll: async (): Promise<Product[]> => {
    // TODO: return apiGet<Product[]>('/products');
    return Promise.resolve(PRODUCTS);
  },

  getById: async (id: number): Promise<Product | undefined> => {
    // TODO: return apiGet<Product>(`/products/${id}`);
    return Promise.resolve(PRODUCTS.find(p => p.id === id));
  },

  getByFisherman: async (fishermanId: number): Promise<Product[]> => {
    // TODO: return apiGet<Product[]>(`/fishermen/${fishermanId}/products`);
    return Promise.resolve(PRODUCTS.filter(p => p.fishermanId === fishermanId));
  },

  search: async (query: string, category?: string): Promise<Product[]> => {
    let results = PRODUCTS;
    if (query) results = results.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    if (category && category !== 'Semua') results = results.filter(p => p.category === category);
    return Promise.resolve(results);
  },

  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    // TODO: return apiPost<Product>('/products', data);
    const newProduct = { ...data, id: Date.now() };
    return Promise.resolve(newProduct as Product);
  },

  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    // TODO: return apiPut<Product>(`/products/${id}`, data);
    const product = PRODUCTS.find(p => p.id === id)!;
    return Promise.resolve({ ...product, ...data });
  },

  delete: async (id: number): Promise<void> => {
    // TODO: return apiDelete(`/products/${id}`);
    return Promise.resolve();
  },
};
