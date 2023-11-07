import { Icon } from "@iconify/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import "../../css/orderDetail.css";
import useOrderStore from "../../store/useOrderStore";

export default function OrderDetails(props) {
  const { t } = useTranslation();
  const articlesToPayStore = useOrderStore();
  const totalNet = articlesToPayStore.totalNet;
  const totalTaxes = articlesToPayStore.totalTaxes;
  const totalToPay = articlesToPayStore.totalToPay;

  const updateTotalNet = (newNet) => {
    articlesToPayStore.setTotalNet(newNet);
  };

  const updateTotalTaxes = (newTaxes) => {
    articlesToPayStore.setTotalTaxes(newTaxes);
  };

  const updateTotalToPay = (newTotal) => {
    articlesToPayStore.setTotalToPay(newTotal);
  };

  return (
    <section className="details">
      <div className="tittle-page">
      <Link to="/suppliers/products"> <Icon src="google.com" icon="ic:round-arrow-back" id="arrow-icon" /></Link>
      <h1>{t("orderDetails.orderDetail")}</h1>
      </div>
      <div className="card-invoices">
        <ProductDetail
          updateTotalToPay={updateTotalToPay}
          updateTotalTaxes={updateTotalTaxes}
          updateTotalNet={updateTotalNet}
        />
        <div>
          <h2 id="tax-font">{t("orderDetails.paymentDetails")}</h2>
          <div className="product-detail">
            <h3>{t("orderDetails.net")}</h3>
            <h3>£{totalNet.toFixed(2)}</h3>
          </div>
          <div className="product-detail">
            <h3>{t("orderDetails.tax")}</h3>
            <h3>£{totalTaxes.toFixed(2)}</h3>
          </div>
        </div>
        <div className="total-detail">
          <h2>{t("orderDetails.currentTotal")}</h2>
          <h2>£{totalToPay.toFixed(2)}</h2>
        </div>
      </div>
      <Link 
        className={`bttn btn-primary ${ totalToPay === 0 ? 'disabled' : ''}`} 
        to={totalToPay===0 ? '#' : '/suppliers/orderInformation'}>
        {t("orderDetails.continue")}
      </Link>
    </section>
  );
}
