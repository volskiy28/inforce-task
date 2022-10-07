import { Card } from "./Card";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, setOpen } from "../Redux/shopSlice";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(fetchItems());
  }, [data]);
  const items = useSelector((state) => state.shop.items);
  const open = useSelector((state) => state.shop.open);
  const [obj, setObj] = useState({
    id: Math.random(),
    name: "",
    brand: "",
    count: "",
    imgUrl: "",
    size: {
      width: "",
      height: "",
    },
    weight: "",
    description: "",
  });
  const createList = () => {
    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then(
      setObj({
        id: "",
        name: "",
        brand: "",
        count: "",
        imgUrl: "",
        size: {
          width: "",
          height: "",
        },
        weight: "",
        description: "",
      })
    );
  };
  return (
    <div>
      <div
        className={
          !open
            ? "hidden"
            : " w-full h-screen z-10 bg-gray-200 absolute flex flex-col justify-center items-center"
        }
      >
        <div className="w-[600px] h-[600px] gap-10 p-4">
          <div className="flex flex-row gap-10">
            <input
              className="rounded-full m-4 p-2"
              onChange={(e) => setObj({ ...obj, brand: e.target.value })}
              required
              value={obj.brand}
              placeholder="Brand"
            />
            <input
              className="rounded-full m-4 p-2"
              onChange={(e) => setObj({ ...obj, name: e.target.value })}
              required
              value={obj.name}
              placeholder="Name"
            />
          </div>
          <div className="flex flex-row gap-10">
            <input
              className="rounded-full m-4 p-2"
              onChange={(e) => setObj({ ...obj, count: e.target.value })}
              required
              value={obj.count}
              placeholder="Count"
            />
            <input
              className="rounded-full m-4 p-2"
              onChange={(e) => setObj({ ...obj, imgUrl: e.target.value })}
              required
              value={obj.imgUrl}
              placeholder="Image"
            />
          </div>
          <div className="flex flex-row gap-10">
            <input
              className="rounded-full m-4 p-2"
              onChange={(e) =>
                setObj({ ...obj, size: { ...obj.size, width: e.target.value } })
              }
              required
              value={obj.size.width}
              placeholder="Width"
            />
            <input
              className="rounded-full m-4 p-2"
              onChange={(e) =>
                setObj({
                  ...obj,
                  size: { ...obj.size, height: e.target.value },
                })
              }
              required
              value={obj.size.height}
              placeholder="Height"
            />
            <input
              className="rounded-full m-4 p-2"
              onChange={(e) => setObj({ ...obj, weight: e.target.value })}
              required
              value={obj.weight}
              placeholder="Weight"
            />
          </div>
          <input
            className="rounded-full m-4 p-2"
            onChange={(e) => setObj({ ...obj, description: e.target.value })}
            required
            value={obj.description}
            placeholder="Description"
          />
          <div className="flex justify-center items-center pt-12">
            <button
              className="bg-green-400 rounded-full p-2 mr-10"
              onClick={() => {
                createList();
                dispatch(setOpen());
              }}
            >
              Create object
            </button>
            <button
              className="bg-red-400 rounded-full p-2 mr-10"
              onClick={() => dispatch(setOpen())}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {items?.map((data) => (
            <Link key={data.id} to={`/products/${data.id}`}>
              <Card key={data.id} {...data} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
