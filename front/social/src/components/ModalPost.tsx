import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCloseSharp } from "react-icons/io5";
import { useCreatePostMutation } from "../redux/post/postApi";
import { ModalProps } from "../interfaces";

const ModalPost: React.FC<ModalProps> = ({ openModal, setOpenModal }) => {
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const MAX_CARACTERES = 250;

  const handleContentChange = (value: string) => {
    if (value.length <= MAX_CARACTERES) {
      setContent(value);
      setCharCount(value.length);
    } else {
      setContent(value.substring(0, MAX_CARACTERES));
      setCharCount(MAX_CARACTERES);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ color: [] }],
    ],
  };

  const handleSubmit = async () => {
    try {
      await createPost(content).unwrap();
      setOpenModal(false);
      setContent("");
      setCharCount(0);
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  };

  return (
    <dialog
      open={openModal}
      className="flex items-center justify-center fixed bg-purple-300 bg-opacity-65 z-40 w-screen h-screen top-0"
    >
      <article className="border w-[650px] p-2 rounded-md bg-white relative">
        <header className="flex items-center justify-between relative bg-purple-400 p-4 rounded-md">
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold">
            Criar Post
          </h2>
          <IoCloseSharp
            className="text-white cursor-pointer ml-auto"
            onClick={() => setOpenModal(false)}
          />
        </header>
        <main className="mt-4">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            placeholder="Comece a digitar..."
          />
        </main>
        <footer className="flex justify-between mt-4 items-center">
          <p className="text-gray-600 text-sm">
            {charCount}/{MAX_CARACTERES} caracteres
          </p>
          <button
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleSubmit}
            disabled={isLoading || content.length === 0}
          >
            {isLoading ? "Publicando..." : "Publicar"}
          </button>
        </footer>
        {error && (
          <section className="text-red-500 text-center mt-4">
            Ocorreu um erro ao criar o post.
          </section>
        )}
      </article>
    </dialog>
  );
};

export default ModalPost;
