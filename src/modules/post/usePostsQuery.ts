import { useQuery } from "@tanstack/react-query";
import api from "../../config/api";

const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get("/posts");
      return data;
    },
  });
};

export default usePostsQuery;
