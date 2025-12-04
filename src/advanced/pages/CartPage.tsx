import { CartItem, Coupon, ProductWithUI } from "../types/types";
import { ProductList } from "../components/CartPage/products/ProductList";
import { Cart } from "../components/CartPage/carts/Cart";

interface CartPageProps {
  products: ProductWithUI[];
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: ProductWithUI) => void;
  removeFromCart: (productId: string) => void;
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  setSelectedCoupon: React.Dispatch<React.SetStateAction<Coupon | null>>;
}

const CartPage = ({
  products,
  cart,
  setCart,
  addToCart,
  removeFromCart,
  coupons,
  selectedCoupon,
  setSelectedCoupon,
}: CartPageProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <ProductList products={products} cart={cart} addToCart={addToCart} />

      <Cart
        cart={cart}
        setCart={setCart}
        products={products}
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        setSelectedCoupon={setSelectedCoupon}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default CartPage;
