import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const FullCard = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(true);
  const [comment, setComment] = useState({
    id: Math.random(1, 100),
    description: "",
    date: Date(),
    productId: id,
  });
  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateProduct = (data) => {
    fetch("http://localhost:8000/products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };
  const deleteComment = (com) => {
    let updatedState = {
      ...data,
      comments: data.comments.filter((item) => item.id !== com.id),
    };
    updateProduct(updatedState);
  };
  return (
    <div className="mx-auto max-w-[1240px] pt-10">
      <div className="flex flex-row justify-around">
        <div>
          <h3>
            <input
              className="outline-none"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              readOnly={edit}
            />
          </h3>
          <img
            src={data.imgUrl}
            alt={data.imgUrl}
            className="w-[350px] h-[350px] object-contain p-4"
          />
          <span>
            Products left:{" "}
            <input
              className="outline-none"
              value={data.count}
              readOnly={edit}
              onChange={(e) => setData({ ...data, count: e.target.value })}
            />
          </span>
        </div>
        <div className="flex flex-col gap-5">
          {edit ? (
            <button
              onClick={() => setEdit(!edit)}
              className="bg-green-400 p-2 rounded-full text-white"
            >
              Edit
            </button>
          ) : (
            <button
              className="bg-green-400 p-2 rounded-full text-white"
              onClick={() => {
                updateProduct(data);
                setEdit(!edit);
              }}
            >
              Save
            </button>
          )}
          <p>Description:</p>
          <h3>Product specify</h3>
          <p>
            Width:{" "}
            <input
              className="outline-none"
              value={data.size?.width}
              readOnly={edit}
              onChange={(e) =>
                setData({
                  ...data,
                  size: { ...data.size, width: e.target.value },
                })
              }
            />
          </p>
          <p>
            Height:{" "}
            <input
              className="outline-none"
              value={data.size?.height}
              readOnly={edit}
              onChange={(e) =>
                setData({
                  ...data,
                  size: { ...data.size, height: e.target.value },
                })
              }
            />
          </p>
          <p>
            Weight:{" "}
            <input
              className="outline-none"
              value={data.weight}
              readOnly={edit}
              onChange={(e) => setData({ ...data, weight: e.target.value })}
            />
          </p>
          <div>
            Comments:
            {data.comments?.map((c) => {
              return (
                <div key={c.id} className="w-[200px]">
                  <p>
                    {c.description}{" "}
                    <span
                      className="cursor-pointer bg-black p-1 text-white rounded-full ml-5"
                      onClick={() => {
                        deleteComment(c);
                      }}
                    >
                      delete
                    </span>
                  </p>

                  <p>{c.date}</p>
                </div>
              );
            })}
            <div className="flex flex-col">
              <input
                onChange={(e) => {
                  setComment({ ...comment, description: e.target.value });
                }}
                className="bg-gray-200 h-[60px] rounded-xl text-center"
                placeholder="Write your text here"
                value={comment.description}
              />
              <button
                onClick={() => {
                  data.comments.push(comment);
                  updateProduct(data);
                }}
                className="bg-black text-white p-2 mt-2 rounded-xl"
              >
                Add comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
