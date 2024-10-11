import { api } from "@/lib/axios";

export interface GetOrderDetailsQuery {
  orderId: string;
}

export interface GetOrderDetailsResonse {
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
  const response = await api.get<GetOrderDetailsResonse>(`/orders/${orderId}`)

  return response.data.order
}