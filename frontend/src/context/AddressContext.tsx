import axios from "axios";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";
import { Address } from "../types/Address";

interface AddressContextInterface {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const AddressContext = createContext<AddressContextInterface>({
  addresses: [],
  setAddresses: () => {},
  error: "",
  setError: () => {},
});

export const AddressContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState("");

  const { token, emailLogin } = useContext(LoginContext);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (location.pathname.includes("addresses") && token && emailLogin) {
        try {
          const response = await axios.get("http://localhost:3000/api/users/get-addresses", {
            headers: { Authorization: `Bearer ${token}` },
            params: { email: emailLogin },
          });
          setAddresses(response.data.allAddresses.addresses);
          console.log(response);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data.error || "An error occurred");
          }
        }
      }
    };
    fetchAddresses();
  }, [token, emailLogin]);

  return (
    <AddressContext.Provider value={{ addresses, setAddresses, error, setError }}>{children}</AddressContext.Provider>
  );
};
