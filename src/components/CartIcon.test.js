import CartIcon from "./CartIcon";
import useProductStore from "../store/productStore.ts";
import { render, screen } from "@testing-library/react";

jest.mock("../store/productStore.ts");

describe("GIVEN no element in cart", () => {
  beforeEach(() => {
    render(<CartIcon setPage={() => {}} />);
    // Mocker le store
    useProductStore.mockReturnValue({
        cartItems: []
    })

    // jest.mock("../store/useProductStore.ts", () => ({
    //   useProductStore: (passedFunction) => {
    //     const data = {
    //       cartItems: [],
    //     };
    //     return passedFunction(data);
    //   },
    // }));
  });

  describe("WHEN we display the Cart icon", () => {
    test.skip("THEN the cart icon show 0 element", async () => {
      const buttonNode = await screen.findByRole("button", /panier/i);
      expect(buttonNode).toHaveTextContent("0");
    });
  });
  describe("WHEN one element is added", () => {
    test("THEN one element is shown", () => {});
  });
  afterEach(() => {});
});
