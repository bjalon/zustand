import PageLayout from "../components/PageLayout.js";
import useProductStore from "../store/productStore.ts";

function CartPage() {
  const cartItems = useProductStore(state => state.cartItems);
  const updateQty = useProductStore(state => state.updateQty);
  const removeFromCart = useProductStore(state => state.removeFromCart);

  const subtotal =
    cartItems instanceof Array
      ? cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
      : 0;
  const totalQty =
    cartItems instanceof Array ? cartItems.reduce((sum, i) => sum + i.quantity, 0) : 0;
  const tax = subtotal * 0.2; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <PageLayout
      titleFr={`Panier (${totalQty})`}
      titleEn={`Shopping Cart (${totalQty})`}
    >
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item-wrapper">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-text">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">{item.price.toFixed(2)}€</p>
              <div className="cart-item-buttons">
                <button
                  className="btn cart-item-edit-qty"
                  onClick={() => {
                    updateQty("decrement", item.id)
                  }}
                >
                  -
                </button>
                <span className="cart-item-qty">{item.quantity}</span>
                <button
                  className="btn cart-item-edit-qty"
                  onClick={() => {
                    updateQty("increment", item.id)
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="btn cart-item-remove"
              onClick={() => {
                removeFromCart(item.id)
              }}
            >
              Retirer
            </button>
          </div>
        ))
      ) : (
        <p>Votre panier est vide</p>
      )}
    </PageLayout>
  );
}

export default CartPage;
