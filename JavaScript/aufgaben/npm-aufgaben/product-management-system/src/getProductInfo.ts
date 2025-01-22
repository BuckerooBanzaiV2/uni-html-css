import { products, Product } from "./product";

export function getProductInfo(input: string): Product | number {
  const productById = products.find(product => product.id === input);

  if (productById) {
    return productById;
  }

  const productByName = products.find(product => product.name.toLowerCase() === input.toLowerCase());

  if (productByName) {
    return productByName.price;
  }

  throw new Error("Produkt nicht gefunden");
}
