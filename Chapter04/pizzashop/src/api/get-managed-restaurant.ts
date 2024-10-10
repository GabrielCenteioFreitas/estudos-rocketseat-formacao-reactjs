import { api } from "@/lib/axios";

export interface GetManagedRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  managerId: string | null;
}

export async function getManagedRestaurant() {
  const data = await api.get<GetManagedRestaurantResponse>('/managed-restaurant')

  return data
}