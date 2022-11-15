import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Alerta from "../components/Alerta";
import AlertaInputs from "../components/AlertaInputs";
import adminCliente from '../config/axios';

function SavePassword() {
  const params = useParams();
  const { token } = params;

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [alerta, setAlerta] = useState({});

  const [validToken, setValidToken] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    checkToken();
    async function checkToken() {
      try {
        const url = `/admin/forgot-password/${token}`;
        const { data } = await adminCliente(url);
        
        setAlerta({
          msg: data.msg,
        });

        setValidToken(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 8) {
      setAlerta({
        msg: 'La contraseña es muy corta. Añade mas de 8 caracteres',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      const url = `/admin/forgot-password/${token}`;
      const { data } = await adminCliente.post(url, { password });
      setAlerta({
        msg: data.msg,
      });
      setPassword('');
      setChanged(true);

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }

  const handleInput = e => {
    if(e.target.name === 'password' && password.length < 8) {
      setValidPassword(true);
      return;
    }
    setValidPassword(false);
  }

  return (
    <>
      <div className="">
      <h1 className="text-5xl md:text-6xl lg:text-7xl text-red-500 font-black text-center md:text-left">
          No pierdas acceso a tus cuentas {''} 
          <span className="text-black"></span>
        </h1>
      </div>
      
      <div className="mt-8 md:mt-0 bg-white shadow-md p-10 mx-3 rounded-lg">
      {alerta.msg && <Alerta alerta={alerta}/>}
        {validToken ? (
          <form
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="password"
              className="text-gray-700 font-bold uppercase"
            >Nueva contraseña</label>
            <input
              id="password" 
              type="password"
              name="password"
              className={`border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2 ${validPassword ? 'border-red-400' : ''}`}
              placeholder="Ingresa la nueva contraseña"
              onInput={handleInput}
              value={password}
              onChange={e  => setPassword(e.target.value)}
            />

            {validPassword ? <AlertaInputs msg="Contraseña muy corta. Añade mas de 8 caracteres"/>: null}
          </div>

          <div className="flex md:justify-end">
            {changed ? (
              <Link 
                to='/'
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  Iniciar sesión
                </Link>
            ) : (
              <input
              type="submit"
              value="Cambiar contraseña"
              className="bg-red-500 text-white uppercase py-2 px-4 font-bold hover:cursor-pointer hover:bg-red-600 transition-colors rounded-md w-full md:w-auto"
            />
            )}
          </div>
        </form>
        ) : null}
      </div>
    </>
  )
}

export default SavePassword