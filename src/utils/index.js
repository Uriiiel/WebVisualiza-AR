/**
 * This file contains all the utility functions that are used in the application.
 * @params {Array} products - Array of products
 * @returns {Number} sum - Total price of all the products in the cart.
 */

export const totalPrice = (products) => {
    let sum = 0; // Inicializar la suma como un número, no como una cadena

    products.forEach(product => {
        // Convertir el precio del producto a un número y sumarlo
        sum += parseFloat(product.productPrice); // O Number(product.productPrice);
    });

    return sum;
}
