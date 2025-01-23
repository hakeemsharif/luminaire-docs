import { useQueryClient } from "@tanstack/react-query";


export default function useDocumentDelete(_id, url, queryKey) {
    const queryClient = useQueryClient();

    async function deleteDocument(id) {
        try {
          // setIsLoading(true);
          // setLoading(documentId);
          await new Promise((resolve) => setTimeout(resolve, 5000));
    
          const response = await fetch(
            `${url}/${id}`,
            { method: "DELETE", }
          );
    
          if (response.ok) {
            queryClient.invalidateQueries(queryKey);
          } else {
            alert("Error deleting.");
          }
        } catch (error) {
          console.error("Error deleting:", error);
        }
      }

  return {deleteDocument}
}
