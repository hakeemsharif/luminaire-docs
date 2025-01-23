import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useDocumentUpdate(id, url, redirectPath) {
    const navigate = useNavigate();
    const [documentSelected, setDocumentSelected] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
 
    async function uploadDocument(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_PRESET_KEY);
 
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
 
        if (!response.ok) {
          throw new Error("Failed to upload file to Cloudinary");
        }
 
        const data = await response.json();
        return data.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
      }
    }
 
    async function submitData(data) {
      try {
        setIsUpdating(true);
        
        // Prepare the payload with existing data
        let payload = { ...data };

        // Only upload and update file if a new file is selected
        if (documentSelected) {
          const uploadedFileUrl = await uploadDocument(documentSelected);
          payload.file = uploadedFileUrl;
        }
 
        const response = await fetch(`${url}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
 
        if (response.ok) {
            setIsUpdating(false);
            navigate(redirectPath);
        } else {
            alert("Failed to update document");
        }
      } catch (error) {
        console.error("Error updating document:", error);
        setIsUpdating(false);
      }
    }

    return {
        documentSelected,
        setDocumentSelected,
        submitData,
        isUpdating,
    };
}