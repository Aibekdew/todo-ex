"use client";
import { useGetTodosQuery, useRemoveTodoMutation } from "@/redux/api/todo";
import scss from "./TodoList.module.scss";
import { useState } from "react";

interface ITodo {
  _id?: number | null;
  img: string;
  title: string;
}
const TodoList = () => {
  const [isEdit, setIdEdit] = useState<ITodo>({
    _id: null,
    img: "",
    title: "",
  });
  const { data } = useGetTodosQuery();
  const [removeTodo] = useRemoveTodoMutation();
  return (
    <section className={scss.TodoList}>
      <div className="container">
        <div className={scss.content}>
          <h3>TodoList</h3>
          {!isEdit._id ? (
            <div>
              {data?.map((item) => (
                <div key={item._id}>
                  <img src={item.img} alt="img" width={200} />
                  <h4>{item.title}</h4>
                  <button onClick={() => removeTodo(item._id!)}>Delete</button>
                  <button
                    onClick={() => {
                      setIdEdit({
                        _id: item._id,
                        img: item.img,
                        title: item.title,
                      });
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <form>
              <input type="file" />
              <input type="text" placeholder="Title" />
              <button>Edit Priduct</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
