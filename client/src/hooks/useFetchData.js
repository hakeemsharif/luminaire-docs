import { useQuery } from "@tanstack/react-query";

export default function useFetchData(url, key) {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: async () =>
      fetch(url).then((response) =>
        response.json()
      ),
  });

return { isPending, error, data }
}

// import { useQuery } from "@tanstack/react-query";

// export default function useFetchData(url, key) {
//   const { isPending, error, data } = useQuery({
//     queryKey: [key],
//     queryFn: () => 
//       new Promise((resolve) => {
//         setTimeout(async () => {
//           const response = await fetch(url);
//           const data = await response.json();
//           resolve(data);
//         }, 5000);
//       })
//   });

//   return { isPending, error, data };
// }