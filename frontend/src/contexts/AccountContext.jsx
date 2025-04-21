import { createContext, useState, useContext, useEffect } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({ accountId: "", balance: 0 });

  // Set account details when the component mounts (example from localStorage or API)
  useEffect(() => {
    const savedAccount = JSON.parse(localStorage.getItem("account")); // or fetch from an API
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);

  // Function to update account balance
  const updateBalance = (newBalance) => {
    setAccount((prevAccount) => ({ ...prevAccount, balance: newBalance }));
    localStorage.setItem("account", JSON.stringify({ ...account, balance: newBalance }));
  };

  // Function to update account ID
  const setAccountId = (accountId) => {
    setAccount((prevAccount) => ({ ...prevAccount, accountId }));
    localStorage.setItem("account", JSON.stringify({ ...account, accountId }));
  };

  return (
    <AccountContext.Provider value={{ account, setAccountId, updateBalance }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the Account Context
export const useAccount = () => useContext(AccountContext);
