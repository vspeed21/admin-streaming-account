import {createContext, useState, useEffect } from "react";

const AccountContext = createContext();

export function AccountProvider({children}) {
  const [accounts, setAccounts] = useState([]);

  return(
    <AccountContext.Provider
      value={{
        accounts
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export default AccountContext;