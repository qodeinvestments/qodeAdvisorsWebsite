// FileUpload.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

function FileUpload({ onColumnsUpdate, onFileSelect }) {
  // Add onFileSelect prop
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    // Function to revert changes
    const revertChanges = async () => {
      try {
        await axios.post(`${API_URL}/revert_changes`);
      } catch (error) {
        setError(error);
      }
    };

    // Add event listener for page unload
    window.addEventListener("beforeunload", revertChanges);

    // Cleanup function
    return () => {
      window.removeEventListener("beforeunload", revertChanges);
      revertChanges(); // Revert changes when component unmounts
    };
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (onFileSelect) {
      onFileSelect(selectedFile); // Pass the file to the parent component
    }
  };

  // Handle file upload
  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      message.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/upload_excel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const columns = response.data.columns; // Assuming backend returns { columns: [...] }
      onColumnsUpdate(columns); // Pass columns to the parent component
      message.success("File uploaded successfully!");
    } catch (error) {
      // Extract error message from server response
      const errorMessage =
        error.response?.data?.message ||
        "Failed to upload file. Please try again.";
      console.error("Error uploading file:", error);
      message.error(errorMessage); // Display the error message from server
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto my-6">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleFileUpload}
        className={`mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300 ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}

export default FileUpload;
