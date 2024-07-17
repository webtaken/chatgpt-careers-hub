"use client";

import Link from "@tiptap/extension-link";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorControls from "./EditorControls";
import "./styles.css";
import { UseFormSetValue } from "react-hook-form";

interface EditorProps {
  content?: Content;
  setValue: UseFormSetValue<{
    companyName: string;
    title: string;
    description: string;
    applyURL: string;
    applyEmail: string;
    companyEmail: string;
    remote?: boolean | undefined;
    applyByEmail?: boolean | undefined;
    pinOnTop?: boolean | undefined;
  }>;
}

export default function Editor({ content, setValue }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Link.configure({
        protocols: ["mailto"],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-w-full prose-sm hover:prose-a:cursor-pointer h-72 md:h-80 lg:h-96 overflow-auto p-1",
      },
    },
    content: content,
    onBlur: ({ editor }) => {
      if (editor.getText() !== "") {
        setValue("description", editor.getHTML());
      } else {
        setValue("description", "");
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorControls editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
