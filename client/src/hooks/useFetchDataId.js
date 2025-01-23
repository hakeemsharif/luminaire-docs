import { useQuery } from "@tanstack/react-query";


export default function useFetchDataId(id, url, queryKey) {
    const { isPending, isError, error, data } = useQuery({
        queryKey: [queryKey, id],
        queryFn: async () =>
          fetch(`${url}/${id}`).then((response) =>
            response.json()
          ),
      });
    
      return { isPending, isError, error, data };
    }