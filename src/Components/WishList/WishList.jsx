import { useContext, useEffect, useState } from "react"
import { WishListContext } from "../../Context/WishListContext"
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import WishListItem from "../WishListItem/WishListItem";
import EmptyWishList from "../EmptyWishList/EmptyWishList";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { addItemToCart, setCartItems } = useContext(CartContext);
  const { isInWishList, setisInWishList, getWish, deleteUserWishList, isLoading, setIsLoading } = useContext(WishListContext);

  // add product to cart 
  async function addItem(id) {
    setIsLoading(true);
    const response = await addItemToCart(id);
    if (response.data.status === "success") {
      setIsLoading(false);
      setCartItems(response.data.numOfCartItems);
      toast.success('Added to cart.');
    }
  }

  //delete item from wishlist
  async function deleteWish(id) {
    setIsLoading(true);
    const response = await deleteUserWishList(id);
    if (response.data.status === "success") {
      setIsLoading(false);

      // Update the wishlist
      const updatedWishList = isInWishList.filter(item =>
        response.data.data.includes(item._id)
      );
      setisInWishList(updatedWishList);

      toast.success('Removed from wishlist.');
    }
  }

  useEffect(() => {
    getWish();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      {
        isInWishList && isInWishList.length === 0 ? (
          <EmptyWishList />
        ) : (
          <div>
            <h1 className='flex justify-center text-green-600 py-8'>My WishList</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
              {
                isInWishList?.map((w, index) => (
                  <WishListItem
                    key={w?._id || index}
                    wishProduct={w}
                    addItem={addItem}
                    deleteWish={deleteWish}
                  />
                ))
              }
            </div>
          </div>
        )}
    </>
  );
}
