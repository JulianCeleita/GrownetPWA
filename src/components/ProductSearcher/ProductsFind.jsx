import React from "react";
import { useTranslation } from "react-i18next";
import useProductStore from "../../store/useProductStore";
import ProductCard from "../ProductDetail/ProductCard";

function ProductsFind({ onAmountChange, onUomChange }) {
  const { t } = useTranslation();
  const filteredProducts = useProductStore((state) => state.filteredProducts);

  return (
    <div className="products">
      <p>
        {t("productSearcher.findFirstPart")} {filteredProducts.length}
        {t("productSearcher.findSecondPart")}
      </p>
      <div className="favorite-items">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            onAmountChange={onAmountChange}
            onUomChange={onUomChange}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default ProductsFind;
