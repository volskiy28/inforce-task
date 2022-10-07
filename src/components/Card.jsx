import { useDispatch } from "react-redux";
import { deleteItem } from "../Redux/shopSlice";

export const Card = ({ id, name, imgUrl }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col mx-auto mb-24 flex-wrap justify-center font-light p-[16px] shadow-md ease-in-out delay-150 w-[360px] h-[400px]">
      <img
        src={imgUrl}
        className="object-contain w-[354px] h-[330px]"
        alt="card_img"
      />
      <div>
        <h4>{name}</h4>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm("Delete item?")) {
            dispatch(deleteItem(id));
          }
        }}
        className="absolute mb-[300px] hover:bg-gray-400 rounded-xl p-2"
      >
        Delete
      </button>
    </div>
  );
};
