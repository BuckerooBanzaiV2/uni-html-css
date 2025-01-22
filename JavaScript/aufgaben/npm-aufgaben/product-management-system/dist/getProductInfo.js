"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductInfo = getProductInfo;
const product_1 = require("./product");
function getProductInfo(input) {
    const productById = product_1.products.find(product => product.id === input);
    if (productById) {
        return productById;
    }
    const productByName = product_1.products.find(product => product.name.toLowerCase() === input.toLowerCase());
    if (productByName) {
        return productByName.price;
    }
    throw new Error("Produkt nicht gefunden");
}
