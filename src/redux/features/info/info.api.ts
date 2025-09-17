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
    getAllInfo: builder.query({
      query: () => ({
        url: "/info",
        method: "GET",
      }),
      providesTags: ["INFO"],
    }),
    adminStats: builder.query({
      query: () => ({
        url: "/info/stats",
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
    updateProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/info/update-info",
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags:["INFO"]
    }),
    requestLoan: builder.mutation({
      query: (userInfo) => ({
        url: "/info/request-loan",
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["INFO"],
    }),
  }),
});

export const {
  useUserPersonalInfoQuery,
  useCreateProfileMutation,
  useRequestLoanMutation,
  useUpdateProfileMutation,
  useGetAllInfoQuery,
  useAdminStatsQuery
} = infoApi;
