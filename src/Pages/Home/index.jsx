import { useContext } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/card'
import ProductDetail from '../../components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    if (context.searchByTitle?.length > 0) {
      if (context.filteredItems?.length > 0) {
        return (
          context.filteredItems?.map(item => (
            <Card key={item.id} product={item} />
          ))
        )
      } else {
        return (
          <p>We're sorry. We couldn't find any products.</p>
        )
      }
    } else {
      return (
        context.products?.map(item => (
          <Card key={item.id} product={item} />
        ))
      )
    }
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Muebles</h1>
      </div>
      <input
        type='text'
        placeholder='Buscar un producto'
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />

      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home