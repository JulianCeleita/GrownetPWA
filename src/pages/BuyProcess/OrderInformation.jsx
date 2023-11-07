import emailjs from "@emailjs/browser";
import { Icon } from "@iconify/react";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { createStorageOrder } from "../../config/urls.config";
import "../../css/orderDetail.css";
import fav_icon from "../../img/fav_icon.png";
import useOrderStore from "../../store/useOrderStore";
import useTokenStore from "../../store/useTokenStore";
import { set } from "date-fns";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
      fontWeight: "700",
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
      fontWeight: "600",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E9F4FF",
    color: "#04444F",
    fontFamily: "Poppins",
  },
  information: {
    borderBottomLeftRadius: "30",
    borderBottomRightRadius: "30",
    backgroundColor: "white",
    marginBottom: 20,
  },
  image: {
    width: "55%",
    marginTop: -5,
  },
  sectionTop: {
    margin: 30,
    padding: 10,
    width: "70%",
    marginBottom: 0,
    paddingBottom: 0,
  },
  sectionTop1: {
    margin: 30,
    padding: 10,
    width: "30%",
    marginBottom: 0,
    paddingBottom: 0,
  },
  fontSpan: {
    color: "#026CD2",
    fontWeight: "600",
  },
  top: {
    flexDirection: "row",
  },
  section: {
    margin: 30,
    marginTop: 0,
    marginBottom: 0,
    padding: 10,
    width: "50%",
    paddingBottom: 5,
  },
  message: {
    margin: 40,
    marginTop: 0,
    marginBottom: 20,
  },
  tittleRestaurant: {
    marginTop: 50,
    marginLeft: 40,
  },
  restaurantText: {
    fontSize: 35,
    fontWeight: "700",
  },
  text: {
    fontSize: 12,
    paddingTop: 6,
  },
  tittle: {
    fontSize: 13,
    fontWeight: "600",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "14",
    borderColor: "#026CD2",
    margin: 20,
    marginTop: 0,
    backgroundColor: "white",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableRowTittle: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "#026CD2",
    borderTopLeftRadius: "12",
    borderTopRightRadius: "12",
    color: "white",
  },
  tableCol: {
    width: "16.7%",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 13,
    paddingTop: 7,
    paddingBottom: 7,
  },
  table2: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "14",
    borderColor: "#026CD2",
    margin: 20,
    marginTop: 10,
    marginLeft: "40%",
    backgroundColor: "white",
  },
  tableColTotal: {
    width: "50%",
    color: "white",
  },
  tableColTotal2: {
    width: "50%",
  },
  radiusTotalNet: {
    backgroundColor: "#026CD2",
    borderTopLeftRadius: "12",
    borderBottomLeftRadius: "0",
  },
  radiusTotalTax: {
    backgroundColor: "#026CD2",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },
  radiusTotal: {
    backgroundColor: "#026CD2",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "12",
  },
  footer: {
    backgroundColor: "#026CD2",
    padding: 15,
    textAlign: "center",
    color: "white",
    fontSize: 15,
    borderTopLeftRadius: "30",
    borderTopRightRadius: "30",
    left: 0,
    bottom: 0,
  },
});

export const PdfDocument = ({
  selectedRestaurant,
  data,
  selectedSupplier,
  deliveryData,
  orderNumber,
  specialRequirements,
  totalNet,
  totalTaxes,
  totalToPay,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.information}>
        <View style={styles.top}>
          <View style={styles.sectionTop}>
            <Text style={styles.restaurantText}>Purchase Order </Text>
            <Text style={styles.text}>
              for{" "}
              <Text style={styles.fontSpan}>
                {selectedSupplier.name} produce
              </Text>
            </Text>
          </View>
          <View style={styles.sectionTop1}>
            <Image style={styles.image} src={fav_icon} cache={false} />
          </View>
        </View>
        <View style={styles.top}>
          <View style={styles.section}>
            <Text style={styles.text}>Requested delivery date</Text>
            <Text style={styles.tittle}>{deliveryData}</Text>
            <Text style={styles.text}>Ordered by</Text>
            <Text style={styles.tittle}>{selectedRestaurant.accountName}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Order number</Text>
            <Text style={styles.tittle}>{orderNumber}</Text>
            <Text style={styles.text}>Delivery address</Text>
            <Text style={styles.tittle}>{selectedRestaurant.address} </Text>
          </View>
        </View>
        <View style={styles.message}>
          <Text style={styles.text}>Special requirements</Text>
          <Text style={styles.tittle}>{specialRequirements}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRowTittle}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ID</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Product name</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>UOM</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Item price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Total items price</Text>
          </View>
        </View>
        {data
          .filter((article) => article.amount > 0)
          .map((article) => (
            <View key={article.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{article.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{article.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{article.amount}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{article.uomToPay}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  £{article.selectedPriceWithTax}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>£{article.totalItemToPay}</Text>
              </View>
            </View>
          ))}
      </View>
      <View>
        <View style={styles.table2} break>
          <View style={styles.tableRow}>
            <View style={styles.tableColTotal}>
              <View style={styles.radiusTotalNet}>
                <Text style={styles.tableCell}>Total Net</Text>
              </View>
            </View>
            <View style={styles.tableColTotal2}>
              <Text style={styles.tableCell}>£{totalNet}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColTotal}>
              <View style={styles.radiusTotalTax}>
                <Text style={styles.tableCell}>Total Tax</Text>
              </View>
            </View>
            <View style={styles.tableColTotal2}>
              <Text style={styles.tableCell}>£{totalTaxes}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColTotal}>
              <View style={styles.radiusTotal}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
            </View>
            <View style={styles.tableColTotal2}>
              <Text style={styles.tableCell}>£{totalToPay}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default function OrderInformation() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {
    selectedRestaurant,
    articlesToPay,
    deliveryData,
    setDeliveryData,
    specialRequirements,
    selectedSupplier,
    setSpecialRequirements,
    totalNet,
    totalTaxes,
    totalToPay,
    orderNumber,
    setOrderNumber,
  } = useOrderStore();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [dateToPicker, setDateToPicker] = useState();
  const [mysqlDate, setMysqlDate] = useState("");
  const { token } = useTokenStore();

  const handleChangeDate = (date) => {
    setDateToPicker(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const dateMysqlFormat = `${year}-${month}-${day}`;

    setDeliveryData(formattedDate);
    setMysqlDate(dateMysqlFormat);
  };

  useEffect(() => {
    setData(articlesToPay);
    setSpecialRequirements("");
  }, []);

  // OBTENER NUMERO DE ORDEN
  const getOrderNumber = async () => {
    const filteredJsonProducts = articlesToPay.filter(
      (article) => article.amount > 0
    );
    const jsonProducts = filteredJsonProducts.map((article) => ({
      quantity: article.amount,
      id_presentations: article.idUomToPay,
      price: parseFloat(article.totalItemToPay.toFixed(2)),
    }));
    const jsonOrderData = {
      id_suppliers: selectedSupplier.id,
      date_delivery: mysqlDate,
      address_delivery: selectedRestaurant.address,
      accountNumber_customers: selectedRestaurant.accountNumber,
      observation: specialRequirements,
      total: totalToPay,
      net: totalNet,
      total_tax: totalTaxes,
      products: jsonProducts,
    };
    console.log(jsonOrderData, "este es  :DDD");
    try {
      const response = await axios.post(createStorageOrder, jsonOrderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newOrderNumber = response.data.reference;
      setOrderNumber(newOrderNumber);
      console.log(
        "Respuesta exitosa al crear la orden",
        response.data.reference
      );
      return newOrderNumber;
    } catch (error) {
      console.log("Error al crear la orden", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOrderNumber = await getOrderNumber();
    if (newOrderNumber) {
      navigate("/orderSuccessful");
    } else {
      console.log("No se obtuvo numero de orden");
    }
  };

  return (
    <section className="details">
      <div className="tittle-page">
        <Link to="/suppliers/details">
          <Icon src="google.com" icon="ic:round-arrow-back" id="arrow-icon" />
        </Link>
        <h1>{t("deliveryDetail.orderDetail")}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="data-shipping">
          <h3 id="text-data-shipping">{t("deliveryDetail.address")}</h3>
          <input
            type="text"
            name="address"
            value={selectedRestaurant.address}
            disabled
          />
          <h3>{t("deliveryDetail.deliver")}</h3>
          <DatePicker
            onFocus={(e) => (e.target.readOnly = true)}
            selected={dateToPicker}
            onChange={handleChangeDate}
            minDate={tomorrow}
            placeholderText={t("deliveryDetail.selectDate")}
            required
          />
          <h3>{t("deliveryDetail.specialRequirements")}</h3>
          <textarea
            id="w3review"
            name="message"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <input
          type="submit"
          className="bttn btn-primary"
          value={t("deliveryDetail.continue")}
        />
      </form>
    </section>
  );
}
