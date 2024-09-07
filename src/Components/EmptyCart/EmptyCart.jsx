import { Link } from "react-router-dom";
import emptycart from "../../assets/imgs/picsvg_download.svg";


function EmptyCart() {

  return (
    <>
     <div className="h-[50vh] flex flex-col justify-center items-center">
        <img src={emptycart} alt="Empty Cart" className="w-full h-1/2" />
        <h4 className="dark:text-gray-100">Your cart is empty! Time to treat yourself —
        <Link to={"/"} className="cursor-pointer text-green-600 inline ms-2">Start Shopping!</Link>
           </h4>
       
      </div>
    </>
  )
}

export default EmptyCart
