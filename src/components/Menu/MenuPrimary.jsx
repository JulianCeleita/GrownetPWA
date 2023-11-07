import { Icon } from "@iconify/react";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./menu.css";

export default function MenuPrimary() {
  const { t } = useTranslation();
  return (
    <Navbar>
      <Container className="menu">
        <Nav className="me-auto">
          <NavLink className="icons" to="/settings">
            <Icon icon="carbon:settings"> </Icon>
            <Icon className="icon-active" icon="iconamoon:settings-fill" />
            <p> {t("menuPrimary.settings")} </p>
          </NavLink>
          <NavLink className="icons" to="/suppliers">
            <Icon
              className=""
              icon="streamline:shopping-cart-basket-2-shopping-basket"
            />
            <Icon className="icon-active2" icon="teenyicons:basket-solid" />
            <p> {t("menuPrimary.order")} </p>
          </NavLink>
          <NavLink className="icons" to="/record">
            <Icon className="" icon="basil:invoice-outline" />
            <Icon className="icon-active3" icon="basil:invoice-solid" />
            <p> {t("menuPrimary.record")} </p>
          </NavLink>
          <NavLink className="icons" to="/chat">
            <Icon className="" icon="solar:chat-round-dots-linear" />
            <Icon className="icon-active4" icon="solar:chat-round-bold" />
            <p> {t("menuPrimary.chat")} </p>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
