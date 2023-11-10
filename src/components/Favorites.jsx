import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useOrderStore from "../store/useOrderStore";
import ProductCard from "./ProductDetail/ProductCard";
import { favoritesBySupplier } from "../config/urls.config";
import axios from "axios";
import useTokenStore from "../store/useTokenStore";

export default function Favorites({ onAmountChange, onUomChange }) {
  const { t } = useTranslation();
  const { selectedSupplier } = useOrderStore();
  const [favorites, setFavorites] = useState([]);
  const { token } = useTokenStore();

  useEffect(() => {
    const fetchFavorites = async () => {
      const requestBody = {
        supplier_id: selectedSupplier.id,
      };

      try {
        const response = await axios.post(favoritesBySupplier, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const defaultFavorites = response.data.favorites;

        const productsWithTax = defaultFavorites
          .filter((product) => product.prices.some((price) => price.nameUoms))
          .map((product) => {
            const pricesWithTax = product.prices.map((price) => {
              const priceWithTaxCalculation = (
                price.price +
                price.price * product.tax
              ).toFixed(2);

              return {
                ...price,
                priceWithTax:
                  isNaN(priceWithTaxCalculation) ||
                  parseFloat(priceWithTaxCalculation) === 0
                    ? null
                    : priceWithTaxCalculation,
              };
            });

            return {
              ...product,
              amount: 0,
              uomToPay: product.prices[0].nameUoms,
              idUomToPay: product.prices[0].id,
              prices: pricesWithTax,
            };
          })

          .filter((product) => {
            const isValidProduct = product.prices.some(
              (price) =>
                price.priceWithTax && parseFloat(price.priceWithTax) > 0
            );

            return isValidProduct;
          });

        useOrderStore.setState({ articlesToPay: productsWithTax });

        setFavorites(productsWithTax);
      } catch (error) {
        console.error("Error al obtener los productos del proveedor:", error);
      }
    };

    fetchFavorites();
  }, [selectedSupplier, token]);

  const filteredFavorites = favorites.filter(
    (product, index, self) =>
      self.findIndex((p) => p.id === product.id) === index
  );

  return (
    <div className="products">
      <p>
        {t("favorites.findFirstPart")} {filteredFavorites.length}{" "}
        {t("favorites.findSecondPart")}{" "}
      </p>
      <div className="favorite-items">
        {filteredFavorites.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            onAmountChange={onAmountChange}
            onUomChange={onUomChange}
            opacity
          />
        ))}
      </div>
    </div>
  );
}
