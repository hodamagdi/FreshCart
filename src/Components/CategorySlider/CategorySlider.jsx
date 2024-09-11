import Slider from "react-slick";
import Loading from "../Loading/Loading";
import useCategories from "../../Hooks/useCategories";
import { useRef } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

function CategorySlider() {
  let sliderRef = useRef(null);
  
const {data : categories , isLoading , isError , error} = useCategories();

if(isLoading){
  return <Loading/>
}
if(isError){
  return <h3>{error}</h3>
}

const next = () => {
  sliderRef.slickNext();
};
const previous = () => {
  sliderRef.slickPrev();
};

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false ,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll:1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
    ]
  };

if(categories.length === 0 ){
  return <Loading/>
}
  return (
    <>
    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
      {
        categories?.map((c)=> <div key={c._id} className=" my-6 focus:outline-none">
          <img src={c.image} alt="" className="h-[200px] w-full object-cover" />
          <h3 className="text-sm text-green-600 mt-3 ">{c.name}</h3>
        </div>)
      }
    </Slider>
     <div className="flex justify-center items-center gap-1 mb-2">
     <button className="button" onClick={previous}>
       <IoMdArrowDropleftCircle className="text-2xl md:text-4xl text-green-600" />
     </button>
     <button className="button" onClick={next}>
       <IoMdArrowDroprightCircle className="text-2xl md:text-4xl text-green-600" />
     </button>
   </div>
    </>
  );
}

export default CategorySlider;
