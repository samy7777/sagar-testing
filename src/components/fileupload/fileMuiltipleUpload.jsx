import { MdDeleteForever } from "react-icons/md";
import { AiFillFilePdf } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import api from "../../auth/api";
// import Backdrop from "../backdrop";
import { Input } from "../ui/input";
import Loader from "../loader/loader";

function FileMultiUpload({ setFieldValue, name, values, disabled, ...rest }) {
  const maxSize = 10 * 1024 * 1024;
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState(values || []);

  useEffect(() => {
    if (values?.length > 0 && initialLoad) {
      setUploadedFiles(values);
      setInitialLoad(false);
    }
  }, [values]);

  const handleFileChange = (files) => {
    const selectedFile = files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = async (file) => {
    if (file.size > maxSize) {
      setError(`File size should not exceed ${maxSize / (1024 * 1024)}MB`);
    } else {
      setError(null);
      const formData = new FormData();
      formData.append("image", file); // still "image" in backend
      setLoader(true);
      try {
        const res = await api.post("/file/upload", formData);
        if (res?.data?.status === 200) {
          const updatedFiles = [...uploadedFiles, res.data.data];
          setUploadedFiles(updatedFiles);
          setFieldValue(name, updatedFiles);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Error uploading file. Please try again.");
      } finally {
        setLoader(false);
      }
    }
  };

  const deleteFile = async (fileToDelete) => {
    try {
      if (fileToDelete.public_id) {
        setLoader(true);
        const res = await api.delete("/file/remove", {
          data: { public_id: fileToDelete.public_id },
        });
        if (res?.data?.status === 200) {
          const updatedFiles = uploadedFiles.filter(
            (file) => file.public_id !== fileToDelete.public_id
          );
          setUploadedFiles(updatedFiles);
          setFieldValue(name, updatedFiles);
        }
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Error deleting file. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const isPdf = (url) => url === "pdf";

  return (
    <div>
      {loader && <Loader />}

      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {uploadedFiles.map((file, index) => (
            <div
            key={index}
            className="relative rounded-md w-24 flex flex-col items-center"
            >
              {console.log()}
              {file?.format === "pdf" ? (
                <a
                  href={file.secure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-red-500 text-sm"
                >
                  <AiFillFilePdf size={48} />
                  <span>PDF</span>
                </a>
              ) : (
                <img
                  src={file.secure_url}
                  alt={`Uploaded ${index}`}
                  className="w-20 h-auto rounded-md"
                />
              )}

              <button
                type="button"
                onClick={() => deleteFile(file)}
                className="absolute -top-2 -right-2 bg-white rounded-full"
                disabled={disabled}
              >
                <MdDeleteForever className="text-xl text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <label htmlFor={name} className="flex flex-col cursor-pointer">
          <div className="flex flex-col items-center font-bold bg-white text-black gap-6 rounded-xl border-2 border-dashed border-[#dce0e5] px-6 py-14">
            Upload Image or PDF
          </div>
        </label>
        <Input
          id={name}
          type="file"
          className="invisible w-0"
          disabled={disabled}
          accept="image/*,application/pdf"
          {...rest}
          onChange={(e) => handleFileChange(e.target.files)}
        />
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default FileMultiUpload;
