import { Helmet } from 'react-helmet';
import useBrands from '../../Hooks/useBrands';
import BrandItem from '../BrandItem/BrandItem';
import Loading from '../Loading/Loading';

function Brands() {
  const { data: brands, isLoading, isError, error } = useBrands();

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <h3>{error}</h3>
  }

  return (
    <div>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h1 className='flex justify-center text-green-600 py-8'>All Brands</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {brands.map((b) => <BrandItem key={b._id} brand={b} />)}
          </div>
      </div>
  )
}

export default Brands