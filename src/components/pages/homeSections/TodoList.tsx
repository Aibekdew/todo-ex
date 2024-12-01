"use client";
import {
  useEditTodoMutation,
  useGetTodosQuery,
  useRemoveTodoMutation,
} from "@/redux/api/todo";
import scss from "./TodoList.module.scss";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { register } from "module";

interface ITodo {
  _id?: number | null;
  img: string;
  title: string;
}
const TodoList = () => {
  const { reset } = useForm<ITodo>();
  const [isEdit, setIdEdit] = useState<ITodo>({
    _id: null,
    img: "",
    title: "",
  });
  const { data } = useGetTodosQuery();
  const [removeTodo] = useRemoveTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const updateTodo = async (e: FormEvent) => {
    e.preventDefault();
    const editPro = {
      title: isEdit.title,
      img: isEdit.img,
    };
    try {
      await editTodo({
        data: editPro,
        id: Number(isEdit._id),
      });
      setIdEdit({
        img: "",
        title: "",
        _id: null,
      });
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };

  return (
    <section className={scss.TodoList}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.product}>
            {data?.map((item) => (
              <div className={scss.block} key={item._id}>
                <img src={item.img} alt="img" width={200} />
                <h4>{item.title}</h4>
                <div className={scss.btn}>
                  <button onClick={() => removeTodo(item._id!)}>Delete</button>
                  <button
                    onClick={() => {
                      setIdEdit({
                        _id: item._id,
                        img: item.img!,
                        title: item.title,
                      });
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          {isEdit._id && (
            <form>
              <input
                onChange={(e) => setIdEdit({ ...isEdit, img: e.target.value })}
                defaultValue={isEdit.img}
                type="text"
              />
              <input
                onChange={(e) =>
                  setIdEdit({ ...isEdit, title: e.target.value })
                }
                defaultValue={isEdit.title}
                type="text"
                placeholder="Title"
              />
              <button onClick={updateTodo}>Edit Priduct</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
