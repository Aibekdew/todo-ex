import { api as index } from "..";
const url = `/7274598245953d9118d47563a3db2d68/exampro`;
const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<TODO.GetResponse, TODO.GetRequest>({
      query: () => ({
        url: url,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: build.mutation<TODO.PostResponse, TODO.PostRequest>({
      query: (newData) => ({
        url: url,
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["todo"],
    }),
    removeTodo: build.mutation<TODO.RemoveResponse, number>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: build.mutation<TODO.editResponse, TODO.editRequest>({
      query: ({ data, id }) => ({
        url: `${url}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useRemoveTodoMutation,
  useEditTodoMutation,
} = api;
