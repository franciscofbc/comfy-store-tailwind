import Filters from '../components/FIlters';
import PaginationContainer from '../components/PaginationContainer';
import ProductsContainer from '../components/ProductsContainer';
import { customFetch } from '../utils/index';

const url = '/products';

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch(url, {
    params,
  });
  return { products: response.data.data, meta: response.data.meta, params };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
