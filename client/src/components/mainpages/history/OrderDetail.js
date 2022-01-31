import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const { id } = useParams();
  console.log(id);
  return <div></div>;
};

export default OrderDetail;
