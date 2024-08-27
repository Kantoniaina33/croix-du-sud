import { useEffect, useState } from "react";

export default function SelectRoles(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
  } = props;
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRoles = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/roles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch roles");
        return;
      }

      const data = await response.json();
      const rolesArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setRoles(rolesArray);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching roles");
    }
  };

  useEffect(() => {
    fetchRoles();
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
      {roles.map((role) => (
        <>
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        </>
      ))}
    </select>
  );
}
