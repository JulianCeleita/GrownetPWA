import React from "react";
import { Link } from "react-router-dom";
import useOrderStore from "../store/useOrderStore";

export default function Suppliers() {
  const {
    suppliers,
    setSelectedSupplier,
    selectedSupplier: currentSelectedSupplier,
    setArticlesToPay,
  } = useOrderStore();
  const urlImg =
    "https://api.grownetapp.com/grownet/";

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
    if (currentSelectedSupplier?.id !== supplier.id) {
      setArticlesToPay([]);
    }
  };

  return (
    <section className="suppliers">
      {suppliers.map((supplier) => (
        <section key={supplier.id} id="suppliers-categ">
          <Link onClick={() => handleSupplierSelect(supplier)} to="products">
            <img
              src={urlImg + supplier.image}
              alt={supplier.name}
              id="img-suppliers"
            />
          </Link>
        </section>
      ))}
    </section>
  );
}
