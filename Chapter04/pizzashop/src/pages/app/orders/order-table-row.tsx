import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus, TOrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { deliverOrder } from "@/api/deliver-order";
import { approveOrder } from "@/api/approve-order";
import { dispatchOrder } from "@/api/dispatch-order";

interface OrderTableRowProps {
  order: {
    status: TOrderStatus;
    createdAt: string;
    orderId: string;
    customerName: string;
    total: number;
  }
}

export const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: TOrderStatus) {
    const cachedOrdersList = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    cachedOrdersList.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            }
          }

          return order
        })
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'canceled')
    },
  })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivered')
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="">
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">
        {order.customerName}
      </TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' ? (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId})}
            disabled={isApprovingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="size-3 mr-2" />
            Aprovar
          </Button>
        ) : order.status === 'processing' ? (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId})}
            disabled={isDispatchingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="size-3 mr-2" />
            Em entrega
          </Button>
        ) : order.status === 'delivering' && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId})}
            disabled={isDeliveringOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="size-3 mr-2" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId})}
          disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
          variant="ghost"
          size="xs"
        >
          <X className="size-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
