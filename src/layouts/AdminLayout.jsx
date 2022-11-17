import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminLayout() {
  const { auth, cargando } = useAuth();

  if(cargando) return 'cargando...'

  return (
    <>
      {auth?._id ? (
        <>
          <Header/>
            <main className="container mx-auto my-10">
              <Outlet/>
            </main>
          <Footer/>
        </>
      ) : <Navigate to="/"/>}
    </>
  )
}

export default AdminLayout