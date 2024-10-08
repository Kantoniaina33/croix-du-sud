import { useEffect, useState } from "react";

export default function SelectPriceCategories(props) {
  const {
    disabledOption,
    name,
    value,
    onChange,
    specificOption,
    specificOptionValue,
  } = props;
  const [price_Categories, setPrice_Categories] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPrice_Categories = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/price_Categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch price_Categories");
        return;
      }

      const data = await response.json();
      setPrice_Categories(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching price_Categories");
    }
  };

  useEffect(() => {
    fetchPrice_Categories();
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
      {price_Categories.map((price_category) => (
        <>
          <option value={price_category.price_category}>
            {price_category.price_category}
          </option>
        </>
      ))}
    </select>
  );
}
