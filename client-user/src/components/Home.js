import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecomendItem } from "../store/actions/itemActions";
import ItemCard from "./ItemCard";
import Carousel from "./Carousel";

export default function Home() {
  const dispatch = useDispatch();
  const { recomends } = useSelector((state) => state.itemReducer);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  const handleGoToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    dispatch(fetchRecomendItem()).finally(()=>{
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div>
        <Carousel />
      </div>
      <div className="mt-5">
        <p className="font-semibold text-2xl text-center text-red-700">
          RECOMMENDATION
        </p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {loading === false ? (
            //looping data
            recomends.map((data) => {
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

      <div className="bg-yellow-500 p-7">
        <img
          className=" mx-auto"
          src="https://www.hokben.co.id/assets/img/img_banner_2_6.png"
          style={{
            width: "50px",
            height: "50px",
          }}
        />
        <p className=" text-2xl text-black font-bold  text-center font-sans">
          We Make Sure
        </p>
        <p className=" text-4xl text-red-700 font-bold text-center font-sans">
          Products will be delivered on time
        </p>
        <p className=" text-l text-black font-bold text-center font-sans">
          If you’re having a meeting, working late at night and need an extra
          push.
        </p>
        <p className=" text-l text-black  font-bold text-center font-sans">
          Let us know and we will be there
        </p>
        <div className="flex flex-row  justify-center mt-3">
          <button className="btn   bg-red-700 text-white">Order Now</button>
          <h1 className="  font-bold mx-5 my-2">OR</h1>
          <img
            className="my-2"
            src="https://www.hokben.co.id/assets/img/hokben_505.png"
            style={{
              width: "150px",
              height: "35px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
