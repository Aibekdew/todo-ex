'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import scss from './TodoAdd.module.scss';
import axios from 'axios';
import { usePostTodoMutation } from '@/redux/api/todo';

const TodoAdd = () => {
	const [postTodo] = usePostTodoMutation();
	const { register, handleSubmit } = useForm<UploadFileTodo>();

	const onSubmit: SubmitHandler<UploadFileTodo> = async (data) => {
		const file = data.files[0];
		const formData = new FormData();
		formData.append('file', file);

		const { data: uploadImg } = await axios.post(
			`${process.env.NEXT_PUBLIC_UPLOAD_URL}/upload/file`,
			formData
		);
		const newData = {
			title: data.title,
			isCompleted: false,
			img: uploadImg.url
		};

		await postTodo(newData);
	};
	return (
		<section className={scss.TodoAdd}>
			<div className="container">
				<div className={scss.content}>
					<h3>TodoAdd</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							placeholder="title"
							{...register('title', { required: true })}
						/>
						<input type="file" {...register('files', { required: true })} />
						<button type="submit">Отправить</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default TodoAdd;
