import { Icon } from "@iconify/react";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import MenuPrimary from "../../components/Menu/MenuPrimary";
import "../../css/settings.css";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <>
      <section className="settings">
        <h1>{t("settings.title")}</h1>
        <div className="saludo">
          <h4>
            {t("settings.hi")} <Icon icon="noto:waving-hand" />
          </h4>
        </div>
        <p>{t("settings.helpText")}</p>
        <div>
          <Link className="bttn btn-primary settings-button" id="my-intercom">
            <div className="text-button">
              <h2>{t("settings.restaurants")}</h2>
              <p>{t("settings.editRestaurants")}</p>
            </div>
            <Icon icon="simple-line-icons:plus" className="plus" />
          </Link>
          <Link className="bttn btn-secundary settings-button" id="my-intercom">
            <div className="text-button">
              <h2>{t("settings.suppliers")}</h2>
              <p>{t("settings.editSuppliers")}</p>
            </div>
            <Icon icon="simple-line-icons:plus" className="plus" />
          </Link>
        </div>
        <Accordion id="idiomas">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t("settings.languages")}</Accordion.Header>
            <Accordion.Body>
              <div id="banderas">
                <Icon icon="circle-flags:uk" />
                <Link to="" onClick={() => changeLanguage("en")}>
                  {t("settings.english")}
                </Link>
              </div>
              <div id="banderas">
                <Icon icon="emojione:flag-for-spain" />
                <Link to="" onClick={() => changeLanguage("es")}>
                  {t("settings.spanish")}
                </Link>
              </div>
              <div id="banderas">
                <Icon icon="emojione:flag-for-portugal" />
                <Link to="" onClick={() => changeLanguage("pt")}>
                  {t("settings.portuguese")}
                </Link>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="settings-options">
          <Link className="bttn" id="setting-button" to="faq">
            <h2>{t("settings.faq")}</h2>
            <Icon className="icon-arrow" icon="ep:arrow-right-bold" />
          </Link>
          <Link className="bttn" id="setting-button" to="termsAndCoditions">
            <h2>{t("settings.termsAndConditions")}</h2>
            <Icon className="icon-arrow" icon="ep:arrow-right-bold" />
          </Link>
        </div>
        <button id="log-out" onClick={handleLogout}>
          <Icon icon="solar:logout-linear" className="icon-logout" />{" "}
          {t("settings.logOut")}
        </button>
      </section>
      <MenuPrimary />
    </>
  );
}
