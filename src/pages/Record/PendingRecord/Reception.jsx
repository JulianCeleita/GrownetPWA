import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useState } from "react";
import { Form, Nav, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";
import MenuPrimary from "../../../components/Menu/MenuPrimary";
import { createDisputeOrder } from "../../../config/urls.config";
import "../../../css/reception.css";
import useRecordStore from "../../../store/useRecordStore";
import useTokenStore from "../../../store/useTokenStore";

export default function Reception() {
  const { t } = useTranslation();
  const { token } = useTokenStore();
  const [item, setItem] = useState({ kindOfStand: "", another: "another" });
  const { id, name, quantity, uom } = useParams();
  const [description, setDescription] = useState("");
  const [quantityDispute, setQuantityDispute] = useState("");
  const [motive, setMotive] = useState("1");
  const [evidences, setEvidences] = useState([]);
  const { selectedPendingOrder } = useRecordStore();
  const { kindOfStand } = item;
  const [show, setShow] = useState(false);

  const resetFormData = () => {
    setDescription("");
    setQuantityDispute("");
    setItem({ kindOfStand: "", another: "another" });
    setEvidences([]);
  };

  const onChangeSolution = (e) => {
    e.persist();
    console.log(e.target.value);

    setItem((prevState) => ({
      ...prevState,
      kindOfStand: e.target.value,
    }));
  };

  const handleFilesChange = (e) => {
    if (e.target.files.length > 10) {
      alert("No puedes subir más de 10 imágenes.");
      return;
    }
    const fileArray = Array.from(e.target.files);
    setEvidences(fileArray);
  };

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    const re = /^[0-9\b]+$/;
    if (inputValue === "" || re.test(inputValue)) {
      setQuantityDispute(inputValue);
    }
  };

  // ENVIAR LA DISPUTA
  const handleSubmit = (e) => {
    e.preventDefault();
    //alert(`${kindOfStand}`);
    setShow(true);
    const formData = new FormData();

    const disputeBody = {
      order: selectedPendingOrder,
      motive: motive,
      id_solutionsDisputes: kindOfStand,
      product_id: id,
      description: description,
      quantity: quantityDispute,
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
      })
      .catch((error) => {
        console.error("Error al crear la disputa:", error);
      });
  };

  return (
    <>
      <section className="reception">
        <div className="tittle-page">
          <Link to="/record/pendingRecord">
            {" "}
            <Icon src="google.com" icon="ic:round-arrow-back" id="arrow-icon" />
          </Link>
          <h1>{t("reception.title")}</h1>
        </div>
        <div className="reception-tittle">
          <Icon id="error-icon" icon="pajamas:error" />
          <div>
            <h3>{name}</h3>
            <p>
              {quantity} {uom}
            </p>
          </div>
        </div>

        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="1"
          onSelect={(key) => {
            setMotive(key);
            resetFormData();
          }}
        >
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="1">{t("reception.wrong")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">{t("reception.defective")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">{t("reception.other")}</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="1">
              <form
                className="wrong-reception"
                onSubmit={handleSubmit}
                controlid="kindOfStand"
              >
                <div className="wrong-product">
                  <h3>{t("reception.enterQuantity")}</h3>
                  <div className="unit-reception">
                    <input
                      type="text"
                      placeholder="Number of item"
                      value={quantityDispute}
                      onChange={handleQuantityChange}
                      required
                    />
                  </div>
                </div>
                <div className="wrong-product">
                  <div id="wrong-detail">
                    <h3>{t("reception.sendNextOrder")}</h3>
                    <Form.Check
                      value="1"
                      type="radio"
                      aria-label="radio 1"
                      onChange={onChangeSolution}
                      checked={kindOfStand === "1"}
                    />
                  </div>
                  <div id="wrong-detail">
                    <h3>{t("reception.crediteNote")}</h3>
                    <Form.Check
                      value="2"
                      type="radio"
                      aria-label="radio 1"
                      onChange={onChangeSolution}
                      checked={kindOfStand === "2"}
                    />
                  </div>
                </div>
                <button type="submit" className="bttn btn-primary">
                  {t("reception.send")}
                </button>
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="2">
              <form
                className="wrong-reception"
                onSubmit={handleSubmit}
                controlid="kindOfStand"
              >
                <div className="wrong-product">
                  <h3>{t("reception.defectiveQuantity")}</h3>
                  <div className="unit-reception">
                    <input
                      type="text"
                      placeholder="Number of item"
                      value={quantityDispute}
                      onChange={handleQuantityChange}
                      required
                    />
                  </div>
                </div>
                <div className="wrong-product">
                  <div id="wrong-detail">
                    <h3>{t("reception.sendNextOrder")}</h3>
                    <Form.Check
                      value="1"
                      type="radio"
                      aria-label="radio 1"
                      onChange={onChangeSolution}
                      checked={kindOfStand === "1"}
                    />
                  </div>
                  <div id="wrong-detail">
                    <h3>{t("reception.crediteNote")}</h3>
                    <Form.Check
                      value="2"
                      type="radio"
                      aria-label="radio 1"
                      onChange={onChangeSolution}
                      checked={kindOfStand === "2"}
                    />
                  </div>
                </div>
                {/* TODO MOVER ESTE CODIGO PARA QUE LA PERSONA ADJUNTE SU EVIDENCIA */}
                {/* <div className="wrong-product">
                  <h3>{t("reception.attachPhoto")}</h3>
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
                </div> */}
                <button type="submit" className="bttn btn-primary">
                  {t("reception.send")}
                </button>
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="3">
              <form
                className="wrong-reception"
                onSubmit={handleSubmit}
                controlid="kindOfStand"
              >
                <div className="wrong-product">
                  <h3>{t("reception.addComent")}</h3>
                  <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="bttn btn-primary">
                  {t("reception.send")}
                </button>
              </form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </section>
      <Modal show={show} className="modal-dispute">
        <section className="alerta">
          <Icon icon="flat-color-icons:ok" className="icon-reception" />
          <h1>Successfully created dispute</h1>
          <p>Our team will verify the information</p>
          <Link to="/record/pendingRecord" className="bttn btn-primary">
            Continue
          </Link>
        </section>
      </Modal>
      <div className="space-menu"></div>
      <MenuPrimary />
    </>
  );
}
