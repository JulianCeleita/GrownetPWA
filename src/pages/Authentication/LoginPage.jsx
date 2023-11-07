import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { onlyCountries, validationApiUrl } from "../../config/urls.config";
import "../../css/login.css";
import "../../css/otp.css";
import logo_blancov2 from "../../img/logo_blancov2.svg";
import useTokenStore from "../../store/useTokenStore";
import CodeOtp from "./CodeOtp";

function Login() {
  const { t, i18n } = useTranslation();
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [showOtp, setShowOtp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  //TODO ELIMINAR ESTE OTP CODE, ES SOLO PARA VER EL CODIGO EN PANTALLA
  const [otpCode, setOtpCode] = useState("");
  const { setCountryCode } = useTokenStore();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(onlyCountries)
      .then((response) => {
        const countriesData = response.data.countries;
        const countryNames = countriesData.map((country) => country.short_name);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error obteniendo los paises disponibles:", error);
      });
  }, []);

  const handleChange = (value, selectedCountry) => {
    setPhoneNumber(value);
    setCountry(selectedCountry.dialCode);
    setCountryCode(selectedCountry.dialCode);
    setValid(validatePhoneNumber(value));
    const selectedLang = selectedCountry.countryCode;
    i18n.changeLanguage(selectedLang);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  let phone = PhoneNumber;
  let phoneNumberClean = phone.split(country);
  let parseCountry = parseInt(country);
  let numero = parseInt(phoneNumberClean[1]);

  const enviarData = (e) => {
    e.preventDefault();
    const state = {
      form: {
        country: parseCountry,
        telephone: numero,
      },
      error: false,
      errorMsg: "",
    };

    axios
      .post(validationApiUrl, state.form)
      .then((response) => {
        if (response.data.flag === 1) {
          //TODO ELIMINAR ESTE SETOTP, SOLO PARA MOSTRAR CODIGO EN PANTALLA
          setOtpCode(response.data.code);
          setShowOtp(true);
          handleShow(false);
          setShowAlert(false);
          setPhoneNumber(PhoneNumber);
        } else {
          setShowAlert(true);
          handleShow(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const resendCode = (e) => {
    enviarData(e);
  };

  return (
    <section className="login">
      <div className="login-form">
        <Container className="text-center">
          {showOtp ? (
            <CodeOtp
              idUsuario={numero}
              country={country}
              onResendCode={resendCode}
              code={otpCode}
            ></CodeOtp>
          ) : (
            <>
              <img
                className="img-login"
                src={logo_blancov2}
                alt="logo-Grownet"
              />
              <form onSubmit={enviarData}>
                <label className="text-form">
                  <p>{t("login.title")}</p>
                  {countries && countries.length > 0 ? (
                    <PhoneInput
                      country={"gb"}
                      value={PhoneNumber}
                      onChange={handleChange}
                      inputProps={{ required: true }}
                      selectedCountry={country}
                      onlyCountries={countries}
                    />
                  ) : null}
                </label>
                {!valid && <p></p>}
                <Col>
                  <button className="bttn btn-secundary" type="submit">
                    {t("login.button")}
                  </button>
                </Col>
              </form>
            </>
          )}
          {showAlert ? (
            <Modal show={show} onHide={handleClose}>
              <section className="alerta">
                <Icon className="error" icon="pajamas:error" />
                <h1>{t("login.modalTittle")}</h1>
                <p>{t("login.modalText")}</p>
                <p id="number-phone">{"+ " + country + " " + numero}</p>
                <a
                  className="bttn btn-primary"
                  onClick={handleClose}
                  id="close"
                >
                  {t("login.modalButton")}
                </a>
                {/*<Link> className="bttn btn-primary" to="/register">
              Register now
              </Link>*/}
              </section>
            </Modal>
          ) : (
            <></>
          )}
        </Container>
        {/*<h2>
          Don't have an account? <Link> to="/register">Sign Up</Link>
      </h2>*/}
      </div>
    </section>
  );
}

export default Login;
