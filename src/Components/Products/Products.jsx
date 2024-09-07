import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import Search from "../Search/Search";
import { useState } from "react";
import NotFoundProduct from "../../assets/imgs/U5kB4601.svg"
import { Helmet } from "react-helmet";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, isLoading, isError, error } = useProducts();

  function search(e) {
    setSearchTerm(e.target.value);
  }

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    return <h3>{error}</h3>;
  }

  return (
    <>
    <Helmet>
        <title>Products</title>
      </Helmet>
    <Search search={search} searchTerm={searchTerm} />
    
    {filteredProducts?.length > 0 ? (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {filteredProducts.map((p) => <ProductItem key={p._id} product={p} />)}
      </div>
    ) : (
      <div className="flex flex-col items-center mt-10">
        <h3 className="text-green-600 italic">No products found</h3>
        <img src={NotFoundProduct} alt="No products found" />
      </div>
    )}
  </>
  );
}

export default Products;
