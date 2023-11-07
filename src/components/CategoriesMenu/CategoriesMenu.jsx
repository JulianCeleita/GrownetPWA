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
  const [categories, setCategories] = useState();

  const urlImg =
    "https://ec2-13-58-203-20.us-east-2.compute.amazonaws.com/grownet/";

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

          {categoriesProduct.map((category) => (
            <button
              type="button"
              className={`card-products ${
                selectedCategory === category && !showFavorites
                  ? "activeCategory"
                  : "inactiveCategory"
              }`}
              key={category}
              onClick={() => filterCategory(category)}
            >
              <h6>{category}</h6>
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
