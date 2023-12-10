/**
 * This file contains all the utility functions that are used in the application.
 * @params {Array} products - Array of products
 * @returns {Number} sum - Total price of all the products in the cart.
 */

export const totalPrice = (products) => {
    let sum = 0;
    products.forEach(product => sum += product.price);

    return sum;
}