import React from "react";
import "../css/conditions.css";
import MenuPrimary from "../components/Menu/MenuPrimary";

export default function TermsAndConditions() {
  return (
    <section className="terms-conditions">
      <div className="tittle-terms">
        <h1>
          Terms and Conditions of Use for <span>Grownet</span>
        </h1>
        <p>Effective Date: September 19, 2023</p>
      </div>
      <div className="text-terms">
        <h3>1. Introduction</h3>
        <p>
          1.1. These terms and conditions (hereinafter referred to as the
          "Terms") govern the use of the services offered by Grownet ("We,"
          "Us," or "Our") through our mobile application and website
          (hereinafter referred to as the "Site"). By using our Site, you agree
          to these Terms and commit to abide by them.
        </p>
        <h3>2. Registration and User Account</h3>
        <p>
          2.1. To utilize our services, you must register on the Site.
          Registration requires providing accurate and up-to-date information.
        </p>
        <p>2.2. Only individuals aged 18 or older may use our Site.</p>
        <p>
          2.3. Access to the Site requires the creation of an account using your
          mobile phone number. You are responsible for maintaining the
          confidentiality of your account and password.
        </p>
        <p>
          2.4. You must not share your account with others or allow others to
          use your account.
        </p>
        <h3>3. Orders and Deliveries</h3>
        <p>
          3.1. Grownet acts as an intermediary between restaurants and
          suppliers. Restaurants can place orders for products through our Site.
        </p>
        <p>
          3.2. We facilitate communication between restaurants and suppliers but
          do not assume responsibility for the quality of products or services
          provided by the suppliers.
        </p>
        <p>
          3.3. Prices for products and delivery times are set by the suppliers
          and may be subject to change without prior notice.
        </p>
        <p>
          3.4. Deliveries will be made to the address specified in the order.
          Restaurants are responsible for providing an accurate address and
          being available to receive products at the agreed-upon time.
        </p>
        <h3>4. Cancellation and Returns</h3>
        <p>
          4.1. Cancellation and return policies are subject to the policies of
          each supplier. We recommend reviewing the policies of each supplier
          before placing an order.
        </p>
        <h3>5. Liability and Warranty</h3>
        <p>
          5.1. Grownet does not assume responsibility for the products or
          services provided by suppliers.
        </p>
        <h3>6. Privacy</h3>
        <p>
          6.1. Your privacy is important to us. Please refer to our Privacy
          Policy to learn how we collect, use, and protect your personal data.
        </p>
        <h3>7. Changes to the Terms</h3>
        <p>
          7.1. Grownet reserves the right to modify these Terms at any time.
          Modifications will become effective as soon as they are published on
          the Site.
        </p>
        <h3>8. Applicable Law and Jurisdiction</h3>
        <p>
          8.1. These Terms are governed by the laws of the United Kingdom, and
          any disputes arising in connection with these Terms will be subject to
          the exclusive jurisdiction of the courts of the United Kingdom.
        </p>
        <h3>9. Contact</h3>
        <p id="space-terms">
          9.1. If you have any questions or concerns about these Terms, please
          contact us at{" "}
          <a href={"https://grownetapp.com/"}>www.grownetapp.com</a>
        </p>
      </div>
      {/*<div className="footer">
    <p>© 2023 | Grownet, London | www.grownetapp.com</p>
        </div>*/}
      <div className="space-menu"></div>
      <MenuPrimary />
    </section>
  );
}
