import ProductsPage from "./pages/ProductsPage.js";
import CardPage from "./pages/CartPage.js";
import Main from "./components/Main.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import LoginPage from "./pages/LoginPage.js";
import { useEffect, useState } from "react";
import ThemeContext from "./contexts/ThemeContext.js";
import LanguageContext from "./contexts/LanguageContext.js";
import { ThemeProvider } from "./contexts/ThemeContextHook.js";
import Counter from "./components/Counter.js";
import { BounceLoader } from "react-spinners";
import useProductStore from "./store/productStore.ts";
import useShopStore from "./store/shopStore.ts";
import Message from "./components/Message.js";

export default function App() {
  const [page, setPage] = useState("products-page");
  // const [ theme, setTheme ] = useState("dark");
  const [lang, setLang] = useState("fr");
  // const [isLoading, setIsLoading] = useState(true);
  const isLoading = useShopStore((state) => state.isLoading);
  const message = useShopStore((state) => state.message);
  const getProducts = useProductStore((state) => state.getProducts);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      console.log("before", page);
      setPage("ma-page");
      console.log("after", page);
    };

    fetchData().then();
  }, []);

  console.log("outside useeffect", page);
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {/* <ThemeContext.Provider value={{theme, setTheme}}> */}
      <ThemeProvider>
        <div className="app">
          <Header setPage={setPage} />
          <Main>
            {/* <Counter /> */}
            {message && <Message />}
            {isLoading ? (
              <BounceLoader />
            ) : (
              (page === "products-page" && (
                <ProductsPage setPage={setPage} />
              )) ||
              (page === "login-page" && <LoginPage />) ||
              (page === "cart-page" && <CardPage />)
            )}
          </Main>
          <Footer />
        </div>
      </ThemeProvider>
      {/* </ThemeContext.Provider> */}
    </LanguageContext.Provider>
  );
}
