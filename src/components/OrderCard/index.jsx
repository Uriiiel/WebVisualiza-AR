import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard = product => {
    const { id, title, imageUrl, price, handleDeleteProduct } = product;

    let renderXMarkIcon;
    if (handleDeleteProduct)
        renderXMarkIcon = <XMarkIcon onClick={() => handleDeleteProduct(id)} className='h-6 w-6 text-black cursor-pointer' />

    return (
        <div className="flex justify-between items-center mb-6">
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20'>
                    <img className='w-full h-full rounded-lg object-cover' src={imageUrl}></img>
                </figure>
                <p className='text-sm font-light line-clamp-5'>{title}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-lg font-medium'>{price}</p>
                {renderXMarkIcon}
            </div>
        </div>
    )
}

export default OrderCard