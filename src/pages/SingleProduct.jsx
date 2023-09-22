import { Link, useLoaderData } from 'react-router-dom';
import {
  customFetch,
  formatPrice,
  generateAmountOptions,
} from '../utils/index';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    return { product: response.data.data };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const cartProduct = {
    cartId: product.id + productColor,
    productId: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-6 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="font-medium tracking-wider capitalize">colors</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${color === productColor && 'border-2 border-secondary'
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  />
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="font-medium tracking-wider capitalize">amount</h4>
            </label>
            <select
              id="amount"
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(6)}
            </select>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10">
            <button
              type="button"
              className="btn btn-secondary btn-md"
              onClick={addToCart}
            >
              add cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
