import Formulario from "../components/Formulario";
import ShowAccounts from "../components/ShowAccounts";
import useAccounts from "../hooks/useAccounts";

function AdminAccount() {
  const { accounts } = useAccounts();

  return (
    <div className="md:flex">
      <div className="md:w-1/2 lg:w-2/5">

        <Formulario/>
      </div>

      <div className="md:w-1/2 lg:w-3/5">
      <p className="text-2xl font-bold text-center mb-10 rounded-md">
        {accounts.length ? 'Administra tus' : 'No hay perfiles aún agrega uno y '}
        <span className="text-indigo-600 font-bold">{accounts.length ? ' perfiles' : 'administralos'}</span>
      </p>


        <ShowAccounts/>
      </div>
    </div>
  )
}

export default AdminAccount