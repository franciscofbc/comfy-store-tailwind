import { useSelector } from "react-redux"
import CartItem from "./CartItem"

const CartItemsList = () => {
    const { cartItems } = useSelector(store => store.cartState)

    return (
        <>
            {cartItems.map((cartItem) => {
                return <CartItem key={cartItem.cartId} cartItem={cartItem} />
            })}
        </>
    )
}

export default CartItemsList