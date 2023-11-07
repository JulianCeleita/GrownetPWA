import React from "react";
import { useTranslation } from "react-i18next";
import useOrderStore from "../store/useOrderStore";
import ProductCard from "./ProductDetail/ProductCard";

export default function Favorites({
  onAmountChange,
  onUomChange,
  fetchFavorites,
}) {
  const { t } = useTranslation();

  const { articlesToPay } = useOrderStore();
  const favoriteArticlesToPay = articlesToPay.filter(
    (article) => article.active === 1
  );

  return (
    <div className="products">
      <p>
        {t("favorites.findFirstPart")} {favoriteArticlesToPay.length}{" "}
        {t("favorites.findSecondPart")}{" "}
      </p>
      <div className="favorite-items">
        {favoriteArticlesToPay.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            onAmountChange={onAmountChange}
            onUomChange={onUomChange}
            fetchFavorites={fetchFavorites}
            opacity
          />
        ))}
      </div>
    </div>
  );
}
