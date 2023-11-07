import Carousel from "react-bootstrap/Carousel";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../css/prelogin.css";
import carousel_img1_en from "../img/carousel/en/carousel_img1.png";
import carousel_img2_en from "../img/carousel/en/carousel_img2.png";
import carousel_img3_en from "../img/carousel/en/carousel_img3.png";
import carousel_img4_en from "../img/carousel/en/carousel_img4.png";
import carousel_img1_es from "../img/carousel/es/carousel_img1.png";
import carousel_img2_es from "../img/carousel/es/carousel_img2.png";
import carousel_img3_es from "../img/carousel/es/carousel_img3.png";
import carousel_img4_es from "../img/carousel/es/carousel_img4.png";
import carousel_img1_pt from "../img/carousel/pt/carousel_img1.png";
import carousel_img2_pt from "../img/carousel/pt/carousel_img2.png";
import carousel_img3_pt from "../img/carousel/pt/carousel_img3.png";
import carousel_img4_pt from "../img/carousel/pt/carousel_img4.png";
import i18n from "../translations/i18n";

const carouselImages = {
  en: [carousel_img1_en, carousel_img2_en, carousel_img3_en, carousel_img4_en],
  pt: [carousel_img1_pt, carousel_img2_pt, carousel_img3_pt, carousel_img4_pt],
  es: [carousel_img1_es, carousel_img2_es, carousel_img3_es, carousel_img4_es],
  co: [carousel_img1_es, carousel_img2_es, carousel_img3_es, carousel_img4_es],
};

export default function HomePage() {
  const { t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  return (
    <section className="prelogin">
      <Carousel>
        {carouselImages[currentLanguage].map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="buttons_login">
        <Link className="bttn btn-secundary" to="/register">
          {" "}
          {t("home.register")}{" "}
        </Link>
        <Link className="bttn btn-white" to="/login">
          {" "}
          {t("home.login")}{" "}
        </Link>
      </div>
      <Link className="t-c"> {t("home.tandc")} </Link>
    </section>
  );
}
