import { useContext, useState } from "react";
import { FaRegTrashAlt, FaSpinner } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

function CartItem({ count, price, product,setCartDetails }) {
  const [isIncrementLoading, setIsIncrementLoading] = useState(false);
  const [isDecrementLoading, setIsDecrementLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { UpdateItemCount, deleteItemCount } = useContext(CartContext);

  // Update Item Count (Decrement or Increment)
  async function UpdateCount(id, newCount, action) {
    if (action === "increment") {
      setIsIncrementLoading(true);
    } else {
      setIsDecrementLoading(true);
    }

    const response = await UpdateItemCount(id, newCount);
    if (response.data.status === "success") {
      setCartDetails(response?.data.data);
      toast.success("Updated");
    }

    setIsIncrementLoading(false);
    setIsDecrementLoading(false);
  }

  // Delete Item from Cart
  async function deleteItemFromCart(id) {
    setIsDeleteLoading(true);
    const response = await deleteItemCount(id);
    if (response.data.status === "success") {
      setCartDetails(response?.data.data);
      toast.success("Deleted");
    }
    setIsDeleteLoading(false);
  }

  return (
    <>
      <div className="flex gap-3 mx-4">
        <div className="">
          <img
            src={product?.imageCover}
            alt={product?.title}
            className="h-[100px] w-[100px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>{product?.title}</p>
          <p className="text-green-600">
            <FcMoneyTransfer className="inline me-1" />
            {price} EGY
          </p>
          <span
            onClick={() => deleteItemFromCart(product.id)}
            className="flex items-center gap-1 cursor-pointer text-red-500"
            aria-label={`Remove ${product?.title} from cart`}>
            {isDeleteLoading ? <FaSpinner className="animate-spin" /> : <FaRegTrashAlt />}
            Remove
          </span>
        </div>
        <div className="flex items-center justify-center ms-auto">
          {/* Decrement Button */}
          <button
            onClick={() => UpdateCount(product.id, count - 1, "decrement")}
            disabled={count === 1 || isDecrementLoading || isDeleteLoading}
            className={`border-green-500 border px-2 rounded-md max-h-fit mx-2 ${
              count === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {isDecrementLoading ? <FaSpinner className="animate-spin" /> : "-"}
          </button>

          <h5 className="mx-2">{count}</h5>

          {/* Increment Button */}
          <button
            onClick={() => UpdateCount(product.id, count + 1, "increment")}
            disabled={isIncrementLoading || isDeleteLoading}
            className="border-green-500 border px-[6px] rounded-md max-h-fit mx-2">
            {isIncrementLoading ? <FaSpinner className="animate-spin" /> : "+"}
          </button>
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-800" />
    </>
  );
}

export default CartItem;
