import Formulario from "../components/Formulario";
import ShowAccounts from "../components/ShowAccounts";

function AdminAccount() {
  return (
    <div className="md:flex">
      <div className="md:w-1/2 lg:w-2/5">
        <Formulario/>
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ShowAccounts/>
      </div>
    </div>
  )
}

export default AdminAccount