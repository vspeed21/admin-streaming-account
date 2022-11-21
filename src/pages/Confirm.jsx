import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import adminClient from '../config/axios';
import Alerta from "../components/Alerta"


function Confirm() {
  const params = useParams();
  const { token } = params;

  const [confirmed, setConfirmed] = useState(false);

  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    checkToken();
    async function checkToken() {
      try {
        const url = `/admin/confirm/${token}`;
        const { data } = await adminClient(url);
        setConfirmed(true);
        setAlerta({
          msg: data.msg,
        });

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
  }, []);

  return (
    <>
      <div className="">
      <h1 className="text-5xl md:text-6xl lg:text-7xl text-red-500 font-black text-center md:text-left">
          Confirma tu cuenta para administrar {''} 
          <span className="text-black">tus cuentas</span>
      </h1>
      </div>

      <div className="bg-white shadow p-5">
        {alerta.msg && <Alerta alerta={alerta} />}

        {confirmed && (
          <Link to="/" className="text-gray-600 block text-center hover:text-gray-900  transition-colors duration-300">
            Iniciar sesión</Link>
          )}
      </div>
    </>
  )
}

export default Confirm