import { useEffect, useState } from "react";

export default function SelectPrograms(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
    circuitId
  } = props;
  const [programs, setPrograms] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPrograms = async () => {
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:3030/circuits/${circuitId}/programs`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch programs");
        return;
      }

      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching programs");
    }
  };

  useEffect(() => {
    fetchPrograms();
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
      {programs.map((program) => (
        <option key={program.id} value={program.id}>
          {program.departure} - {program.arrival}
        </option>
      ))}
    </select>
  );
}
