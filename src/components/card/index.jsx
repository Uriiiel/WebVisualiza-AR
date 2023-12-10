import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'

const Card = (prueba) => {
  const context = useContext(ShoppingCartContext)

  const showProductDetail = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)
  }

  const addProductToCart = (event, product) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, product])
    context.openCheckoutSideMenu()
    context.closeProductDetail()
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0
    if (isInCart) {
      return (
        <button
          className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'
        >
          <CheckIcon
            className='h-4 w-4 text-white'
          />
        </button>
      )
    } else {
      return (
        <button
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => addProductToCart(event, prueba.product)}
        >
          <PlusIcon
            className='h-4 w-4 text-black'
          />
        </button>
      )
    }
  }

  return (
    <div
      className='bg-white cursor-pointer w-56 h-60 rounded-lg'
      onClick={() => showProductDetail(prueba.product)}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>
          {prueba.product.category}
        </span>
        <img className='w-full h-full object-cover rounded-lg' src={prueba.product.image} alt='headphones' />
        {renderIcon(prueba.product.id)}
      </figure>
      <p className='flex justify-between'>
        <span className='text-sm font-light'>{prueba.product.title}</span>   
        <span className='text-lg font-medium'>${prueba.product.price}</span>
      </p>
    </div>
  )
}

export default Card