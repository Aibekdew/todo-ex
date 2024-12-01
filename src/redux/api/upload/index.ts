import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    upload: build.mutation<UPLOAD.UploadFileResponse, UPLOAD.UploadFileRequest>(
      {
        query: (data) => ({
          url: `/upload/file`,
          method: "POST",
          body: data,
        }),
      }
    ),
  }),
});

export const { useUploadMutation } = api;
