import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import { totalPrice } from '../../utils';
import './styles.css';

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDeleteProduct = id => {
        const newCartProducts = context.cartProducts.filter(product => product.id !== id)
        context.setCartProducts(newCartProducts)
        context.setCount(context.count - 1)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: new Date().toLocaleDateString(),
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
    }

    return (
        <aside
            className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>

            <div className='flex justify-between items-center p-6'>
                <h2>My Order</h2>
                <div>
                    <XMarkIcon
                        className='h-6 w-6 text-black'
                        onClick={() => context.closeCheckoutSideMenu()}
                    />
                </div>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.image}
                            price={product.price}
                            handleDeleteProduct={handleDeleteProduct}
                        />
                    ))
                }
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total: </span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link
                    to='/my-orders/last'
                >
                    <button
                        className='w-full bg-black text-white rounded-lg py-2 mt-4'
                        onClick={() => handleCheckout()}
                    >
                        Checkout
                    </button>
                </Link>
            </div>
        </aside >
    )
}

export default CheckoutSideMenu