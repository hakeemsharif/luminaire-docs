export async function uploadDocument(file, cloudName, presetKey) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
  
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to upload file to Cloudinary");
    }
    const data = await response.json();
    return data.secure_url;
  }
  
  export async function addDocument(payload) {
    const response = await fetch("http://localhost:5555/document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add document");
    }
  }
  