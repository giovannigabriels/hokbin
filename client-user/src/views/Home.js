import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";

export default function Home() {
  let [items, setItems] = useState([]);

  useEffect(() => {
    //fetch data
    fetch("http://localhost:3001/items")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        {
          //looping data
          items.map((data) => {
            return (
              <ItemCard
                item={data}
                key={data.id}
              />
            );
          })
        }
      </div>
    </div>
  );
}
