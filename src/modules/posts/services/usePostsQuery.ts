import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "../../../config/api";
import { QueryKeys } from "../types";

const usePostsQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.posts],
    queryFn: async () => {
      const { data }: AxiosResponse<Post[]> = await api.get("/posts");
      return data;
    },
  });
};

export default usePostsQuery;
