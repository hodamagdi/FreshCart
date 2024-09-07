import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { FaRegTrashAlt } from "react-icons/fa";
import CartItem from '../CartItem/CartItem';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from './../Loading/Loading';
import EmptyCart from '../EmptyCart/EmptyCart';
import { Helmet } from 'react-helmet';

function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserCart,  clearCart } = useContext(CartContext);

  // Get User Cart
  async function getLoggedUserCart() {
    setIsLoading(true);
    const response = await getUserCart();
    if (response?.data.status === "success") {
      setCartDetails(response?.data.data);
    }
    setIsLoading(false);
  }

 
  // Clear cart
  async function clearAllCart() {
    setIsLoading(true);
    const response = await clearCart();
    if (response.data.message === "success") {
      setCartDetails({ ...cartDetails, products: [] });
      toast.success('Cart cleared successfully');
    }
    setIsLoading(false);
  }


  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {
        cartDetails && cartDetails.products.length === 0 ? (
          <EmptyCart />
        ) : (
          <div >
            <div className='bg-gray-100 dark:bg-gray-800 dark:text-gray-100 '>
              <h2 className="px-3 italic">Cart Shop</h2>
              <div className="flex justify-between items-center px-3">
                <h3 className="h4 my-3">
                  Total Price: <span className="text-green-600">{cartDetails?.totalCartPrice} EGY</span>
                </h3>
                <button
                  onClick={clearAllCart}
                  className="border-green-500 border px-2 rounded-md max-h-fit mx-2 flex items-center gap-2"
                >
                  <FaRegTrashAlt className="text-green-600" />
                  Clear Your Cart
                </button>
              </div>
            </div>
            <div>
              <div className="bg-gray-200 dark:bg-gray-700 dark:text-white py-4" >
                {
                  cartDetails?.products.map(p => (
                    <CartItem
                      key={p._id}
                      count={p.count}
                      price={p.price}
                      product={p.product}
                      setCartDetails={setCartDetails}
                    />
                  ))
                }
                <div className="flex justify-center items-center">
                  <div className="p-3 rounded-md bg-green-600 flex justify-center items-center w-fit text-gray-100 text-center">
                    <Link to={'/checkout/' + cartDetails?._id}>
                      Checkout Session
                    </Link>
                  </div>
                </div>
              </div>
              {/* Checkout component */}
            </div>
          </div>
        )
      }
    </>
  );
}

export default Cart;
