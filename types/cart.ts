export type CartItem = {
  vehicleId: string;
  slug: string;
  title: string;
  price: number;
  priceText: string;
  image: string;
  condition: string;
  year: number;
  make: string;
  model: string;
};

export type PaymentMethod =
  | "PAY_ON_INSPECTION"
  | "BANK_TRANSFER"
  | "CARD_DEMO";

export type OrderStatus =
  | "PENDING"
  | "AWAITING_INSPECTION"
  | "PENDING_CONFIRMATION"
  | "PAID"
  | "RESERVED"
  | "CANCELLED";

export type CheckoutPayload = {
  customerName: string;
  phone: string;
  email?: string;
  state?: string;
  city?: string;
  fulfilment: "inspect" | "delivery" | "collect";
  paymentMethod: PaymentMethod;
  notes?: string;
  items: CartItem[];
};

export type Order = CheckoutPayload & {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
};
