import { createContext, useState, useEffect } from 'react';
import swal from 'sweetalert';
import adminClient from '../config/axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const token = localStorage.getItem('asa-token');
  const config = {
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  useEffect(() => {
    checkAuth();
    async function checkAuth() {
      if(!token){
        setCargando(false);
        return;
      }

      try {
        const { data } = await adminClient('/admin/perfil', config);
        setAuth(data);
      } catch (error) {
        console.log(error);
        setAuth({})
      }

      setCargando(false);
    }

  }, []);

  const logOut = () => {
    swal({
      title: "¿Estas seguro de cerrar sesion?",
      icon: "warning",
      buttons: ['Cancelar', 'Confirmar'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem('asa-token');
        setAuth({});
      }
    });
  }

  const updateProfile = async admin => {
    if(!token) return;

    try {
      const { data } = await adminClient.put(`/admin/perfil`, admin, config);
      return {
        msg: data.msg,
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  return(
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
        logOut,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;