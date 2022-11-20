import useAccounts from "../hooks/useAccounts";
import Account from "./Account";


function ShowAccounts() {
  const { accounts } = useAccounts();

  return (
    <>
      {accounts.length ? accounts.map( account => (
        <div
          key={account?._id} 
          className="md:ml-10 mx-5 mt-5 bg-white py-5 px-8 shadow-md rounded-lg mb-3"
        >
          <Account
            account={account}
          />
        </div>
      )) : null}
    </>
  )
}

export default ShowAccounts