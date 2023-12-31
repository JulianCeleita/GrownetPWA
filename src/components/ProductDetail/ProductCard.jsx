import { Icon } from "@iconify/react";
import React, { useCallback } from "react";
import Form from "react-bootstrap/Form";
import "../../css/products.css";
import Stepper from "../Stepper/Stepper";
import useOrderStore from "../../store/useOrderStore";
import useTokenStore from "../../store/useTokenStore";
import axios from "axios";
import { useState } from "react";
import { addFavorite } from "../../config/urls.config";

export default function ProductCard({
  productData,
  onAmountChange,
  onUomChange,
  opacity,
  fetchFavorites = async () => {},
  fetchProducts,
  currentPage,
}) {
  const counter = 0;
  const { id, name, image, prices, uomToPay, active } = productData;
  const { selectedSupplier, selectedRestaurant } = useOrderStore();

  const [productState, setProductState] = useState({
    isFavorite: active === 1,
    isFavoritePending: false,
    isBeingUpdated: false,
  });

  const { token } = useTokenStore();
  const urlImg = "https://api.grownetapp.com/grownet/";
  const selectedUom = prices.find((price) => price.nameUoms === uomToPay);

  const handleToggleFavorite = useCallback(async () => {
    if (productState.isFavoritePending) return;

    try {
      setProductState((prevState) => ({
        ...prevState,
        isFavoritePending: true,
      }));

      const newFavoriteState = !productState.isFavorite;

      setProductState((prevState) => ({
        ...prevState,
        isFavorite: newFavoriteState,
        isBeingUpdated: !newFavoriteState,
      }));

      const requestData = {
        customer_id: selectedRestaurant.accountNumber,
        product_id: productData.id,
        supplier_id: selectedSupplier.id,
        active: newFavoriteState ? 1 : 0,
      };
      const response = await axios.post(addFavorite, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProductState((prevState) => ({
        ...prevState,
        isFavoritePending: false,
      }));
    } catch (error) {
      setProductState((prevState) => ({
        ...prevState,
        isFavorite: !prevState.isFavorite,
        isFavoritePending: false,
        isBeingUpdated: false,
      }));

      console.error("Error al gestionar el favorito:", error);
    }
    if (opacity) {
      await fetchFavorites();
    } else {
      await fetchProducts(currentPage);
    }
  }, [
    productData,
    productState.isFavorite,
    productState.isFavoritePending,
    selectedRestaurant.accountNumber,
    selectedSupplier.id,
    token,
    fetchFavorites,
    fetchProducts,
    currentPage,
  ]);

  const handleUomToPayChange = (event) => {
    const newUomToPay = event.target.value;
    onUomChange(id, newUomToPay);
  };

  return (
    <section className="products">
      <div
        className="elements"
        style={opacity && productState.isBeingUpdated ? { opacity: 0.5 } : null}
      >
        <img src={urlImg + image} alt={"image " + name} />
        <div>
          <div className="titlle-products">
            <div>
              <h1>
                {name} {selectedUom.name}
              </h1>
            </div>

            <div className="pr">
              <Icon
                className="fav-icon"
                icon={productState.isFavorite ? "ph:heart-fill" : "ph:heart"}
                onClick={handleToggleFavorite}
                color="#62C471"
                size={35}
                underlaycolor="transparent"
              ></Icon>
            </div>
          </div>
          <p>£{selectedUom.priceWithTax}</p>
          <div className="product-amount">
            <Stepper
              productData={productData}
              onAmountChange={onAmountChange}
              counter={counter}
            />
            <Form.Select
              aria-label="Select UomToPay"
              value={uomToPay}
              onChange={handleUomToPayChange}
            >
              {prices.map((price) => (
                <option key={price.id} value={price.nameUoms}>
                  {price.nameUoms}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
      </div>
      {/* TODO INTEGRAR LUEGO LAS PROMO, POR AHORA NO SE USA */}
      {/* <div className="promo">
        <h4>Promo price</h4>
        <h5>£20.9 Bag</h5>
        <Form.Check aria-label="option 1" />
      </div> */}
    </section>
  );
}
