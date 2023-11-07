import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function DeleteProduct({
  article,
  setArticles,
  articlesToPay,
  setArticlesToPay,
  calculateTotalToPay,
  updateTotalToPay,
}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteFunction = (productId) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId
          ? { ...article, amount: 0, totalItemToPay: 0 }
          : article
      )
    );

    const updatedArticlesToPay = articlesToPay.map((article) =>
      article.id === productId
        ? { ...article, amount: 0, totalItemToPay: 0 }
        : article
    );
    setArticlesToPay(updatedArticlesToPay);

    const newTotalToPay = calculateTotalToPay(updatedArticlesToPay);
    updateTotalToPay(newTotalToPay);
  };
  
  return (
    <>
      <Icon id="trash" icon="ph:trash" onClick={handleShow} />
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <section className="alerta">
            <Icon className="error" icon="pajamas:error" />
            <h1>Delete product</h1>
            <p id="text-alert">
              Are you sure to delete{" "}
              <span id="span-product">{article.name}?</span>
            </p>
            <div className="alert-delete">
              <button
                onClick={() => deleteFunction(article.id)}
                className="bttn btn-primary"
              >
                Delete
              </button>
              <button onClick={handleClose} className="bttn btn-outline">
                Cancel
              </button>
            </div>
          </section>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
