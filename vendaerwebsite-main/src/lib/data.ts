import type { Order, Product } from '@/lib/types';

export const mockProducts: Product[] = [
  { id: 'PROD001', name: 'Ergonomic Office Chair', category: 'Furniture', price: 299.99, stock: 50, status: 'in-stock', imageUrl: 'https://picsum.photos/seed/p1/200/200' },
  { id: 'PROD002', name: 'Wireless Mechanical Keyboard', category: 'Electronics', price: 129.99, stock: 8, status: 'low-stock', imageUrl: 'https://picsum.photos/seed/p2/200/200' },
  { id: 'PROD003', name: '4K UHD Monitor', category: 'Electronics', price: 499.99, stock: 25, status: 'in-stock', imageUrl: 'https://picsum.photos/seed/p3/200/200' },
  { id: 'PROD004', name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 199.99, stock: 0, status: 'out-of-stock', imageUrl: 'https://picsum.photos/seed/p4/200/200' },
  { id: 'PROD005', name: 'Adjustable Standing Desk', category: 'Furniture', price: 399.99, stock: 15, status: 'in-stock', imageUrl: 'https://picsum.photos/seed/p5/200/200' },
];

export const mockOrders: Order[] = [
    { id: 'ORD001', customerName: 'Alice Johnson', customerEmail: 'alice@example.com', date: '2023-10-26', status: 'delivered', total: 329.98 },
    { id: 'ORD002', customerName: 'Bob Williams', customerEmail: 'bob@example.com', date: '2023-10-25', status: 'shipped', total: 129.99 },
    { id: 'ORD003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', date: '2023-10-25', status: 'processing', total: 499.99 },
    { id: 'ORD004', customerName: 'Diana Miller', customerEmail: 'diana@example.com', date: '2023-10-24', status: 'pending', total: 199.99 },
    { id: 'ORD005', customerName: 'Ethan Davis', customerEmail: 'ethan@example.com', date: '2023-10-23', status: 'cancelled', total: 399.99 },
];

export const salesData = [
  { name: 'Jan', total: 4230 },
  { name: 'Feb', total: 3120 },
  { name: 'Mar', total: 4890 },
  { name: 'Apr', total: 3560 },
  { name: 'May', total: 5210 },
  { name: 'Jun', total: 6100 },
  { name: 'Jul', total: 5800 },
  { name: 'Aug', total: 6300 },
  { name: 'Sep', total: 5900 },
  { name: 'Oct', total: 6800 },
  { name: 'Nov', total: 7200 },
  { name: 'Dec', total: 8100 },
];
