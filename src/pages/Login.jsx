import { useState } from "react";

import NavLinks from '../components/NavLinks';
import Alerta from "../components/Alerta";
import adminCliente from '../config/axios';
import useAuth from "../hooks/useAuth";
import Spinner from '../components/Spinner';

function Login() {
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Ambos campos son obligatorios',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      setShowSpinner(true);
      const { data } = await adminCliente.post('/admin/login', {email, password});
      localStorage.setItem('asa-token', data.token);
      setAuth(data);
      setAlerta({});
      
      setShowSpinner(false);
      window.location = '/admin'
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setShowSpinner(false);

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  }

  return (
    <>
      <div className="">
      <h1 className="text-7xl text-red-500 font-black text-center md:text-left">
          Inicia sesión y Administra {''} 
          <span className="text-black">tus cuentas</span>
        </h1>
      </div>
      
      <div className="mt-8 md:mt-0">
        <form
          onSubmit={handleSubmit} 
          className="bg-white shadow-md p-10 mx-3 rounded-lg"
        >
          {showSpinner ? (
            <div className="flex flex-col justify-center items-center gap-2 mb-5">
              <Spinner/>
              <p className="text-sm text-center">
                Validando credenciales...{''}
                <span className="font-bold">Porfavor espere</span>
              </p>
            </div>
          ) : null}
          {alerta.msg && <Alerta alerta={alerta} />}
          <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="email"
              className="text-gray-700 font-bold uppercase"
            >Correo electronico</label>
            <input
              id="email" 
              type="email"
              name="email"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="password"
              className="text-gray-700 font-bold uppercase"
            >Contraseña</label>
            <input
              id="password" 
              type="password"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="flex md:justify-end justify-start">
            <input
              type="submit"
              value="Iniciar sesión"
              disabled={!email || !password ? true : false}
              className={` text-white uppercase py-2 px-4 font-bold hover:cursor-pointer hover:bg-red-600 transition-colors rounded-md ${!email || !password ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} ${!email || !password ? 'bg-red-100' : 'bg-red-500'} ${!email || !password ? 'hover:bg-red-100' : 'hover:bg-red-600'}`}
            />
          </div>
        </form>

        <NavLinks
          texter="¿No tienes cuenta aún? Crea una"
          linker="/signup"
          textdo="Olvide mi contraseña"
          linkdo="/forgot-password"
        />
      </div>
    </>
  )
}

export default Login