import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { otpApiUrl } from "../../config/urls.config";
import "../../css/otp.css";
import logo_blancov2 from "../../img/logo_blancov2.svg";
import useTokenStore from "../../store/useTokenStore";
import useAuth from "../../auth/useAuth";

export default function CodeOtp(props) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { onResendCode, code } = props;
  const [seconds, setSeconds] = useState(20);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const { setToken } = useTokenStore();

  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setShow(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const sendData = (e) => {
    e.preventDefault();
    let id = props.idUsuario;
    let otpNumber = otp.join("");
    let country = props.country;
    const state = {
      form: {
        country: country,
        telephone: id,
        code: otpNumber,
      },
      error: false,
      errorMsg: "",
    };

    axios
      .post(otpApiUrl, state.form)
      .then((response) => {
        if (response.data.flag === 1) {
          handleShowError(false);
          setToken(response.data.token);
          login();
        } else {
          handleShowError(false);
          setShowAlert(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendCode = (e) => {
    onResendCode(e);
    setOtp(new Array(4).fill(""));
    setSeconds(20);
    setShow(false);
  };

  return (
    <section className="otp">
      <img className="img-otp" src={logo_blancov2} alt="logo-Grownet" />
      <h1> {t("codeOtp.enterCode")} </h1>
      <p className="text-otp"> {t("codeOtp.codeSent")} </p>
      <form action="#" className="form-otp">
        <div className="input-field">
          {otp.map((data, index) => (
            <input
              className="input-otp"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(index, e.target.value)}
              onFocus={(e) => e.target.select()}
              id={`otp-input-${index}`}
              inputMode="numeric"
              pattern="[0-9]*"
              onKeyDown={(e) => {
                if (isNaN(Number(e.key))) {
                  e.preventDefault();
                }
              }}
            />
          ))}
        </div>
        <p id="otp-number">
          {" "}
          {t("codeOtp.yourOtpCodeIs")} {code}
        </p>
        <button className="bttn btn-secundary" onClick={sendData}>
          {t("codeOtp.verifyAndProceed")}
        </button>
        {show ? (
          <h2>
            {t("codeOtp.didntReceiveCode")}
            <Link to="#" onClick={handleResendCode}>
              {" "}
              {t("codeOtp.sendAgain")}
            </Link>
          </h2>
        ) : (
          <h2>
            {" "}
            {t("codeOtp.waitFirstPart")} {seconds} {t("codeOtp.waitSecondPart")}{" "}
          </h2>
        )}
      </form>
      {showAlert ? (
        <Modal show={showError} onHide={handleCloseError}>
          <section className="alerta">
            <Icon className="error" icon="pajamas:error" />
            <h1>{t("codeOtp.apologize")}</h1>
            <p>{t("codeOtp.wrongCode")}</p>
            <p id="number-otp">{otp}</p>
            <button className="bttn btn-primary" onClick={handleCloseError}>
              {t("codeOtp.tryAgain")}
            </button>
          </section>
        </Modal>
      ) : (
        <></>
      )}
    </section>
  );
}
