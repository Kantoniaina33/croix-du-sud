import { useEffect, useState } from "react";

export default function SelectCities(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
  } = props;
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCities = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/cities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch cities");
        return;
      }

      const data = await response.json();
      const citiesArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setCities(citiesArray);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching cities");
    }
  };

  useEffect(() => {
    fetchCities();
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
          style={{ backgroundColor: "rgb(209, 209, 209)", color:"white" }}
        >
          {disabledOption}
        </option>
      )}
      {specificOption && (
        <option value={specificOptionValue}>{specificOption}</option>
      )}
      {cities.map((city) => (
        <>
          <option value={city.city}>{city.city}</option>
        </>
      ))}
    </select>
  );
}
