import { create, StateCreator } from 'zustand'
import ProductService from '../services/ProductService';
import useShopStore from './shopStore';
import { devtools } from 'zustand/middleware';

const produitsToDisplay = [
  {
    id: 1,
    title:
      "Fjallraven - Sac à dos Foldsack No. 1, peut contenir 15 ordinateurs portables",
    price: 109.95,
    description:
      "Votre sac parfait pour un usage quotidien et des promenades en forêt. Rangez votre ordinateur portable (jusqu'à 15 pouces) dans la housse rembourrée, votre quotidien",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    title: "T-shirts slim fit décontractés pour hommes",
    price: 22.3,
    description:
      "Style ajusté, manches longues raglan contrastées, patte de boutonnage Henley à trois boutons, tissu léger et doux pour un port respirant et confortable. Et des chemises cousues solides avec un col rond conçues pour la durabilité et une coupe parfaite pour les vêtements de mode décontractés et les fans de baseball inconditionnels. L'encolure ronde de style Henley comprend une patte de boutonnage à trois boutons.",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
];

interface Product {
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
  stock?: {
    quantity: {
      value: number
    }
  }
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductState {
  products: Product[],
  cartItems: CartItem[]
}

interface ProductActions {
  getProducts: () => Promise<void>,
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (type: "increment" | "decrement", id: number) => void;
  resetCart: () => void;
}

const productStore: StateCreator<ProductState & ProductActions, [["zustand/devtools", never]]>  = (set, get) => ({
  products: [],
  cartItems: [],
  getProducts: async () => {
    // console.log("get", get())

    // Mettre isLoading à true
    useShopStore.getState().setIsLoading(true);

    // Effectuer un appel API pour aller chercher nos produits
    try {
      const productList = await ProductService.getProductsFromApi();
      // console.log("getProducts", productList);

      // Mettre loading à false
      // Mise à jour du store
      set({ products: productList })

    } catch(error : any){
      console.log(error)
      useShopStore.getState().setMessage({
        messageText: error.message,
        type: "error"
      })
    } finally {
      useShopStore.getState().setIsLoading(false);
    } 

  },
  addToCart: (product: Product) => {
    const productExistInCart = get().cartItems.filter(
      (item) => item.id === product.id,
    );
    if (productExistInCart.length < 1) {
      set(
        {
          cartItems: [
            ...get().cartItems,
            {
              ...product,
              quantity: 0,
            }
          ]
        }
      );
    }
    get().updateQty("increment", product.id);
    console.log("Product Added successfully");
  },
  removeFromCart: (id: number) => {
    set(
      {
        cartItems: get().cartItems.filter((item) => item.id != id),
      }
    );
    get().updateQty("decrement", id);
    console.log("Le produit a été retiré");
  },
  updateQty: (type: "increment" | "decrement", id: number) => {
    const item = get().cartItems.filter((item) => item.id === id);
    if (typeof item === "undefined" || item.length < 1) return;

    if (type === "decrement" && item[0].quantity === 1) {
      set(
        {
          cartItems: get().cartItems.filter((item) => item.id != id),
        }
      );
    } else {
      const newQuantity: number =
        type === "increment" ? item[0].quantity + 1 : item[0].quantity - 1;
      const newItems = get().cartItems.map((item) =>
        item.id !== id ? item : { ...item, quantity: newQuantity },
      );
      set({ cartItems: newItems });
      console.log("The quantity has been updated");
    }
    // Update quantity for products list
    const decrement = type === 'increment' ? -1 : 1;
    const updatedProducts = get().products.map(product => {
      if(product.id === id) {
        return {
          ...product,
          stock: {
            ...product.stock,
            quantity: {
              ...product?.stock?.quantity,
              value:  (product.stock?.quantity?.value || 0)  + decrement
            }
          }
        }
      } else {
        return product;
      }
    })
    set({ products: updatedProducts })
    
  },
  resetCart: () => set({ cartItems: [] }),
});

const useProductStore = create<ProductState & ProductActions>()(
  devtools(
    productStore
  )
  
)

export default useProductStore;
