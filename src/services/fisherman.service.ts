import { Fisherman, FishermanReview } from '../types';
import { FISHERMEN, FISHERMAN_REVIEWS } from '../data';

export const FishermanService = {
  getAll: async (): Promise<Fisherman[]> => {
    // TODO: return apiGet<Fisherman[]>('/fishermen');
    return Promise.resolve(FISHERMEN);
  },

  getById: async (id: number): Promise<Fisherman | undefined> => {
    // TODO: return apiGet<Fisherman>(`/fishermen/${id}`);
    return Promise.resolve(FISHERMEN.find(f => f.id === id));
  },

  getReviews: async (fishermanId: number): Promise<FishermanReview[]> => {
    // TODO: return apiGet<FishermanReview[]>(`/fishermen/${fishermanId}/reviews`);
    return Promise.resolve(FISHERMAN_REVIEWS[fishermanId] ?? []);
  },

  search: async (query: string, sort: string): Promise<Fisherman[]> => {
    let results = [...FISHERMEN];
    if (query) results = results.filter(f =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.location.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
    if (sort === 'experience') results.sort((a, b) => b.experience - a.experience);
    if (sort === 'catches') results.sort((a, b) => b.catches - a.catches);
    else results.sort((a, b) => b.reviewCount - a.reviewCount);
    return Promise.resolve(results);
  },

  updateProfile: async (id: number, data: Partial<Fisherman>): Promise<Fisherman> => {
    // TODO: return apiPut<Fisherman>(`/fishermen/${id}`, data);
    const fisherman = FISHERMEN.find(f => f.id === id)!;
    return Promise.resolve({ ...fisherman, ...data });
  },
};
