import { XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import './styles.css'

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext)

    return (
        <aside
            className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2>Detail</h2>
                <div>
                    <XMarkIcon
                        className='h-6 w-6 text-black'
                        onClick={() => context.closeProductDetail()}
                    />
                </div>
            </div>
            <figure>
                <img
                    className='w-full h-full rounded-lg p-6'
                    src={context.productToShow.image}
                />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl mb-2'>${context.productToShow.price}</span>
                <span className='font-medium text-md'>${context.productToShow.title}</span>
                <span className='font-light  text-sm'>${context.productToShow.description}</span>
            </p>
        </aside >
    )
}

export default ProductDetail