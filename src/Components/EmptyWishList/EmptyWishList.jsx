import { Link } from "react-router-dom";
import emptyWishList from "../../assets/imgs/wishList.svg";


function EmptyWishList() {
  return (
    <>
     <>
     <div className="h-[60vh] flex flex-col justify-center items-center">
        <img src={emptyWishList} alt="Empty WishList" className="w-full h-1/2 " />
        <h4 className="dark:text-gray-100">Your WishList is empty! Time to treat yourself —
        <Link to={"/"} className="cursor-pointer text-green-600 inline ms-2">Start Shopping!</Link>
           </h4>
       
      </div>
    </>
    </>
  )
}

export default EmptyWishList
