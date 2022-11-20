import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from '../components/Alerta';

function Profile() {
  const [profile, setProfile] = useState({});
  const [alerta, setAlerta] = useState({});

  const { auth, updateProfile } = useAuth();

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  const handleSubmit = async e => {
    e.preventDefault();
    
    const result = await updateProfile(profile);
    setAlerta(result);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  }

  return (
    <>
      <Link 
        to="/admin/change-password"
        className="uppercase text-gray-500 font-bold hover:text-gray-700 transition-colors mb-5 block"
      >
        Cambiar contraseña
      </Link>

    <form 
      className="bg-white p-5 md:w-1/2 mx-auto"
      onSubmit={handleSubmit}
    >
      {alerta.msg && <Alerta alerta={alerta} />}
      <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="name"
              className="text-gray-700 font-bold uppercase"
            >Nombre:</label>
            <input
              id="name" 
              type="name"
              name="name"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu nombre"
              value={profile.name}
              onChange={e => setProfile({
                ...profile,
                [e.target.name]: e.target.value,
              })}
            />
          </div>

          <div className="flex flex-col mb-5 gap-3">
            <label 
              htmlFor="email"
              className="text-gray-700 font-bold uppercase"
            >Nombre:</label>
            <input
              id="email" 
              type="email"
              name="email"
              className="border-2 p-1 bg-gray-50 rounded-md focus:outline-0 pl-2"
              placeholder="Ingresa tu nombre"
              value={profile.email}
              onChange={e => setProfile({
                ...profile,
                [e.target.name]: e.target.value,
              })}
            />
          </div>

          <div className="flex md:justify-end justify-start">
            <input
              type="submit"
              value="Guardar cambios"
              disabled={!profile.email || !profile.name ? true : false}
              className={`text-white uppercase py-2 px-4 font-bold hover:cursor-pointer hover:bg-red-600 transition-colors rounded-md w-full md:w-auto ${!profile.email || !profile.name ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} ${!profile.email || !profile.name ? 'bg-red-100' : 'bg-red-500'} ${!profile.email || !profile.name ? 'hover:bg-red-100' : 'hover:bg-red-600'}`}
            />
          </div>
    </form>
    </>
  )
}

export default Profile