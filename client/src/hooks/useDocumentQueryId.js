import { useQuery } from "@tanstack/react-query";

// OG CODE
// export default function useDocumentQueryID(id) {
//   const { isPending, isError, error, data } = useQuery({
//     queryKey: ["document", id],
//     queryFn: async () =>
//       fetch(`${import.meta.env.VITE_URL}/document/${id}`).then((response) =>
//         response.json()
//       ),
//   });

//   return { isPending, isError, error, data };
// }

// AI ASSIST BASE ONE "OG CODE"
export default function useDocumentQueryId(id) {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/document/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();

    },
    retry: 2, // Disable retries for debugging
  });

  return { isPending, isError, error, data };
}