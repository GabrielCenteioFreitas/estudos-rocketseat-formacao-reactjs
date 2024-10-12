import { http, HttpResponse } from 'msw'
import { GetOrderDetailsResponse, GetOrderDetailsQuery } from '../get-order-details'

export const getOrderDetailsMock = http.get<GetOrderDetailsQuery, never, GetOrderDetailsResponse>(
  '/orders/:orderId',
  ({ params }) => {
    return HttpResponse.json({
      order: {
        id: params.orderId,
        totalInCents: 5000,
        status: 'pending',
        createdAt: new Date().toISOString(),
        customer: {
          email: 'johndoe@example.com',
          name: 'John Doe',
          phone: '123456789',
        },
        orderItems: [
          {
            id: 'order-item-1',
            product: {
              name: 'Pizza 1',
              priceInCents: 1000,
            },
            quantity: 1,
          },
          {
            id: 'order-item-2',
            product: {
              name: 'Pizza 2',
              priceInCents: 2000,
            },
            quantity: 2,
          },
        ],
      },
    })
  }
)