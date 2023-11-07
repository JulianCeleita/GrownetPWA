import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CardSuppliers from "../../components/CardSuppliers.jsx";
import MenuPrimary from "../../components/Menu/MenuPrimary";
import { availableSuppliers } from "../../config/urls.config";
import "../../css/suppliers.css";
import useOrderStore from "../../store/useOrderStore.jsx";
import useTokenStore from "../../store/useTokenStore.jsx";

export default function Suppliers() {
  const { t } = useTranslation();
  const { token } = useTokenStore();
  const { setSuppliers, selectedRestaurant } = useOrderStore();

  useEffect(() => {
    const requestBody = {
      accountNumber: selectedRestaurant.accountNumber,
    };
    axios
      .post(`${availableSuppliers}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuppliers(response.data.supplier);
      })
      .catch((error) => {
        console.error("Error al obtener los proveedores:", error);
      });
  }, []);

  return (
    <section className="suppliers">
      <div className="tittle-suppliers">
        <Link to="/restaurants">
          <Icon src="google.com" icon="ic:round-arrow-back" className="arrow" />
        </Link>
        <h1 className="tittle-restaurants"> {t("suppliers.title")} </h1>
      </div>
      <CardSuppliers></CardSuppliers>
      <Link className="bttn btn-primary" id="my-intercom">
        <Icon className="icon-plus" icon="simple-line-icons:plus" />
        {t("suppliers.addSuppliers")}
      </Link>
      <div className="space-menu"></div>
      <MenuPrimary />
    </section>
  );
}
