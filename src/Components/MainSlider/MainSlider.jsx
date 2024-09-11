import Slider from 'react-slick';
import img1 from '../../assets/imgs/main-slider-1.jpeg';
import img2 from '../../assets/imgs/main-slider-2.jpeg';
import img3 from '../../assets/imgs/main-slider-3.jpeg';
import img4 from '../../assets/imgs/slide-1.jpeg';
import img5 from '../../assets/imgs/slide-2.jpeg';
import { useRef } from 'react';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io';
function MainSlider() {

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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
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
  return (
    <>
      <div className="grid grid-cols-12">

        <div className="md:col-span-8 col-span-12">
          <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
            <img src={img1} alt="" className='h-[400px] w-full object-cover' />
            <img src={img4} alt="" className='h-[400px] w-full object-cover' />
            <img src={img5} alt="" className='h-[400px] w-full object-cover' />
          </Slider>

        </div>
        <div className="md:col-span-4 col-span-12">
          <img src={img2} alt="" className='h-[200px] w-full object-cover' />
          <img src={img3} alt="" className='h-[200px] w-full object-cover' />
        </div>
      </div>
      <div className="flex justify-center items-center gap-1 mt-4">
        <button className="button" onClick={previous}>
          <IoMdArrowDropleftCircle className="text-2xl md:text-4xl text-green-600" />
        </button>
        <button className="button" onClick={next}>
          <IoMdArrowDroprightCircle className="text-2xl md:text-4xl text-green-600" />
        </button>
      </div>
    </>
  )
}

export default MainSlider
