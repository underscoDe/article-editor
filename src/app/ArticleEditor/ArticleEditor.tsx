import dynamic from "next/dynamic";
import { DeltaStatic, Sources } from "quill";
import { useMemo, useState } from "react";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

function ArticleEditor() {
  const [editorContent, setEditorContent] = useState("");
  const [textFromEditorContent, setTextFromEditorContent] = useState("");

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const handleEditorChange = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    setEditorContent(value);
    setTextFromEditorContent(editor.getHTML());
  };

  return (
    <ReactQuill
      className="h-full w-full max-w-full"
      theme="snow"
      modules={modules}
      value={editorContent}
      onChange={handleEditorChange}
      placeholder="<p>Contenu de l'article...</p>"
    />
  );
}

export default ArticleEditor;
