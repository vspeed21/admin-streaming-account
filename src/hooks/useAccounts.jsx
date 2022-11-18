import { useContext } from "react";
import AccountContext from "../context/AccountProvider";

const useAccounts = () => {
  return useContext(AccountContext);
}

export default useAccounts;