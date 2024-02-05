import dynamic from "next/dynamic";
import { DeltaStatic, Sources } from "quill";
import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

interface ArticleEditorProps {
  value: string;
  onChange: (value: string, delta: DeltaStatic, source: Sources) => void;
  placeholder?: string;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  value,
  onChange,
  placeholder = "Contenu de l'article...",
}) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
      }),
    []
  );

  const handleEditorChange = (
    editorValue: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    onChange(editorValue, delta, source);
  };

  return (
    <ReactQuill
      className="h-full w-full max-w-full"
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleEditorChange}
      placeholder={placeholder}
    />
  );
};

export default ArticleEditor;
