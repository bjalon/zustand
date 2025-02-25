import { act, renderHook } from "@testing-library/react";
import useProductStore from "./productStore";
import ProductService from "../services/ProductService";
import useShopStore from "./shopStore";

const productList = [{
    id: 3,
    title: "Veste en coton pour homme",
    price: 55.99,
    description: "superbes vestes d'extérieur pour le printemps/automne/hiver, adaptées à de nombreuses occasions, telles que le travail, la randonnée, le camping, l'escalade, le vélo, les voyages ou autres activités de plein air. Bon choix de cadeau pour vous ou un membre de votre famille. Un amour chaleureux au père, au mari ou au fils en ce jour de Thanksgiving ou de Noël.",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    stock: {
        quantity: {
            value: 5
        }
    }
},
{
    id: 4,
    title: "Coupe slim décontractée pour hommes",
    price: 15.99,
    description: "La couleur peut être légèrement différente entre l'écran et la pratique. / Veuillez noter que les morphologies varient selon les personnes, par conséquent, les informations détaillées sur les tailles doivent être examinées ci-dessous dans la description du produit.",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    stock: {
        quantity: {
            value: 5
        }
    }
}];

const productToAdd = {
    id: 1,
    title:
        "Fjallraven - Sac à dos Foldsack No. 1, peut contenir 15 ordinateurs portables",
    price: 109.95,
    description:
        "Votre sac parfait pour un usage quotidien et des promenades en forêt. Rangez votre ordinateur portable (jusqu'à 15 pouces) dans la housse rembourrée, votre quotidien",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    stock: {
        quantity: {
            value: 5
        }
    }
};

jest.mock("./shopStore.ts");

describe("useProductStore", () => {

    let mockStaticMethod = jest.fn();
    ProductService.getProductsFromApi = mockStaticMethod;

    describe("initialisation", () => {
        test("Le store doit s'initialiser correctement", () => {
            const { result } = renderHook(() => useProductStore());
            // console.log(result.current)
            expect(result.current.products).toHaveLength(0);
            expect(result.current.cartItems).toEqual([]);
        });
    })

    describe("Test des mutations du store", () => {
        // Clear the store before each test
        beforeEach(() => {
            // useProductStore.setState({
            //   products: productList,
            //   cartItems: []
            // })

            // Mocker le shop store
            const mockSetMessage = jest.fn();
            useShopStore.mockReturnValue({
                setMessage: mockSetMessage
            })
        })
        test("Récupération des produits", async () => {
            // GRAVE erreur : ne pas tester trop loin de notre élément cible
            // Mock fetch API
            // global.fetch = jest.fn(() =>
            //   Promise.resolve({
            //     json: () => Promise.resolve(productList)
            //   })
            // ) as jest.Mock

            // mockStaticMethod.mockImplementation(() => {
            //     throw new Error();
            // });

            mockStaticMethod.mockReturnValue(productList);

            // Load the products from the external API (mocked)
            // const { getProducts } = useProductStore.getState()
            // await getProducts()

            // Check the product list in the store
            // const products = useProductStore.getState().products;
            // expect(products).toEqual(productList)

            const { result } = renderHook(() => useProductStore());
            act(() => {
                result.current.getProducts();
            })
            expect(result.current.products).toHaveLength(2);

        })
        test.only("Lors d'une erreur à l'appel de getProductsFromApi, une erreur doit apparaitre dans le shopStore", () => {
            const { result } = renderHook(() => useProductStore());
            // console.log(result.current)
            expect(result.current.products).toHaveLength(0);
            expect(result.current.cartItems).toEqual([]);
        });
        test.skip('Je peux ajouter ou retirer un article du panier', () => {
            const { result } = renderHook(() => useProductStore())

            act(() => {
                result.current.addToCart(productToAdd)
            })

            expect(result.current.cartItems).toHaveLength(1)
            expect(result.current.cartItems[0].price).toEqual(109.95)

            act(() => {
                result.current.removeFromCart(1)
            })

            expect(result.current.cartItems).toHaveLength(0)
        })

        test.skip('Je peux modifier les quantités des produits dans mon panier', () => {
            const { result } = renderHook(() => useProductStore())

            act(() => {
                result.current.addToCart(productToAdd)
                result.current.updateQty('increment', productToAdd.id)
            })

            expect(result.current.cartItems[0].quantity).toEqual(2)

            act(() => {
                result.current.updateQty("decrement", productToAdd.id)
            })

            expect(result.current.cartItems[0].quantity).toEqual(1)
        })

        test.skip('Je peux vider mon panier', () => {
            const { result } = renderHook(() => useProductStore())

            act(() => {
                result.current.addToCart(productToAdd)
                result.current.resetCart()
            })

            expect(result.current.cartItems).toEqual([])
        })
    })

});