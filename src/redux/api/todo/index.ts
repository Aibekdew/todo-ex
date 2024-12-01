import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getTodos: build.query<TODO.GetResponse, TODO.GetRequest>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['todo']
		}),
		postTodo: build.mutation<TODO.PostResponse, TODO.PostRequest>({
			query: (newData) => ({
				url: '',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['todo']
		}),
		removeTodo: build.mutation<TODO.RemoveResponse, number>({
			query: (id) => ({
				url: `/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['todo']
		})
	})
});

export const { useGetTodosQuery, usePostTodoMutation, useRemoveTodoMutation } =
	api;
