import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { allCategories } from "../../config/urls.config";
import useTokenStore from "../../store/useTokenStore";
import "./categoriesMenu.css";
import useOrderStore from "../../store/useOrderStore";

export default function CategoriesMenu({
  showFavorites,
  toggleShowFavorites,
  filterCategory,
  selectedCategory,
}) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  const { selectedSupplier } = useOrderStore();

  const { token } = useTokenStore();
  // Asumiendo que 'idsupplier' es una variable con el ID que deseas pasar

  useEffect(() => {
    axios
      .get(`${allCategories}${selectedSupplier.id}`, {
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
  }, [selectedSupplier, token]);

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

          {categories.map((categoryApi) => (
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
