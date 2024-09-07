import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { useRef } from "react";
import { IoMdArrowDroprightCircle , IoMdArrowDropleftCircle } from "react-icons/io";


function ProductDetails() {
  const { addItemToCart, setCartItems } = useContext(CartContext);


  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false ,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },

    ]

  };

  async function addItem(id) {
    const response = await addItemToCart(id);
    if (response.data.status === "success") {
      setCartItems(response.data.numOfCartItems);
      toast.success('Added to cart');
    }
  }

  const { id } = useParams();

  const {
    data: productDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    ),
    select: (data) => data.data.data,
  });



  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid sm:grid-cols-12 gap-4 dark:bg-gray-700 bg-gray-100">
            <div className="col-span-4 p-5">
              <Slider ref={slider => {sliderRef = slider;}}{...settings}>
                {productDetails?.images.map((i) => (
                  <div key={i}>
                    <img
                      src={i} 
                      alt="Product Image"
                      className="col-span-1  w-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
              <div className="flex  justify-center gap-4 mt-4">
                <button className="button" onClick={previous}>
                <IoMdArrowDropleftCircle className="text-2xl text-green-600"/>
                </button>
                <button className="button" onClick={next}>
                <IoMdArrowDroprightCircle className="text-2xl text-green-600" />
                </button>
              </div>

            </div>
            <div className="col-span-8 p-5 self-center dark:text-white">
              <h2>{productDetails?.title}</h2>
              <p className="my-3 font-light ">{productDetails?.description}</p>
              <h3 className="mb-2">{productDetails?.category?.name}</h3>
              <div className="flex justify-between mx-4 mb-3">
                <p>{productDetails?.price} EGY</p>
                <p className="flex items-center">
                  {productDetails?.ratingsAverage}
                  <FaStar className="text-yellow-400 ms-1" />
                </p>
              </div>
              <button
                onClick={() => addItem(productDetails._id)} // Changed to _id
                className="w-full bg-green-600 rounded-sm py-1 text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </>
      )}
    </>
  );
}

export default ProductDetails;
