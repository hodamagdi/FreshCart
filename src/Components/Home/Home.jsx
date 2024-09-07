import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}

export default Home;
