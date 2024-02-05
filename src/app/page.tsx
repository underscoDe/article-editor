"use client";

import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ArticleEditor from "./ArticleEditor";

export default function Home() {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };

  return (
    <section className="container mx-auto p-5">
      <ArticleEditor
        value={editorContent}
        onChange={handleEditorChange}
        placeholder="Contenu de l'article..."
      />
    </section>
  );
}
