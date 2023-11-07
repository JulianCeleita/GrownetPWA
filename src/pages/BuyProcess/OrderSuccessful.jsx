import { pdf } from "@react-pdf/renderer";
import * as FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MenuPrimary from "../../components/Menu/MenuPrimary";
import "../../css/orderDetail.css";
import img_succesful from "../../img/img_succesful.png";
import useOrderStore from "../../store/useOrderStore";
import { PdfDocument } from "./OrderInformation";
import { set } from "date-fns";

export default function OrderSuccessful() {
  const { t } = useTranslation();
  const [articlesData, setArticlesData] = useState([]);
  const {
    selectedRestaurant,
    selectedSupplier,
    articlesToPay,
    orderNumber,
    totalNet,
    totalTaxes,
    totalToPay,
    specialRequirements,
    setSpecialRequirements,
    deliveryData,
  } = useOrderStore();
  const currentDate = new Date();
  const dayName = currentDate.toLocaleString("en-us", { weekday: "short" });
  const dayNumber = currentDate.getDate();
  const monthName = currentDate.toLocaleString("en-us", { month: "long" });
  const yearNumber = currentDate.getFullYear();
  const formattedDate = `${dayName}, ${dayNumber} ${monthName}, ${yearNumber}`;
  //TODO PONER FECHA DE ENTREGA QUE SE SELECCIONÓ EN EL CALENDARIO

  useEffect(() => {
    const filteredArticles = articlesToPay.filter(
      (article) => article.amount > 0
    );
    setArticlesData(filteredArticles);
  }, []);

  const generatePdfDocument = async (fileName) => {
    try {
      const blob = await pdf(
        <PdfDocument
          selectedRestaurant={selectedRestaurant}
          selectedSupplier={selectedSupplier}
          specialRequirements={specialRequirements}
          deliveryData={deliveryData}
          orderNumber={orderNumber}
          data={articlesData}
          totalNet={totalNet}
          totalTaxes={totalTaxes}
          totalToPay={totalToPay}
        />
      ).toBlob();
      FileSaver.saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  return (
    <section className="order-succesful">
      <img src={img_succesful} alt="Succesfull" />
      <h1>{t("orderSuccessful.title")}</h1>
      <p>{t("orderSuccessful.message")}</p>
      <div className="buttons-succesful">
        <Link className="bttn btn-primary" to="/record">
          {t("orderSuccessful.ordersButton")}
        </Link>
        <button
          className="bttn btn-outline"
          onClick={() => generatePdfDocument("GrownetInvoice.pdf")}
        >
          {t("orderSuccessful.pdfButton")}
        </button>
      </div>

      <MenuPrimary />
    </section>
  );
}
