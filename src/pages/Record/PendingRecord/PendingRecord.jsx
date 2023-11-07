import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MenuPrimary from "../../../components/Menu/MenuPrimary";
import { selectedStorageOrder } from "../../../config/urls.config";
import "../../../css/pendingRecord.css";
import useRecordStore from "../../../store/useRecordStore";
import useTokenStore from "../../../store/useTokenStore";
import { closeSelectedOrder } from "../../../config/urls.config";
import Modal from "react-bootstrap/Modal";

export default function PendingRecord() {
  const { t } = useTranslation();
  const { token } = useTokenStore();
  const [show, setShow] = useState(false);
  const { selectedPendingOrder, detailsToShow, setDetailsToShow } =
    useRecordStore();

  useEffect(() => {
    axios
      .get(`${selectedStorageOrder}/${selectedPendingOrder}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDetailsToShow(response.data.order);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // CERRAR LA ORDEN SELECCIONADA
  const onCloseOrder = (e) => {
    setShow(true);
    e.preventDefault();
    const bodyCloseOrder = {
      reference: selectedPendingOrder,
      state: 5,
    };
    axios
      .post(closeSelectedOrder, bodyCloseOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error al cerrar la orden", error);
      });
  };

  return (
    <>
      {detailsToShow && (
        <section className="pending-record">
          <div className="tittle-page">
            <Link to="/record">
              {" "}
              <Icon
                src="google.com"
                icon="ic:round-arrow-back"
                id="arrow-icon"
              />
            </Link>
            <h1>{t("pendingRecord.title")}</h1>
          </div>
          <Tabs
            defaultActiveKey="reception"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            {/* DETALLES DE PRODUCTS DENTRO DE PEDIDOS ACTUALES */}

            <Tab eventKey="home" title={t("pendingRecord.tabProducts")}>
              <div className="card-invoices">
                <h2 id="tax-tittle">{t("pendingRecord.supplierDetail")}</h2>
                <div className="product-detail">
                  <h3>{detailsToShow.nameSuppliers}</h3>
                  <h3>#{detailsToShow.reference}</h3>
                </div>
                <p>{detailsToShow.created_date}</p>
                <h2 id="tax-tittle">{t("pendingRecord.detailsItem")}</h2>
                {detailsToShow.products?.map((product) => (
                  <div key={product.id}>
                    <div className="product-detail">
                      <h3 id="name-pendingRecord">{product.name}</h3>
                      <h3>£{product.price}</h3>
                    </div>
                    <p>
                      {product.quantity} {product.uom}
                    </p>
                  </div>
                ))}
                <h2 id="tax-tittle">{t("pendingRecord.paymentDetails")}</h2>
                <div className="product-detail">
                  <h3>{t("pendingRecord.tax")}</h3>
                  <h3>£{detailsToShow.total_tax}</h3>
                </div>
                <div className="total-detail">
                  <h2>{t("pendingRecord.currentValue")}</h2>
                  <h2>£{detailsToShow.total} </h2>
                </div>
              </div>
            </Tab>

            {/* RECEPCION DE PRODUCTOS POSIBILIDAD ABRIR DISPUTA */}

            <Tab eventKey="reception" title={t("pendingRecord.tabReception")}>
              <div className="pending-record">
                <form className="card-pending-record">
                  <h1>{t("pendingRecord.check")}</h1>
                  {detailsToShow.products?.map((product) => (
                    <div className="product-check" key={product.id}>
                      <div className="product-detail" id="check-products">
                        <div>
                          <h3>{product.name}</h3>
                          <p>
                            {product.quantity} {product.uom}
                          </p>
                        </div>
                        <div className="calification-reception">
                          <Form.Check id="flexCheck" />
                          <Link
                            to={`/record/reception/${product.id}/${product.name}/${product.quantity}/${product.uom}`}
                            className="warning-record"
                          >
                            {t("pendingRecord.openDispute")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    className="bttn btn-primary"
                    onClick={(e) => onCloseOrder(e)}
                  >
                    {t("pendingRecord.confirmOrder")}
                  </button>
                </form>
              </div>
            </Tab>
          </Tabs>

          <Modal show={show} className="modal-dispute">
            <section className="alerta">
              <Icon
                icon="fluent-emoji:party-popper"
                className="icon-reception"
              />
              <h1>
                {t("pendingRecord.modalTittle")}{" "}
                <span className="grownet-pending">Grownet</span>
              </h1>
              <p>{t("pendingRecord.modalText")}</p>
              <Link to="/record" className="bttn btn-primary">
                {t("pendingRecord.modalButton")}
              </Link>
            </section>
          </Modal>
          <div className="menu-space"></div>
        </section>
      )}

      <MenuPrimary />
    </>
  );
}
