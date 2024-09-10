import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetUserPostsQuery,
  useDeletePostByIdMutation,
  useEditPostMutation,
} from '../redux/post/postApi'; // substitua com o caminho correto
import { FaRegHeart, FaRegEdit, FaRegCommentAlt } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { BiSolidSend } from 'react-icons/bi';
import calculateTimeAgo from '../utils/calculaTimeAgo';
import ReactQuill from 'react-quill';

const Post = () => {
  const userId = useSelector((state: any) => state.auth.user.id); // Obtém o userId do estado global
  const { data, isLoading, isError, refetch } = useGetUserPostsQuery({
    author: userId,
  });
  const [deletePostById] = useDeletePostByIdMutation();
  const [editPost] = useEditPostMutation();

  const [modeEdit, setModeEdit] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');

  console.log('conteudo de posts', typeof data);

  if (isLoading) {
    return <p>Carregando posts...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar posts.</p>;
  }

  const deletePost = async (id: string) => {
    await deletePostById(id);
    refetch();
  };

  const handleEdit = (postId: string, postContent: string) => {
    setModeEdit(postId); // Define o post em modo de edição
    setContent(postContent); // Carrega o conteúdo existente do post para edição
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleSaveEdit = async (id: string) => {
    await editPost({ id, content });
    setModeEdit(null);
    refetch();
  };

  return (
    <div className="m-auto mt-10 w-[600px] h-full">
      {data?.posts.map((post: any, index: any) => (
        <div key={index} className="border-2 p-2 mb-4">
          <div className="flex gap-2 justify-end">
            <FaRegHeart className="text-purple-500" />
            <FaRegEdit
              className="text-green-500 cursor-pointer"
              onClick={() => handleEdit(post._id, post.content)}
            />
            <MdDeleteOutline
              className="text-red-500 cursor-pointer"
              onClick={() => deletePost(post._id)}
            />
          </div>
          <div className="flex gap-2 items-center border-b-2 w-full p-2">
            <img
              className="w-10 h-10"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsWHk8I9ffSkzewp-xK6eissGNZm_c9Iocg&s"
              alt="User Avatar"
            />
            <div className="text-sm">
              <h2>{post.author.name}</h2>{' '}
              {/* Esse nome pode ser dinâmico se vier do post */}
              <span>{calculateTimeAgo(post.createdAt)}</span>{' '}
              {/* Substitua pelo tempo real do post */}
            </div>
          </div>
          <div>
            <div className="h-12">
              {modeEdit === post._id ? (
                <>
                  <ReactQuill value={content} onChange={handleContentChange} />
                  <button
                    className="bg-blue-400 p-2"
                    onClick={() => handleSaveEdit(post._id)}
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <div
                  className="max-w-full h-auto"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>
            <div className="flex items-center gap-2 border-2 p-2">
              <FaRegCommentAlt className="text-blue-600" />
              <input
                type="text"
                placeholder="comente"
                className="w-full outline-none"
              />
              <button className="flex items-center p-2 rounded-md bg-purple-700">
                <BiSolidSend className="text-white w-2 h-2" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
