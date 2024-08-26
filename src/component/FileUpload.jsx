import React from 'react';
import { notification, Upload } from 'antd';
import axios from 'axios';
// import { UploadOutlined } from '@ant-design/icons';
import { getMaps } from '../services/manageService';
const API_URL = process.env.APP_API_URL || 'http://localhost:5500/api';
const FileUpload = () => {
  const handleChange = async (info) => {
    if (info.file.status === 'done') {
      console.log('File uploaded successfully:', info.file.response.filePath);
    }
  };

  const customRequest = async ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/manage/maps`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        getMaps(); // Refresh the maps list after successful upload
        onSuccess(response.data); // Call onSuccess with the response data
    } catch (error) {
        console.error('Error uploading file:', error);
        notification.error({
          message: "File upload failed.",
          description: error.response.data.message || "Please try again."
        });
    }
  };

  return (
    <Upload customRequest={customRequest} onChange={handleChange}>
        <div className="relative w-full">
            <div
                className="relative z-40 cursor-pointer transition-all duration-500 bg-[#ffffff] flex items-center justify-center h-32 w-32 mx-auto rounded-xl hover:bg-[#d19e9e] border border-transparent hover:border-red-600 hover:border-dashed"
            >
                <svg
                  className="h-6 w-6 text-black"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 9l5 -5l5 5"></path>
                <path d="M12 4l0 12"></path>
                </svg>
            </div>
        </div>
    </Upload>
  );
};

export default FileUpload;
