import { useEffect, useState } from "react";

export default function SelectOfferingTypes(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
  } = props;
  const [offering_types, setOffering_types] = useState([]);
  const [message, setMessage] = useState("");

  const fetchOffering_types = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/offerings/types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch offering types");
        return;
      }

      const data = await response.json();
      setOffering_types(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offering_types");
    }
  };

  useEffect(() => {
    fetchOffering_types();
    console.log(offering_types+"heyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    
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
      {offering_types &&
        offering_types.map((offering_type, index) => (
          <option key={index} value={offering_type.offering_type}>
            {offering_type.offering_type}
          </option>
        ))}
    </select>
  );
}
