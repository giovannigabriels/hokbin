import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMenuItem, menuItemFetch } from "../store/actions/itemActions";
import ItemCard from "./ItemCard";

export default function Menu() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.itemReducer);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  const handleGoToDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  useEffect(() => {
    //fetch data
    dispatch(fetchMenuItem()).finally(()=>{
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <div>
        <p className="font-semibold text-3xl text-center text-white bg-yellow-400 p-5">
          MENU
        </p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {loading === false ?(
            //looping data
            items.map((data) => {
              return (
                <ItemCard
                  handleGoToDetail={handleGoToDetail}
                  item={data}
                  key={data.id}
                />
              );
            })) : (
              <progress className="progress w-96"></progress>
            )
          }
        </div>
      </div>
    </div>
  );
}
