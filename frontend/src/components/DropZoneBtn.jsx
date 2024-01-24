import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { person, camera, close } from "../assets";
function DropZoneBtn({ onFileSelected }) {
  const [file, setFile] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]));
      onFileSelected(acceptedFiles[0]);
    },
    [onFileSelected]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
  });
  const handleFileClose = (event) => {
    event.stopPropagation();
    setFile(null);
  };

  useEffect(() => {
    if (!file) {
      onFileSelected(null);
    }
  }, [file, onFileSelected]);

  return (
    <div {...getRootProps()} className="w-fit mx-auto mt-20 rounded-full">
      <input {...getInputProps()} />
      {file ? (
        <div className="relative rounded-full border-2 border-white w-[180px] p-[1px] h-[180px] overflow-hidden flex items-center justify-center">
          <img
            src={file}
            alt="file"
            className="w-full h-full bg-black opacity-70"
          />
          <div className="absolute flex justify-around w-full px-8">
            <img
              src={camera}
              alt="camera"
              className="w-10 bg-black bg-opacity-50 h-10 rounded-full p-2 hover:cursor-pointer hover:bg-opacity-40"
            />
            <img
              src={close}
              alt="camera"
              className="w-10 bg-black bg-opacity-50 h-10 rounded-full p-2 hover:cursor-pointer hover:bg-opacity-40"
              onClick={handleFileClose}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <img
            src={person}
            alt="person"
            className="rounded-full border-2 border-white w-[180px] p-[1px] h-[180px] select-none pointer-events-none bg-black opacity-60"
          />
          <img
            src={camera}
            alt="camera"
            className="w-10 bg-black bg-opacity-50 absolute h-10 rounded-full p-2 hover:cursor-pointer hover:bg-opacity-25"
          />
        </div>
      )}
    </div>
  );
}

export default DropZoneBtn;
