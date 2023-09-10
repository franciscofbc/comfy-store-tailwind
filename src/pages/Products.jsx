import Filters from '../components/FIlters';
import PaginationContainer from '../components/PaginationContainer';
import ProductsContainer from '../components/ProductsContainer';
import { customFetch } from '../utils/index';

const url = '/products';

const allProductsQuery = (params) => {
  const { search, category, company, sort, price, shipping, page } = params;
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
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
