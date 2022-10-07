import { Link } from "react-router-dom";
import logo from "../assets/a-logo.svg";
import { useDispatch } from "react-redux";
import { setOpen, sortBy, sortByName } from "../Redux/shopSlice";
import { useState } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpe] = useState(false);
  const [sorted, setSorted] = useState("Sort by name");
  return (
    <div className="w-full bg-black h-[100px] mb-10">
      <div className="max-w-[1240px] mx-auto flex flex-row items-center justify-between">
        <div onClick={() => setOpe(!open)} className="text-white">
          {open ? "" : sorted}
          <li
            className={open ? "text-white outline-none " : "hidden"}
            onClick={(e) => {
              setSorted(e.target.innerText);
              dispatch(sortBy());
            }}
          >
            Sort by count
          </li>
          <li
            className={open ? "text-white" : "hidden"}
            onClick={(e) => {
              dispatch(sortByName());
              setSorted(e.target.innerText);
            }}
          >
            Sort by name
          </li>
        </div>
        <div className="flex  pt-5">
          <Link to="/">
            <img className="w-[60px]" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="pt-5">
          <button
            onClick={() => dispatch(setOpen())}
            className="text-white bg-green-500 p-2 rounded-full hover:bg-green-700 hover:animate-pulse"
          >
            Add product
          </button>
        </div>
      </div>
    </div>
  );
};
