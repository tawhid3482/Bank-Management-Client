import { baseApi } from "@/redux/baseApi";

const infoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userPersonalInfo: builder.query({
      query: () => ({
        url: "/info/me",
        method: "GET",
      }),
      providesTags: ["INFO"],
    }),
    createProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/info/create-info",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});

export const { useUserPersonalInfoQuery,useCreateProfileMutation } = infoApi;
