import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MenuPrimary from "../../../components/Menu/MenuPrimary";
import {
  closeSelectedOrder,
  createDisputeOrder,
  selectedStorageOrder,
} from "../../../config/urls.config";
import "../../../css/pendingRecord.css";
import "../../../css/reception.css";
import useRecordStore from "../../../store/useRecordStore";
import useTokenStore from "../../../store/useTokenStore";

export default function PendingRecord() {
  const { t } = useTranslation();
  const { token } = useTokenStore();
  const [show, setShow] = useState(false);
  const [evidences, setEvidences] = useState([]);
  const [buttonEvidence, setButtonEvidence] = useState("upload");
  const [showEvidencesModal, setShowEvidencesModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showWarningModal, setShowWarningModal] = useState(false);
  const { selectedPendingOrder, detailsToShow, setDetailsToShow } =
    useRecordStore();

  console.log(detailsToShow.id_stateOrders, "hola");

  useEffect(() => {
    if (evidences.length === 0) {
      setButtonEvidence("upload");
    }
  }, [evidences]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilesChange = (e) => {
    if (e.target.files.length > 4) {
      alert("No puedes subir más de 4 imágenes.");
      return;
    }
    const fileArray = Array.from(e.target.files);
    setEvidences(fileArray);
    setButtonEvidence("submit");
  };

  // ENVIAR EVIDENCIAS
  const onSendEvidences = () => {
    const formData = new FormData();

    const disputeBody = {
      order: selectedPendingOrder,
      product_id: detailsToShow.evidences_id,
    };
    for (let key in disputeBody) {
      if (disputeBody.hasOwnProperty(key)) {
        formData.append(key, disputeBody[key]);
      }
    }
    evidences.forEach((file) => {
      formData.append("evidences[]", file);
    });

    axios
      .post(createDisputeOrder, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setShowEvidencesModal(true);
        setEvidences([]);
        setButtonEvidence("upload");
      })
      .catch((error) => {
        console.error("Error al crear la disputa:", error);
      });
  };

  // CHECK DE PRODUCTOS
  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: !prevSelectedProducts[productId],
    }));
  };

  // CERRAR LA ORDEN SELECCIONADA
  const handleClose = () => setShowWarningModal(false);

  const onConfirmOrder = (e) => {
    e.preventDefault();
    if (detailsToShow.id_stateOrders === 6) {
      setShowWarningModal(true);
    } else {
      onCloseOrder(e);
    }
  };

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
                    <div
                      className={`product-check ${
                        selectedProducts[product.id] ? "selected" : ""
                      }`}
                      key={product.id}
                      onClick={() => toggleProductSelection(product.id)}
                    >
                      <div className="product-detail" id="check-products">
                        <div>
                          <h3>{product.name}</h3>
                          <Link
                            to={`/record/reception/${product.id}/${product.name}/${product.quantity}/${product.uom}`}
                            className="warning-record"
                          >
                            {t("pendingRecord.openDispute")}
                          </Link>
                        </div>
                        <div className="calification-reception">
                          <p>
                            {product.quantity} {product.uom}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* ADJUNTAR EVIDENCIAS */}

                  <div className="uploaded-images">
                    {evidences.map((file, index) => (
                      <div key={index} className="image-preview">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="uploaded-preview"
                          width="30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newEvidences = [...evidences];
                            newEvidences.splice(index, 1);
                            setEvidences(newEvidences);
                          }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  {buttonEvidence === "upload" && (
                    <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={handleFilesChange}
                        multiple
                        required
                      />
                      <Icon id="upload-icon" icon="tabler:upload" />{" "}
                      {t("reception.customUpload")}
                    </label>
                  )}
                  {buttonEvidence === "submit" && (
                    <label
                      type="submit"
                      className="custom-file-upload"
                      onClick={onSendEvidences}
                    >
                      {t("reception.submitEvidence")}{" "}
                      <Icon
                        id="upload-icon"
                        icon="tabler:arrow-big-right-filled"
                      />
                    </label>
                  )}
                  <button
                    className="bttn btn-primary"
                    onClick={(e) => onConfirmOrder(e)}
                  >
                    {t("pendingRecord.confirmOrder")}
                  </button>
                </form>
              </div>
            </Tab>
          </Tabs>

          {/* MODAL DE ENVIO DE EVIDENCIAS */}
          <Modal
            show={showEvidencesModal}
            onHide={() => setShowEvidencesModal(false)}
            className="modal-dispute"
          >
            <section className="alerta">
              <Icon
                icon="fluent-emoji:party-popper"
                className="icon-reception"
              />
              <h1>
                {t("pendingRecord.modalTittle")}{" "}
                <span className="grownet-pending">Grownet</span>
              </h1>
              <p>{t("pendingRecord.modalEvidenceText")}</p>
              <Link to="/record" className="bttn btn-primary">
                {t("pendingRecord.modalButton")}
              </Link>
            </section>
          </Modal>

          {/* MODAL DE CIERRE DE ORDEN */}

          <Modal show={showWarningModal} className="modal-dispute">
            <section className="alerta">
              <Icon className="error" icon="pajamas:error" />
              <h1> {t("pendingRecord.warningTitle")} </h1>
              <p>
                {t("pendingRecord.warningFirstPart")}{" "}
                <span id="number-phone">
                  {t("pendingRecord.warningSecondPart")}{" "}
                </span>
                {t("pendingRecord.warningThirdPart")}
              </p>
              <div id="modal-dispute-error">
                <button
                  className="bttn btn-primary"
                  onClick={onCloseOrder}
                  id="button-modal-close"
                >
                  {t("pendingRecord.warningConfirm")}
                </button>
                <button
                  className="bttn btn-outline"
                  onClick={handleClose}
                  id="close"
                >
                  {t("pendingRecord.warningCancel")}
                </button>
              </div>
            </section>
          </Modal>

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
