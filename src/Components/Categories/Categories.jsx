import { Helmet } from 'react-helmet';
import useCategories from '../../Hooks/useCategories';
import CategoryItem from '../CategoryItem/CategoryItem';
import Loading from '../Loading/Loading';

function Categories() {
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <h3>{error}</h3>
  }

  return (
    <>
    <Helmet>
        <title>Categories</title>
      </Helmet>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {categories.map((c) => <CategoryItem key={c._id} category={c} />)}
    </div>
    </>
  )
}

export default Categories
