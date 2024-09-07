import Slider from "react-slick";
import Loading from "../Loading/Loading";
import useCategories from "../../Hooks/useCategories";

function CategorySlider() {
const {data : categories , isLoading , isError , error} = useCategories();

if(isLoading){
  return <Loading/>
}
if(isError){
  return <h3>{error}</h3>
}

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
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 2,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

if(categories.length === 0 ){
  return <Loading/>
}
  return (
    <Slider {...settings}>
      {
        categories?.map((c)=> <div key={c._id} className=" my-6 focus:outline-none">
          <img src={c.image} alt="" className="h-[200px] w-full object-cover" />
          <h3 className="text-sm text-green-600 mt-3 ">{c.name}</h3>
        </div>)
      }
    </Slider>
  );
}

export default CategorySlider;
