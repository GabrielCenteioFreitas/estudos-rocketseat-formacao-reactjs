import { api } from "@/lib/axios";

export interface GetOrderDetailsQuery {
  orderId: string;
}

export interface GetOrderDetailsResponse {
  order: {
    id: string;
    status: "pending" | "processing" | "delivering" | "delivered" | "canceled";
    createdAt: string;
    totalInCents: number;
    customer: {
      name: string;
      email: string;
      phone: string | null;
    };
    orderItems: {
      id: string;
      quantity: number;
      product: {
        priceInCents: number;
        name: string;
      };
    }[];
  }
}

export async function getOrderDetails({
  orderId
}: GetOrderDetailsQuery) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data.order
}