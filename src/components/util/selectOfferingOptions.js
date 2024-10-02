import { useEffect, useState } from "react";

export default function SelectOfferingOptions(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
    typeId
  } = props;
  const [offering_options, setOffering_options] = useState([]);
  const [message, setMessage] = useState("");

  const fetchOffering_options = async () => {
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:3030/offerings/types/${typeId}/options`,
        {
          method: "GET",
          headers: {
            "Content-Option": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch offering options");
        return;
      }

      const data = await response.json();
      setOffering_options(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offering_options");
    }
  };

  useEffect(() => {
    fetchOffering_options();    
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
      {offering_options &&
        offering_options.map((offering_option, index) => (
          <option key={index} value={offering_option.id}>
            {offering_option.name}
          </option>
        ))}
    </select>
  );
}
