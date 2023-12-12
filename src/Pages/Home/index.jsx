import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/card';
import ProductDetail from '../../components/ProductDetail';
import { ShoppingCartContext } from '../../Context';
import { useAuth } from "../../Context/authContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

function Home() {
  const context = useContext(ShoppingCartContext);
  const { user } = useAuth();
  const [userRole, setUserRole] = useState('');
  console.log(userRole)

  // Supongamos que tienes la información del rol del usuario en tu contexto de autenticación o usuario
  // Aquí, setUserRole se establece cuando se obtiene la información del usuario

  useEffect(() => {
    const fetchUserRole = async () => {
        if (user) {
            const q = query(collection(db, 'usuarios'), where('email', '==', user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUserRole(doc.data().role);
            });
        }
    };

    fetchUserRole();
}, [user]);

const isBuyer = userRole === 'comprador';
const isSeller = userRole === 'vendedor';

  const renderView = () => {
    if (context.searchByTitle?.length > 0) {
      if (context.filteredItems?.length > 0) {
        return context.filteredItems?.map((item) => <Card key={item.id} product={item} />);
      } else {
        return <p>Lo sentimos. No pudimos encontrar ningún producto.</p>;
      }
    } else {
      return context.products?.map((item) => <Card key={item.id} product={item} />);
    }
  };

  // const getTitleBasedOnRole = () => {
  //   if (userRole === isSeller) {
  //     return 'Tus Productos';
  //   } else if (userRole === isBuyer) {
  //     return 'Productos';
  //   } else {
  //     return 'Productos';
  //   }
  // };

  return (
    <Layout>
      {isSeller && (
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1 className='font-medium text-xl'>Tus productos</h1>
        </div>
      )}
      {isBuyer && (
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1 className='font-medium text-xl'>Productos</h1>
        </div>
      )}
      {!user && (
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1 className='font-medium text-xl'>Productos</h1>
        </div>
      )}      
      <input
        type='text'
        placeholder='Buscar un producto'
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>{renderView()}</div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
