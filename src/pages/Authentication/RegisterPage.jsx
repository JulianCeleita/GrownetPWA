import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerApiUrl } from "../../config/urls.config";
import Login from "./LoginPage";
//TODO Reutilizar este código para el nuevo registro

export default function RegisterPage() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { firstName, lastName, email, password } = data;

  const handleSubmit = async (e) => {
    console.log("djkddhf");
    e.preventDefault();
    console.log(data);
    try {
      const { data: res } = await axios.post(registerApiUrl, data);
      navigate("/suppliers");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <section className="login">
      <div className="login-form">
        {/* TODO CAMBIAR ESTE LOGIN POR EL COMPONENTE PARA REGISTER */}
        <Login className="number-form" />
      </div>
    </section>
  );
}
