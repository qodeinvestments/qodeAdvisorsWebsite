import React from "react";
import SendEmailForm from "../components/SendEmailForm";

const GrowMoney = ({ onClose }) => {
  return (
    <div className=" p-18 rounded-lg">
      <SendEmailForm onClose={onClose} />
    </div>
  );
};

export default GrowMoney;