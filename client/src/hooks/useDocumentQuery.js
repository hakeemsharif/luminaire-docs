import { useQuery } from "@tanstack/react-query";

export default function useDocumentQuery() {

    const { isPending, error, data } = useQuery({
        queryKey: ["documents"],
        queryFn: async () =>
          fetch(`${import.meta.env.VITE_URL}/document/`).then((response) =>
            response.json()
          ),
      });

  return { isPending, error, data }
}
