import { useSelector } from 'react-redux';
import { CartTotals, SectionTitle, CheckoutForm } from '../components';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn('you must be logged in to checkout');
    return redirect('/login');
  }
  return null;
};

const Checkout = () => {
  const { numItemsInCart } = useSelector((store) => store.cartState);

  if (numItemsInCart === 0) {
    return <SectionTitle text="your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
