import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

const CKEditorComponent = () => {
  // State to hold the editor content
  const [content, setContent] = useState("");

  return (
    <div className="editor-container">
      {/* <h2>Content</h2> */}
      {/* <TextEditor /> */}
      <CKEditor
        editor={ClassicEditor}
        data={content} // Initial content if needed
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data); // Updates content when user edits
        }}
      />
      {/* Displaying content for demonstration */}
      <div className="editor-content">
        <h3>Output Content</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default CKEditorComponent;
