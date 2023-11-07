import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useOrderStore from "../../store/useOrderStore";
import DeleteProduct from "../DeleteProduct";
import Stepper from "../Stepper/Stepper";

export default function ProductDetail({
  updateTotalToPay,
  updateTotalTaxes,
  updateTotalNet,
}) {
  const counter = 1;
  const { articlesToPay, setArticlesToPay } = useOrderStore();
  // ACTUALIZAR CANTIDAD DE ARTICULOS
  const [articles, setArticles] = useState(articlesToPay);
  useEffect(() => {
    setArticles(articlesToPay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles]);

  const handleAmountChange = (productId, newAmount) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId ? { ...article, amount: newAmount } : article
      )
    );
    const updatedArticlesToPay = articles.map((article) =>
      article.id === productId
        ? {
            ...article,
            amount: newAmount,
          }
        : article
    );
    setArticlesToPay(updatedArticlesToPay);

    const newTotalToPay = calculateTotalToPay(updatedArticlesToPay);
    updateTotalToPay(newTotalToPay);
  };

  // ACTUALIZAR UOMTOPAY DE ARTICULOS
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

  const handleTrashClick = (productId) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId
          ? { ...article, amount: 0, totalItemToPay: 0 }
          : article
      )
    );

    const updatedArticlesToPay = articlesToPay.map((article) =>
      article.id === productId
        ? { ...article, amount: 0, totalItemToPay: 0 }
        : article
    );
    setArticlesToPay(updatedArticlesToPay);

    const newTotalToPay = calculateTotalToPay(updatedArticlesToPay);
    updateTotalToPay(newTotalToPay);
  };

  // CALCULAR EL NETO
  const calculateItemNet = (prices, amount, uomToPay) => {
    const selectedPrice = prices.find((price) => price.nameUoms === uomToPay);
    const net = selectedPrice.price * amount;
    return parseFloat(net.toFixed(2));
  };

  const calculateTotalNet = (articles) => {
    const totalNet = articles.reduce((total, article) => {
      const itemNet = calculateItemNet(
        article.prices,
        article.amount,
        article.uomToPay
      );
      return total + itemNet;
    }, 0);
    return parseFloat(totalNet.toFixed(2));
  };

  // CALCULAR TAXES 
  const calculateItemTaxes = (prices, tax, amount, uomToPay) => {
    const selectedPrice = prices.find((price) => price.nameUoms === uomToPay);
    if (!selectedPrice || isNaN(tax) || isNaN(amount)) {
      return 0;
    }
    const taxes = selectedPrice.price * tax * amount;
    const parsedTaxes = parseFloat(taxes.toFixed(2));
  return isNaN(parsedTaxes) ? 0 : parsedTaxes;
  };

  const calculateTotalTaxes = (articles) => {
    const totalTaxes = articles.reduce((total, article) => {
      const itemTaxes = calculateItemTaxes(
        article.prices,
        article.tax,
        article.amount,
        article.uomToPay
      );
      return total + itemTaxes;
    }, 0);
    return parseFloat(totalTaxes.toFixed(2));
  };

  // CALCULAR TOTAL A PAGAR
  const calculateItemToPay = (article, amount) => {
    const selectedPrice = article.prices.find(
      (price) => price.nameUoms === article.uomToPay
    );
    const total = selectedPrice.priceWithTax * amount;
    const totalItemToPay = parseFloat(total.toFixed(2));

    const selectedPriceWithTax = selectedPrice.priceWithTax;

    if ("totalItemToPay" in article) {
      article.totalItemToPay = totalItemToPay;
    } else {
      Object.assign(article, { totalItemToPay });
    }

    if ("selectedPriceWithTax" in article) {
      article.selectedPriceWithTax = selectedPriceWithTax;
    } else {
      Object.assign(article, { selectedPriceWithTax });
    }
    
    return totalItemToPay;
  };

  const calculateTotalToPay = (articles) => {
    const filteredArticles = articles.filter((article) => article.amount > 0);
    const totalToPay = filteredArticles.reduce((total, article) => {
      return total + article.totalItemToPay;
    }, 0);
    return parseFloat(totalToPay.toFixed(2));
  };

  useEffect(() => {
    const newTotalTaxes = calculateTotalTaxes(articles);
    updateTotalTaxes(newTotalTaxes);

    const newTotalToPay = calculateTotalToPay(articles);
    updateTotalToPay(newTotalToPay);

    const newTotalNet = calculateTotalNet(articles);
    updateTotalNet(newTotalNet);
  }, [articles]);

  return (
    <>
      {articles
        .filter((article) => article.amount > 0)
        .map((article) => (
          <div key={article.id}>
            <div className="product-detail">
              <h3>{article.name}</h3>
              <div className="product-detail">
                <h3>£{calculateItemToPay(article, article.amount)}</h3>
                <DeleteProduct
                  articles={articles}
                  setArticles={setArticles}
                  article={article}
                  articlesToPay={articlesToPay}
                  setArticlesToPay={setArticlesToPay}
                  calculateTotalToPay={calculateTotalToPay}
                  updateTotalToPay={updateTotalToPay}
                />
              </div>
            </div>
            <div className="product-detail">
              <Stepper
                productData={article}
                onAmountChange={handleAmountChange} counter={counter}
              />
              <Form.Select
                aria-label="Select UomToPay"
                value={article.uomToPay}
                onChange={(event) =>
                  handleUomChange(article.id, event.target.value)
                }
              >
                {article.prices.map((price) => (
                  <option key={price.nameUoms} value={price.nameUoms}>
                    {price.nameUoms}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        ))}
    </>
  );
}
