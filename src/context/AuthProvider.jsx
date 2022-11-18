import { createContext, useState, useEffect } from 'react';
import swal from 'sweetalert';
import adminClient from '../config/axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    checkAuth();
    async function checkAuth() {
      const token = localStorage.getItem('asa-token');
      if(!token){
        setCargando(false);
        return;
      }
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
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
  

  return(
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;