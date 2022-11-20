import {createContext, useState, useEffect } from "react";
import adminClient from "../config/axios";

const AccountContext = createContext();

export function AccountProvider({children}) {
  const [accounts, setAccounts] = useState([]);
  console.log(accounts);

  const token = localStorage.getItem('asa-token');
  const config = {
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  useEffect(() => {
    getAccounts();

    async function getAccounts() {
      if(!token) return;
      try {
        const { data } = await adminClient('/account', config);
        setAccounts(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const saveAccounts = async account => {
    if(!token) return;
    try {
      const { data } = await adminClient.post('/account', account, config);
      const { updatedAt, createdAt, __v, ...accountsSave } = data;
      setAccounts([accountsSave, ...accounts]);

    } catch (error) {
      console.log(error);
    }
  }

  return(
    <AccountContext.Provider
      value={{
        accounts,
        saveAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export default AccountContext;