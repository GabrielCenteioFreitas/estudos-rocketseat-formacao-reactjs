export type TOrderStatus =
  | "pending"
  | "processing"
  | "delivering"
  | "delivered"
  | "canceled"

interface OrderStatusProps {
  status: TOrderStatus
}

const orderStatusMap: Record<TOrderStatus, string> = {
  pending: 'Pendente',
  processing: 'Em preparo',
  delivering: 'Em entrega',
  delivered: 'Entregue',
  canceled: 'Cancelado',
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={`size-2 rounded-full
         ${status === 'pending'
            ? 'bg-slate-400'
            : status === 'canceled'
            ? 'bg-rose-500'
            : status === 'delivered'
            ? 'bg-emerald-500'
            : 'bg-amber-500'
          }
        `} 
      />
      <span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
    </div>
  )
}