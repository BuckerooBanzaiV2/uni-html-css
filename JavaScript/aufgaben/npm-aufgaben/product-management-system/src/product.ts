export type Product = {
  id: string;
  name: string;
  price: number;
};

export const products: Product[] = [
  { id: "1", name: "Laptop", price: 999.99 },
  { id: "2", name: "Smartphone", price: 599.99 },
  { id: "3", name: "Headphones", price: 199.99 },
];
