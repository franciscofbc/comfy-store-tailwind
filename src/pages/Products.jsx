import Filters from '../components/FIlters';
import PaginationContainer from '../components/PaginationContainer';
import ProductsContainer from '../components/ProductsContainer';
import { customFetch } from '../utils/index';

const url = '/products';

export const loader = async ({ request }) => {
  const response = await customFetch(url);
  return { products: response.data.data, meta: response.data.meta };
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
