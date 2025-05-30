// FileUpload.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Button from "../common/Button";
const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

function FileUpload({ onColumnsUpdate, onFileSelect }) {
  // Add onFileSelect prop
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // useEffect(() => {
  //   const clearUserData = async () => {
  //     try {
  //       await axios.post(`${API_URL}/clear_user_data`);
  //     } catch (error) {
  //       console.error("Error clearing user data:", error);
  //     }
  //   };

  //   window.addEventListener("beforeunload", clearUserData);

  //   return () => {
  //     window.removeEventListener("beforeunload", clearUserData);
  //     clearUserData();
  //   };
  // }, []);

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
        withCredentials: true, // This is important for maintaining session cookies
      });

      const columns = response.data.columns;
      onColumnsUpdate(columns);
      message.success("File uploaded successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to upload file. Please try again.";
      console.error("Error uploading file:", error);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white border border-brown mx-auto mb-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:flex-grow border-b sm:border-none border-brown">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-beige file:text-black hover:file:bg-lightBeige file:transition-colors file:duration-300"
          />
        </div>
        <div className="w-full sm:w-auto">
          <Button
            onClick={handleFileUpload}
            className={`w-full sm:w-auto bg-beige hover:bg-lightBeige text-black transition-colors duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
