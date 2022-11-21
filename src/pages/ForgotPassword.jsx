import adminClient from '../config/axios';
import { useState } from 'react';

import Alerta from '../components/Alerta';
import AlertaInputs from '../components/AlertaInputs';
import NavLinks from '../components/NavLinks';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(!email) {
      setAlerta({
        msg: 'El correo es obligatorio',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      const url = `/admin/forgot-password`;
      const { data } = await adminClient.post(url, { email });
      setAlerta({
        msg: data.msg
      });

      setEmail('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const handleInput = e => {
    if(e.target.name === 'email' && !validarEmail(e.target.value)) {
      setValidEmail(true);
      return;
    }
    setValidEmail(false);
  }

  function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(email)
  }

  return (
    <>
      <div className="">
      <h1 className="text-5xl md:text-6xl lg:text-7xl text-red-500 font-black text-center md:text-left">
          No pierdas acceso a tus cuentas {''} 
          <span className="text-black"></span>
        </h1>
      </div>
      
      <div className="mt-8 md:mt-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-10 mx-3 rounded-lg"
        >
          {alerta.msg && <Alerta alerta={alerta}/>}

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
              onInput={handleInput}
              value={email}
              onChange={e  => setEmail(e.target.value)}
            />

            {validEmail ? <AlertaInputs msg="Dirreción de correo electrónica no válida"/>: null}
          </div>

          <div className="flex md:justify-end">
            <input
              type="submit"
              value="Enviar instrucciones"
              className="bg-red-500 text-white uppercase py-2 px-4 font-bold hover:cursor-pointer hover:bg-red-600 transition-colors rounded-md w-full md:w-auto"
            />
          </div>
        </form>
        <NavLinks
          texter="¿Ya tienes una cuenta? Inicia sesión"
          linker="/"
          textdo="¿No tienes cuenta aún? Crea una"
          linkdo="/signup"
        />
      </div>
    </>
  )
}

export default ForgotPassword