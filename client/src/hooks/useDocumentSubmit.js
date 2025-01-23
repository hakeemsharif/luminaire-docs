import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useDocumentSubmit(url, redirectPath) {
  const navigate = useNavigate();
  const [documentSelected, setDocumentSelected] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
      setIsSaving(true);
      const uploadedFileUrl = await uploadDocument(documentSelected);

      const payload = {
        ...data,
        file: uploadedFileUrl,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      if (response.ok) {
        setIsSaving(false);
        navigate(redirectPath);
      } else {
        alert("Failed to add document");
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  return {
    documentSelected,
    setDocumentSelected,
    submitData,
    isSaving,
  };
}
