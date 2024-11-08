import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";

const TextEditor = ({ value, onChange }) => {
  return (
    <div>
      <ReactQuill value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
