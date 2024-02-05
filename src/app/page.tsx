"use client";

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
    // toggle to add extra line breaks when pasting HTML:
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

export default function Home() {
  const [editorContent, setEditorContent] = useState("");
  const [textFromEditorContent, setTextFromEditorContent] = useState("");

  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
      }),
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
    <section className="container mx-auto p-5">
      <ReactQuill
        className="h-full w-full max-w-full"
        theme="snow"
        modules={modules}
        formats={formats}
        value={editorContent}
        onChange={handleEditorChange}
        placeholder="Contenu de l'article..."
      />
    </section>
  );
}
