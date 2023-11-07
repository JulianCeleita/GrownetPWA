import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { allCategories } from "../../config/urls.config";
import useTokenStore from "../../store/useTokenStore";
import "./categoriesMenu.css";

export default function CategoriesMenu({
  showFavorites,
  toggleShowFavorites,
  categoriesProduct,
  filterCategory,
  selectedCategory,
}) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  const getProductInfoFromCategories = (categories, categoriesProduct) => {
    const productsInfo = [];
    categoriesProduct.forEach((productName) => {
      const foundCategory = categories.find(
        (category) => category.name === productName
      );
      if (foundCategory) {
        productsInfo.push({ name: foundCategory.name, id: foundCategory.id });
      }
    });
    return productsInfo;
  };

  const productIds = getProductInfoFromCategories(
    categories,
    categoriesProduct
  );

  const { token } = useTokenStore();
  useEffect(() => {
    axios
      .get(allCategories, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la API:", error);
      });
  }, []);

  return (
    <section className="menu-categories me-auto">
      <div className="contenido">
        <div className="carousel-categ">
          <button
            className={`card-products ${
              showFavorites ? "activeCategory" : "inactiveCategory"
            }`}
            onClick={toggleShowFavorites}
          >
            <h6>
              {showFavorites
                ? t("categoriesMenu.goBack")
                : t("categoriesMenu.favorites")}
            </h6>
          </button>
          <button
            type="button"
            className={`card-products ${
              selectedCategory === "All" && !showFavorites
                ? "activeCategory"
                : "inactiveCategory"
            }`}
            onClick={() => filterCategory("All", "All")}
          >
            <h6>All</h6>
          </button>
          {productIds.map((categoryApi) => (
            <button
              type="button"
              className={`card-products ${
                selectedCategory === categoryApi.name && !showFavorites
                  ? "activeCategory"
                  : "inactiveCategory"
              }`}
              key={categoryApi.id}
              onClick={() => filterCategory(categoryApi.name, categoryApi.id)}
            >
              <h6>{categoryApi.name}</h6>
            </button>
          ))}
        </div>
      </div>
      <Link className="bttn btn-primary" to="/suppliers/details">
        {t("categoriesMenu.continue")}
      </Link>
    </section>
  );
}
