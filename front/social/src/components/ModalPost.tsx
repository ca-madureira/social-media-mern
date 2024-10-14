import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoCloseSharp } from 'react-icons/io5';
import { useCreatePostMutation } from '../redux/post/postApi';

interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const ModalPost: React.FC<ModalProps> = ({ openModal, setOpenModal }) => {
  const [content, setContent] = useState<string>('');
  const [charCount, setCharCount] = useState(0);
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const MAX_CARACTERES = 250;

  // Função para lidar com a mudança de conteúdo no ReactQuill
  const handleContentChange = (value: string) => {
    // Verifica o comprimento do conteúdo e impede que ultrapasse o limite
    if (value.length <= MAX_CARACTERES) {
      setContent(value);
      setCharCount(value.length); // Atualiza o contador de caracteres
    } else {
      // Se exceder, corta o conteúdo para o tamanho máximo
      setContent(value.substring(0, MAX_CARACTERES));
      setCharCount(MAX_CARACTERES); // Garantir que o contador de caracteres não passe o limite
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ color: [] }],
      // ['link', 'image'],
    ],
  };

  const handleSubmit = async () => {
    try {
      await createPost({ content }).unwrap(); // Desempacotando a resposta para lidar com erros
      setOpenModal(false); // Fechar modal após criação do post
      setContent(''); // Limpar o conteúdo
      setCharCount(0); // Resetar contador de caracteres
    } catch (err) {
      console.error('Erro ao criar post:', err);
    }
  };

  return (
    <div className="flex items-center justify-center fixed bg-purple-300 bg-opacity-65 z-40 w-screen h-screen top-0 ">
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
        <div className="flex justify-between mt-4 items-center">
          <p className="text-gray-600 text-sm">
            {charCount}/{MAX_CARACTERES} caracteres
          </p>
          <button
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleSubmit}
            disabled={isLoading || content.length === 0}
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

export default ModalPost;
