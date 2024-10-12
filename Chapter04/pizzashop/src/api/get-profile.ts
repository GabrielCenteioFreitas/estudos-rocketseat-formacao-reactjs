import { api } from "@/lib/axios";

export interface GetProfileResponse {
  email: string;
  phone: string | null;
  name: string;
  id: string;
  role: "manager" | "customer";
  createdAt: Date;
  updatedAt: Date | null;
}

export async function getProfile() {
  const data = await api.get<GetProfileResponse>('/me')

  return data
}