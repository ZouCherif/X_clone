import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
function DropZoneBtn({ onFileSelected }) {
  const [file, setFile] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]));
      onFileSelected(acceptedFiles[0]);
    },
    [onFileSelected]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {file ? (
        <img
          src={file}
          alt="file"
          className="border border-white w-[200px] h-[200px]"
        />
      ) : (
        <div>hello</div>
      )}
    </div>
  );
}

export default DropZoneBtn;
