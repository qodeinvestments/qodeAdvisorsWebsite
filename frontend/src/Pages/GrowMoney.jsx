import React from "react";
import Button from "../components/common/Button";
import Text from "../components/common/Text";
import SendEmailForm from "../components/SendEmailForm";

const GrowMoney = () => {
  const VITE_GOOGLE_MEET_URL = import.meta.env.VITE_GOOGLE_MEET_URL;
  const VITE_INPERSON_URL = import.meta.env.VITE_INPERSON_URL;

  return (
    <div>
      <SendEmailForm />
    </div>
  );
};

export default GrowMoney;
