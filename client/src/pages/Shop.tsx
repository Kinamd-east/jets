import { useState, useEffect } from "react";
import type { Product } from "@/types";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      setIsFetchingProducts(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/products/list`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to list products");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err: any) {
        console.error("Error listing products:", err.message);
      } finally {
        setIsFetchingProducts(false);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div>
      {isFetchingProducts ? (
        <div>Loading...</div>
      ) : (
        <div>
          {products && products.length > 0 ? (
            <div>These are products</div>
          ) : (
            <div className="flex flex-col min-h-screen items-center justify-center">
              <h1>Sorry!!!</h1>
              <p>Currently, we have nothing. Come again later...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
