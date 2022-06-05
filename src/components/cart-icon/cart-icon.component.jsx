import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const dispatch = useDispatch();
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const cartCount = useSelector(selectCartCount)
  const isCartOpen = useSelector(selectIsCartOpen)

  const toggleisCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleisCartOpen}>
      <ShoppingIcon className="shopping-icon" />

      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
