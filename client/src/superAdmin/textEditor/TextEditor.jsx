import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const TextEditor = ({ value, onChange }) => {
  return (
    <div className="quill-dark">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
