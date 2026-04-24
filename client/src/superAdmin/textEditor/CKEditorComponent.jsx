import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";

const CKEditorComponent = ({ onChange, value }) => {
  const [editorContent, setEditorContent] = useState(value || "");

  useEffect(() => {
    setEditorContent(value || "");
  }, [value]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <div>
      {/* <h3>CKEditor Example</h3> */}
      <CKEditor
        editor={ClassicEditor}
        data={editorContent}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "insertTable",
            "imageUpload",
            "undo",
            "redo",
          ],
        }}
        onChange={handleEditorChange}
        onReady={(editor) => {
          console.log("Editor is ready:", editor);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
