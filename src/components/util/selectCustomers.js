import { useEffect, useState } from "react";

export default function SelectCustomers(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
  } = props;
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCustomers = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/customers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch customers");
        return;
      }

      const data = await response.json();
      const customersArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setCustomers(customersArray);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <select
      style={{ color: "grey" }}
      className="form-select"
      value={value}
      onChange={onChange}
      name={name}
    >
      {disabledOption && (
        <option
          value=""
          disabled
          selected
          style={{ backgroundColor: "rgb(209, 209, 209)", color: "white" }}
        >
          {disabledOption}
        </option>
      )}
      {specificOption && (
        <option value={specificOptionValue}>{specificOption}</option>
      )}
      {customers.map((customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.firstName} {customer.name}
        </option>
      ))}
    </select>
  );
}
