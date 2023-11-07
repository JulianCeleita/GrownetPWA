import closeOutline from "@iconify/icons-eva/close-outline";
import searchIcon from "@iconify/icons-heroicons-outline/search";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
//TODO ORGANIZAR LOS ICONS PARA EL SEARCHER
import { useTranslation } from "react-i18next";
import useProductStore from "../../store/useProductStore";
import "./productSearcher.css";

function ProductSearcher({ products, setShowSearchResults, resetInput }) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const setFilteredProducts = useProductStore(
    (state) => state.setFilteredProducts
  );
  const [searchButtonIcon, setSearchButtonIcon] = useState(searchIcon);

  useEffect(() => {
    handleReset();
  }, [resetInput]);

  useEffect(() => {
    if (input !== "") {
      filterProducts(input);
    }
  }, [products]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInput(query);

    if (query === "") {
      setShowSearchResults(false);
      setFilteredProducts([]);
      setSearchButtonIcon(searchIcon);
    } else {
      filterProducts(query);
    }
  };

  const handleReset = () => {
    setShowSearchResults(false);
    setInput("");
    setFilteredProducts([]);
    setSearchButtonIcon(searchIcon);
  };

  const filterProducts = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setShowSearchResults(true);
    setFilteredProducts(filtered);
    setSearchButtonIcon(closeOutline);
  };

  return (
    <form className="search-form">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={t("productSearcher.placeholder")}
        className="search-input"
      />
      <button type="button" onClick={handleReset} className="search-button">
        <Icon icon={searchButtonIcon} />
      </button>
    </form>
  );
}

export default ProductSearcher;
