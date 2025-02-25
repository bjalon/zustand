import useProductStore from "../store/productStore.ts";

function ProductCard({ product }) {
  const addToCart = useProductStore(state => state.addToCart);

  const quantity = product.stock?.quantity?.value;

  const handleClick = () => {
    addToCart(product);
    console.log("Product added to cart", product);
  }

  return (
    <div className="col">
      <div className="product-card">
        <img
          className="product-card-image"
          src={product.image}
          alt={product.title}
        />
        <div className="product-card-description">
          <h3 className="product-card-title">{product.title}</h3>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
          { quantity < 1 ? (
            <span className="product-card-disable">Indisponible</span>
          ) : (
            <button
              onClick={handleClick}
              className="product-card-button btn"
            >
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;