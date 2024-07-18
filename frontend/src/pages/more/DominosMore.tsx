import React, { useContext } from "react";
import DominosMoreLoggedout from "../../components/Dominos More/DominosMoreLoggedout";
import { LoginContext } from "../../context/LoginContext";
import DominosMoreLoggedin from "../../components/Dominos More/DominosMoreLoggedin";

const DominosMore: React.FC = () => {
  const { loggedIn } = useContext(LoginContext);

  return loggedIn ? <DominosMoreLoggedin /> : <DominosMoreLoggedout />;
};

export default DominosMore;
