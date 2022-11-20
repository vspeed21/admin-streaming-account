import {createContext, useState, useEffect } from "react";
import adminClient from "../config/axios";

const AccountContext = createContext();

export function AccountProvider({children}) {
  const [accounts, setAccounts] = useState([]);
  const [accountEditar, setAccountEditar] = useState({});


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
    
    if(account.id) {
      //Editar
      try {
        const { data } = await adminClient.put(`/account/${account.id}`, account, config);
        
        const accountsSaved = accounts.map(account => account._id === data._id ? data : account);

        setAccounts(accountsSaved);
  
      } catch (error) {
        console.log(error);
      }

    }else{
      //Add new account
      try {
        const { data } = await adminClient.post('/account', account, config);
        const { updatedAt, createdAt, __v, ...accountsSave } = data;
        setAccounts([accountsSave, ...accounts]);
  
      } catch (error) {
        console.log(error);
      }
    }
  }

  return(
    <AccountContext.Provider
      value={{
        accounts,
        saveAccounts,
        setAccountEditar,
        accountEditar,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export default AccountContext;