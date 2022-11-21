import { useState } from 'react'
import { Link } from 'react-router-dom';

import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

function ChangePassword() {
  const [alerta, setAlerta] = useState({});
  const [passwords, setPasswords] = useState({});

  const [showSpinner, setShowSpinner] = useState(false);

  const { changePassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    
    if(passwords.pwd_nuevo.length < 8) {
      setAlerta({
        msg: 'La nueva contraseña debe ser mayor a 8 caracteres',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      setShowSpinner(true);
      const result = await changePassword(passwords);
      setShowSpinner(false);

      setAlerta(result);
    } catch (error) {
      console.log(error);
      setShowSpinner(false);
    }

    setPasswords({
      pwd_actual: '',
      pwd_nuevo: '',
    });

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  }

  return (
    <>
      <Link 
        to="/admin/profile"
        className="uppercase text-gray-500 font-bold hover:text-gray-700 transition-colors mb-5 block"
      >
        Cambiar info perfil
      </Link>

    <form 
      className="bg-white p-5 md:w-1/2 mx-auto"
      onSubmit={handleSubmit}
    >
      {showSpinner ? (
        <div className="flex flex-col justify-center items-center gap-2 mb-5">
          <Spinner/>
        </div>
      ) : null}

      {alerta.msg && <Alerta alerta={alerta} />}
      
      <div className="flex flex-col mb-5 gap-3">
        <label 
          htmlFor="pwd_actual"
          className="text-gray-700 font-bold uppercase"
        >Contraseña actual:</label>
        <input
          id="pwd_actual" 
          type="password"
          name="pwd_actual"
          className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
          placeholder="Ingresa la contraseña actual"
          value={passwords.pwd_actual}
          onChange={e => setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
          })}
        />
      </div>

      <div className="flex flex-col mb-5 gap-3">
        <label 
          htmlFor="pwd_nuevo"
          className="text-gray-700 font-bold uppercase"
        >Contraseña nueva:</label>
        <input
          id="pwd_nuevo" 
          type="password"
          name="pwd_nuevo"
          className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
          placeholder="Ingresa la contraseña nueva"
          value={passwords.pwd_nuevo}
          onChange={e => setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
          })}
        />
      </div>

      <div className="flex md:justify-end justify-start">
        <input
          type="submit"
          value="Guardar cambios"
          disabled={!passwords.pwd_actual || !passwords.pwd_nuevo ? true : false}
          className={`text-white uppercase py-2 px-4 font-bold hover:cursor-pointer hover:bg-red-600 transition-colors rounded-md w-full md:w-auto ${!passwords.pwd_actual || !passwords.pwd_nuevo ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} ${!passwords.pwd_actual || !passwords.pwd_nuevo ? 'bg-red-100' : 'bg-red-500'} ${!passwords.pwd_actual || !passwords.pwd_nuevo ? 'hover:bg-red-100' : 'hover:bg-red-600'}`}
        />
      </div>
    </form>
    </>
  )
}

export default ChangePassword