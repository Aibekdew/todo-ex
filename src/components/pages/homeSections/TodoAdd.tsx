"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoAdd.module.scss";
import axios from "axios";
import { useEditTodoMutation, usePostTodoMutation } from "@/redux/api/todo";
import { useUploadMutation } from "@/redux/api/upload";

const TodoAdd = () => {
  const [postTodo] = usePostTodoMutation();
  const [uploadFiileMutation] = useUploadMutation();
  const [editTodo] = useEditTodoMutation();
  const { register, handleSubmit, reset } = useForm<Todo>();

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    const file = data.file?.[0];
    if (!file) throw new Error("File is required");
    const formData = new FormData();
    formData.append("file", file);

    const { data: upfile } = await uploadFiileMutation(formData);
    const newData = { title: data.title, img: upfile?.url };
    await postTodo(newData).unwrap();
    reset();
  };
  return (
    <section className={scss.TodoAdd}>
      <div className="container">
        <div className={scss.content}>
          <h3>TodoAdd</h3>
          <form className={scss.input} onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
            />
            <input type="file" {...register("file", { required: true })} />
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TodoAdd;
