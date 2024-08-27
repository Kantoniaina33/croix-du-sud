import { useEffect, useState } from "react";

export default function SelectCircuits(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
  } = props;
  const [circuits, setCircuits] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCircuits = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/circuits`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch circuits");
        return;
      }

      const data = await response.json();
      const circuitsArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setCircuits(circuitsArray);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching circuits");
    }
  };

  useEffect(() => {
    fetchCircuits();
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
      {circuits.map((circuit) => (
        <option key={circuit.id} value={circuit.id}>
          {circuit.name}
        </option>
      ))}
    </select>
  );
}
