import { useState, useEffect } from 'react';
import {
  useGetUserPostsQuery,
  useDeletePostByIdMutation,
  useEditPostMutation,
  useVotePostMutation,
  useReactPostMutation,
  useUserVotedPostQuery, // Adicionando a query
} from '../redux/post/postApi'; // substitua com o caminho correto
import { FaRegHeart, FaEdit, FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RootState } from '../redux/store';
import calculateTimeAgo from '../utils/calculaTimeAgo';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';

const Post = (props: any) => {
  const { data, isLoading, isError, refetch } = useGetUserPostsQuery({
    author: props.userId,
  });

  const auth = useSelector((state: RootState) => state.auth.user.id);

  const [deletePostById] = useDeletePostByIdMutation();
  const [editPost] = useEditPostMutation();
  const [votePost] = useVotePostMutation();
  const [reactPost] = useReactPostMutation();

  const [modeEdit, setModeEdit] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [voteState, setVoteState] = useState<{ [key: string]: boolean }>({});
  const [reaction, setReaction] = useState<{ [key: string]: string }>({});
  const [toggle, setToggle] = useState(false);

  // Preenche o estado de votos ao carregar os posts

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
    setModeEdit(postId);
    setContent(postContent);
    setToggle(!toggle);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleSaveEdit = async (id: string) => {
    await editPost({ id, content });
    setModeEdit(null);
    refetch();
  };

  const handleVote = async (id: string) => {
    console.log('VERIFICACAO DO CONTEUDO DE DATA', data);
    await votePost({ id });
    setVoteState((prevVoteState) => ({
      ...prevVoteState,
      [id]: !prevVoteState[id], // Alterna o estado do voto apenas para o post com o ID correspondente
    }));
  };

  const handleState = async (id: string, react: string) => {
    await reactPost({ id, react });
    setReaction((prev) => ({
      ...prev,
      [id]: react,
    }));
  };

  return (
    <div className="lg:space-y-4">
      {data?.posts.map((post: any, index: any) => (
        <div
          key={index}
          className="bg-white shadow-purple-600 shadow-md rounded-md p-1"
        >
          <div className="flex gap-2 justify-end">
            <FaEdit
              className="text-green-500 font-semibold hover:text-green-800 cursor-pointer"
              onClick={() => handleEdit(post._id, post.content)}
            />
            <MdDelete
              className="text-red-600 font-semibold hover:text-red-800 cursor-pointer"
              onClick={() => deletePost(post._id)}
            />
          </div>
          <div className="flex gap-2 border-b-2 p-1">
            <img
              className="w-10 h-10 border-2 border-purple-600 rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsWHk8I9ffSkzewp-xK6eissGNZm_c9Iocg&s"
              alt="User Avatar"
            />
            <div className="text-sm">
              <h2 className="text-purple-700 font-semibold">
                {post.author.name}
              </h2>
              <span className="text-gray-500 font-mooli">
                {calculateTimeAgo(post.createdAt)}
              </span>
            </div>
          </div>
          <div>
            <div className="p-4 space-y-2">
              {modeEdit === post._id && toggle ? (
                <>
                  <ReactQuill value={content} onChange={handleContentChange} />
                  <button
                    className="bg-purple-500 text-white font-semibold p-2 rounded-md"
                    onClick={() => handleSaveEdit(post._id)}
                  >
                    Atualizar
                  </button>
                </>
              ) : (
                <div
                  className="max-w-full h-auto"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>
            <div className="flex">
              <button
                className="flex items-center font-semibold px-2"
                onClick={() => handleVote(post._id)}
              >
                {post.votes.some((vote: string) => vote === auth) ? (
                  <FaHeart className="text-purple-900" />
                ) : (
                  <FaRegHeart className="text-purple-900" />
                )}
              </button>
              {`${post.votes.length} ${
                post.votes.length === 1 ? 'voto' : 'votos'
              }`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
