import { useState } from "react";

const UploadModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleUpload = () => {
    if (!file) return alert("Select file");

    console.log("FILE 👉", file);

    // 👉 later API call
    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h3>Upload File</h3>

        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="modal-actions">
          <button onClick={handleUpload}>Upload</button>
          <button onClick={onClose}>Cancel</button>
        </div>

      </div>

    </div>
  );
};

export default UploadModal;