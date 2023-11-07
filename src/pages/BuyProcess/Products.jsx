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
import { supplierCategorie, supplierProducts } from "../../config/urls.config";
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
  const { articlesToPay, selectedSupplier, selectedRestaurant, categories } =
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
      useOrderStore.setState({ categories: productsWithTax });
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

  const fetchProductsByCategory = async (categoryId) => {
    if (categoryId === "All") {
      await fetchProducts(currentPage);

      return;
    }
    const requestBody = {
      supplier: selectedSupplier.id,
      categorie: categoryId,
      country: countryCode,
      accountNumber: selectedRestaurant.accountNumber,
    };

    try {
      const response = await axios.post(supplierCategorie, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const categorizedProducts = response.data.products;

      const productsWithTax = categorizedProducts
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
      console.error("Error al obtener los productos por categoría:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const hasMoreProductsToLoad = () => {
        return articlesToPay.length > products.length;
      };

      if (articlesToPay.length > 0) {
        setArticles((prevArticles) => {
          const productIds = new Set(prevArticles.map((p) => p.id));
          const newArticles = articlesToPay.filter(
            (p) => !productIds.has(p.id)
          );
          return [...prevArticles, ...newArticles];
        });

        setProducts((prevProducts) => {
          const productIds = new Set(prevProducts.map((p) => p.id));
          const newProducts = articlesToPay.filter(
            (p) => !productIds.has(p.id)
          );
          return [...prevProducts, ...newProducts];
        });

        if (hasMoreProductsToLoad()) {
          await fetchProducts(currentPage + 1);
        }
      } else {
        await fetchProducts(currentPage);
      }
    };

    fetchData();
    const hasMore = articlesToPay.length > products.length;
    if (!hasMore) {
      const loaderElement = loader.current;
      if (loaderElement) {
        loaderElement.style.display = "none";
      }
    }
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
  const allCategories = [
    "All",
    ...new Set(categories.map((article) => article.nameCategorie)),
  ];
  const productsCategory = allCategories;

  const filterCategories = async (category, categoryId) => {
    setSelectedCategory(category);

    setShowFavorites(false);
    resetInputSearcher();
    try {
      await fetchProductsByCategory(categoryId);
    } catch (error) {
      console.error("Error al obtener productos al mostrar categoría:", error);
    }
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
