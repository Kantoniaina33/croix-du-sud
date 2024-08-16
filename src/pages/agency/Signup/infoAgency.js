import { useEffect, useState } from "react";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import FormAgency from "../../../components/agency/formAgency";

export default function InfoAgency() {
  return (
    <>
      <FormAgency method="POST" />;
    </>
  );
}
