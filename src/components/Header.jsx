import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Header() {

  const { logOut } = useAuth();

  return (
    <header className="bg-gray-800 py-10">
      <div className='flex flex-col md:flex-row justify-between items-center container mx-auto'>
        <h1 className='text-white text-xl text-center md:text-left'>
          Administrador de cuentas de Streaming - {''}
          <span className='text-red-500 font-bold'>ASA</span>
        </h1>
        <nav className='flex flex-col md:flex-row justify-between items-center gap-3 md:gap-5 mt-4 md:mt-0'>
          <Link
            to="/admin"
            className='text-gray-400 uppercase hover:text-gray-100 transition-colors duration-300'
          >
            Cuentas
          </Link>

          <Link
            to="/admin/profile"
            className="text-gray-400 uppercase hover:text-gray-100 transition-colors duration-300"
          >
            Perfil
          </Link>
          <button
            type="button"
            className="text-gray-400 uppercase hover:text-gray-100 transition-colors duration-300"
            onClick={logOut}
          >
            cerrar sesion
          </button>
        </nav>
      </div>
      
    </header>
  )
}

export default Header