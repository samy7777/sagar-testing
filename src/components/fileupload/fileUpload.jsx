import { MdDeleteForever } from "react-icons/md";
import { AiFillFilePdf } from "react-icons/ai";
import React, { useEffect, useState } from "react";
// import Backdrop from "../backdrop";
import { Input } from "../ui/input";
import api from "@/auth/api";
import Loader from "../loader/loader";

function FileUpload({ setFieldValue, name, values, disabled, ...rest }) {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const [fileUrl, setFileUrl] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [fileType, setFileType] = useState(null); // image or pdf
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const val = values;
    if (initialLoad && values?.url) {
      setInitialLoad(false);
      setFileUrl(val?.url || null);
      setPublicId(val?.public_id || null);
      if (val?.format === "pdf") {
        setFileType("pdf");
      } else if (val?.url) {
        setFileType("image");
      }
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
      resetFile();
    } else {
      setError(null);
      const formData = new FormData();
      formData.append("image", file); // still using 'image' key in API

      setLoader(true);
      try {
        const res = await api.post("/file/upload", formData);
        if (res?.data?.status === 200) {
          const url = res.data.data;
          setLoader(false);
          setFieldValue(name, url);
          setFileUrl(url.secure_url);
          setPublicId(url.public_id);
          setFileType(url.format);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoader(false);
        setError("Error uploading file. Please try again.");
        resetFile();
      }
    }
  };

  const resetFile = () => {
    setFileUrl(null);
    setPublicId(null);
    setFieldValue(name, null);
  };

  const deleteFile = async () => {
    if (!publicId) return;
    setLoader(true);
    try {
      const res = await api.delete("/file/remove", {
        data: { public_id: publicId },
      });
      if (res?.data?.status === 200) {
        resetFile();
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Error deleting file. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      {loader && <Loader />}
      {fileUrl ? (
        <div className="flex gap-10 mt-4 items-center relative w-fit">
          {fileType === "pdf" ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 flex items-center gap-2"
            >
              <AiFillFilePdf size={48} />
              <span className="underline text-sm">View PDF</span>
            </a>
          ) : (
            <img
              src={fileUrl}
              alt="Uploaded File"
              className="w-20 h-auto rounded-md"
            />
          )}

          <button
            type="button"
            onClick={deleteFile}
            className="w-fit absolute -top-2 -right-2 p-1 bg-white rounded-full"
            disabled={disabled}
          >
            <MdDeleteForever className="cursor-pointer text-xl text-red-500" />
          </button>
        </div>
      ) : (
        <>
          <label htmlFor={name} className="flex flex-col cursor-pointer">
            <div className="flex flex-col items-center bg-white font-bold text-black gap-6 rounded-xl border-2 border-dashed border-[#dce0e5] px-6 py-14">
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
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </>
      )}
    </div>
  );
}

export default FileUpload;
