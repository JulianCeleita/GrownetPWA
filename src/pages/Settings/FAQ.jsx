import React from "react";
import "../../css/faq.css";
import Accordion from "react-bootstrap/Accordion";
import MenuPrimary from "../../components/Menu/MenuPrimary";
import fav_icon from "../../img/fav_icon.png";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t, i18n } = useTranslation();

  return (
    <section className="faq">
      <img src={fav_icon} alt="" />
      <div className="accordion-faq">
        <h1>
          {t("settingsFaq.tittle1")}{" "}
          <span className="span-fqa">{t("settingsFaq.tittle2")}</span>
        </h1>
        <Accordion className="" defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Icon icon="octicon:question-24" className="question-icon" />
              {t("settingsFaq.question1")}
            </Accordion.Header>
            <Accordion.Body>{t("settingsFaq.answer1")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <Icon icon="octicon:question-24" className="question-icon" />
              {t("settingsFaq.question2")}
            </Accordion.Header>
            <Accordion.Body>{t("settingsFaq.answer2")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <Icon icon="octicon:question-24" className="question-icon" />
              {t("settingsFaq.question3")}
            </Accordion.Header>
            <Accordion.Body>{t("settingsFaq.answer3")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <Icon icon="octicon:question-24" className="question-icon" />
              {t("settingsFaq.question4")}
            </Accordion.Header>
            <Accordion.Body>{t("settingsFaq.answer4")}</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <Icon icon="octicon:question-24" className="question-icon" />
              {t("settingsFaq.question5")}
            </Accordion.Header>
            <Accordion.Body>{t("settingsFaq.answer5")}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <MenuPrimary />
    </section>
  );
}
