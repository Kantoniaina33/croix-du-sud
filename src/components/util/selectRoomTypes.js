import { useEffect, useState } from "react";

export default function SelectRoomTypes(props) {
  const { disabledOption, name, value, onChange } = props;
  const [room_types, setRoom_types] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRoom_types = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/room_types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch room_types");
        return;
      }

      const data = await response.json();
      setRoom_types(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching room_types");
    }
  };

  useEffect(() => {
    fetchRoom_types();
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
      {room_types.map((room_type, index) => (
        <option key={index} value={room_type.room_type}>
          {room_type.room_type}
        </option>
      ))}
    </select>
  );
}
