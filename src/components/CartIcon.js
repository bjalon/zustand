import useProductStore from "../store/productStore.ts";

function CartIcon({ setPage }) {
  const cartItems = useProductStore(state => state.cartItems);

  const handleGoToCart = () => {
    setPage("cart-page");
  };

  const itemsNumber = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <button className="btn-cart" onClick={handleGoToCart}>
      Panier ({itemsNumber})
    </button>
  );
}

export default CartIcon;
