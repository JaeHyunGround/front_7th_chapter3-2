import { useState } from "react";
import { ProductWithUI } from "../../../types/types";
import AdminProductForm from "./AdminProductForm";
import AdminProductsTable from "./AdminProductsTable";

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  description: string;
  discounts: {
    quantity: number;
    rate: number;
  }[];
}

interface AdminProductsProps {
  products: ProductWithUI[];
  addProduct: (newProduct: Omit<ProductWithUI, "id">) => void;
  updateProduct: (productId: string, updates: Partial<ProductWithUI>) => void;
  deleteProduct: (productId: string) => void;
  addNotification: (
    message: string,
    type?: "error" | "success" | "warning"
  ) => void;
}

export const AdminProducts = ({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  addNotification,
}: AdminProductsProps) => {
  const [productForm, setProductForm] = useState<ProductForm>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    discounts: [] as Array<{ quantity: number; rate: number }>,
  });
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null); // new / productId / null

  // 상품 추가 시작할 때
  const startNewProduct = () => {
    setEditingProduct("new");
    setProductForm({
      name: "",
      price: 0,
      stock: 0,
      description: "",
      discounts: [],
    });
    setShowProductForm(true);
  };

  // 상품 수정 시작할 때
  const startEditProduct = (product: ProductWithUI) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description || "",
      discounts: product.discounts || [],
    });
    setShowProductForm(true);
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">상품 목록</h2>
          <button
            onClick={startNewProduct}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"
          >
            새 상품 추가
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <AdminProductsTable
          products={products}
          startEditProduct={startEditProduct}
          deleteProduct={deleteProduct}
        />
      </div>
      {showProductForm && (
        <AdminProductForm
          productForm={productForm}
          setProductForm={setProductForm}
          editingProduct={editingProduct}
          addProduct={addProduct}
          updateProduct={updateProduct}
          setEditingProduct={setEditingProduct}
          setShowProductForm={setShowProductForm}
          addNotification={addNotification}
        />
      )}
    </section>
  );
};
