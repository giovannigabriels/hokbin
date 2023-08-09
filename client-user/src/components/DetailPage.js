import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItem } from "../store/actions/itemActions";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    ingredients: [],
    author: ""
  });
  useEffect(() => {
    //fetch data
    dispatch(fetchOneItem(id))
      .then((data) => {
        setInput({
          name: data.name,
          description: data.description,
          price: data.price,
          imgUrl: data.imgUrl,
          ingredients: data.Ingredients,
          author: data.User.username
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(()=>{
        setLoading(false);
      })
  }, []);
  return (
    <div>
      <div className="bg-yellow-500">
        <p className="  font-bold text-2xl text-white text-center">
          {input.name}
        </p>
      </div>
      <div className="mx-96 my-10">
        {
          loading === false ? (        
          <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className=" ml-5">
            <img
              src={input.imgUrl}
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title  text-red-600 font-semibold">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(input.price)}
            </h2>
            <span>Description : {input.description}</span>
            <span>Ingredients :</span>
            <ul>
              {input.ingredients.map((el) => {
                return <li>{el.name}</li>;
              })}
            </ul>
            <div className="card-actions justify-end">
              <Link
                to={"/menu"}
                className="btn btn-primary">
                Back to Menu
              </Link>
            </div>
            <h2 className=" font-bold">Author : {input.author}</h2>
          </div>
        </div>) : (
        <progress className="progress w-96"></progress>
        )
        }
      </div>
    </div>
  );
}
