import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCloseSharp } from 'react-icons/io5';
import { useCreatePostMutation } from '../redux/post/postApi';

interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ openModal, setOpenModal }) => {
  const [content, setContent] = useState<string>('');
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ color: [] }],
      ['link', 'image'],
    ],
  };

  const handleSubmit = async () => {
    try {
      await createPost({ content }).unwrap(); // Desempacotando a resposta para lidar com erros
      setOpenModal(false); // Fechar modal após criação do post
      setContent(''); // Limpar o conteúdo
    } catch (err) {
      console.error('Erro ao criar post:', err);
    }
  };

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 bg-slate-300  z-40 w-full h-full">
      <div className="border w-[650px] p-2 rounded-md bg-white relative">
        <div className="flex items-center justify-between relative bg-purple-400 p-4 rounded-md">
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-white font-bold">
            Criar Post
          </h2>
          <IoCloseSharp
            className="text-white cursor-pointer ml-auto"
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className="mt-4">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            placeholder="Comece a digitar..."
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-center mt-4">
            Ocorreu um erro ao criar o post.
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
