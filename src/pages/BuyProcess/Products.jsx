import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CategoriesMenu from "../../components/CategoriesMenu/CategoriesMenu";
import Favorites from "../../components/Favorites";
import ProductCard from "../../components/ProductDetail/ProductCard";
import ProductSearcher from "../../components/ProductSearcher/ProductSearcher";
import ProductsFind from "../../components/ProductSearcher/ProductsFind";
import { supplierProducts } from "../../config/urls.config";
import "../../css/products.css";
import useOrderStore from "../../store/useOrderStore";
import useTokenStore from "../../store/useTokenStore";

export default function Products(props) {
  const { t } = useTranslation();
  const { token, countryCode } = useTokenStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState(products);
  const { articlesToPay, selectedSupplier, selectedRestaurant } =
    useOrderStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [resetInput, setResetInput] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const loader = useRef(null);

  const fetchProducts = async (page = 0) => {
    const requestBody = {
      id: selectedSupplier.id,
      country: countryCode,
      accountNumber: selectedRestaurant.accountNumber,
      page,
    };

    try {
      const response = await axios.post(`${supplierProducts}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const defaultProducts = response.data.products;

      const productsWithTax = defaultProducts
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
        .filter((product) =>
          product.prices.some(
            (price) => price.priceWithTax && parseFloat(price.priceWithTax) > 0
          )
        );
      useOrderStore.setState({ articlesToPay: productsWithTax });
      setArticles((prevProducts) => {
        const productIds = new Set(prevProducts.map((p) => p.id));
        const newProducts = productsWithTax.filter(
          (p) => !productIds.has(p.id)
        );
        return [...prevProducts, ...newProducts];
      });
      setProducts((prevProducts) => {
        const productIds = new Set(prevProducts.map((p) => p.id));
        const newProducts = productsWithTax.filter(
          (p) => !productIds.has(p.id)
        );
        return [...prevProducts, ...newProducts];
      });
    } catch (error) {
      console.error("Error al obtener los productos del proveedor:", error);
    }
  };
  console.log("ARTICLES", articles);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts(currentPage);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const resetInputSearcher = () => {
    setResetInput((prevKey) => prevKey + 1);
  };

  const toggleShowFavorites = async () => {
    setShowFavorites(!showFavorites);
    setSelectedCategory("All");
    resetInputSearcher();

    try {
      await fetchProducts();
    } catch (error) {
      console.error("Error al obtener productos al mostrar favoritos:", error);
    }
  };
  // CAMBIO DE CANTIDAD DE ARTICULOS
  const handleAmountChange = (productId, newAmount) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId ? { ...article, amount: newAmount } : article
      )
    );
    const updatedArticlesToPay = articles.map((article) =>
      article.id === productId ? { ...article, amount: newAmount } : article
    );
    useOrderStore.setState({ articlesToPay: updatedArticlesToPay });
  };

  // CAMBIO DE UOMN DE ARTICULOS (UNIT, BOX, KG)
  const handleUomChange = (productId, newUomToPay) => {
    const updatedArticlesToPay = articles.map((article) => {
      if (article.id === productId) {
        const selectedPrice = article.prices.find(
          (price) => price.nameUoms === newUomToPay
        );
        return {
          ...article,
          uomToPay: newUomToPay,
          idUomToPay: selectedPrice.id,
          priceWithTax: selectedPrice.priceWithTax,
        };
      }
      return article;
    });
    setArticles(updatedArticlesToPay);
    useOrderStore.setState({ articlesToPay: updatedArticlesToPay });
  };

  // FILTRO
  const productsCategory =
    selectedCategory === "All"
      ? ["All", ...new Set(articles.map((article) => article.nameCategorie))]
      : ["All", selectedCategory];

  const filterCategories = (category) => {
    setSelectedCategory(category);
    setShowFavorites(false);
    resetInputSearcher();
  };
  //Filtro
  const [showProductSearch, setShowProductSearch] = useState(false);

  const toggleProductSearch = () => {
    setShowProductSearch(!showProductSearch);
  };
  // PAGINATION

  useEffect(() => {
    const currentLoader = loader.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="products">
      <div className="tittle-page">
        <Link to="/suppliers">
          <Icon src="google.com" icon="ic:round-arrow-back" id="arrow-icon" />
        </Link>
        <h1 id="tittleProducts">{t("products.title")}</h1>
        <a onClick={toggleProductSearch} id="search-magnifying">
          <Icon icon="ion:search-circle-outline" className="icon-search" />
        </a>
      </div>
      {showProductSearch && (
        <ProductSearcher
          products={articlesToPay}
          setShowSearchResults={setShowSearchResults}
          resetInput={resetInput}
        />
      )}
      {showSearchResults ? (
        <ProductsFind
          onAmountChange={handleAmountChange}
          onUomChange={handleUomChange}
        />
      ) : (
        <>
          {showFavorites ? (
            <Favorites
              onAmountChange={handleAmountChange}
              onUomChange={handleUomChange}
              fetchFavorites={fetchProducts}
              opacity
            />
          ) : (
            <>
              {articles
                .filter((article) => {
                  if (selectedCategory === "All") {
                    return true;
                  }
                  return article.nameCategorie === selectedCategory;
                })
                .map((article) => (
                  <section key={article.id}>
                    <ProductCard
                      key={article.id}
                      productData={article}
                      onAmountChange={handleAmountChange}
                      onUomChange={handleUomChange}
                      fetchFavorites={fetchProducts}
                    ></ProductCard>
                  </section>
                ))}
            </>
          )}
        </>
      )}
      <div ref={loader} className="loader-container">
        <div className="loader"></div>
      </div>
      <div className="space-CatgMenu"></div>
      {
        <CategoriesMenu
          showFavorites={showFavorites}
          toggleShowFavorites={toggleShowFavorites}
          categoriesProduct={productsCategory}
          filterCategory={filterCategories}
          selectedCategory={selectedCategory}
        />
      }
    </section>
  );
}
