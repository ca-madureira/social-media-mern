import { useState } from 'react';
import { useParams } from 'react-router-dom'; // Importe useParams
import {
  useGetUserPostsQuery,
  useDeletePostByIdMutation,
  useEditPostMutation,
  useVotePostMutation,
} from '../redux/post/postApi';
import { FaRegHeart, FaEdit, FaHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RootState } from '../redux/store';
import calculateTimeAgo from '../utils/calculaTimeAgo';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';

// interface UserData {
//   id: string;
//   name: string;
//   email: string;
// }

const Post: React.FC<any> = ({ user }: any) => {
  const { id } = useParams<{ id: string }>();
  console.log('ID NA URL', id);
  const { data, isLoading, isError } = useGetUserPostsQuery({ id });

  const auth = useSelector((state: RootState) => state.auth?.id);

  const [deletePostById] = useDeletePostByIdMutation();
  const [editPost] = useEditPostMutation();
  const [votePost] = useVotePostMutation();

  const [modeEdit, setModeEdit] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [voteState, setVoteState] = useState<{ [key: string]: boolean }>({});
  // const [reaction, setReaction] = useState<{ [key: string]: string }>({});
  const [toggle, setToggle] = useState(false);

  if (isLoading) {
    return <p>Carregando posts...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar posts.</p>;
  }

  const deletePost = async (postId: string) => {
    await deletePostById(postId);
  };

  const handleEdit = (postId: string, postContent: string) => {
    setModeEdit(postId);
    setContent(postContent);
    setToggle(!toggle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSaveEdit = async (postId: string) => {
    await editPost({ id: postId, content });
    setModeEdit(null);
  };

  const handleVote = async (postId: string) => {
    await votePost({ id: postId });
    setVoteState((prevVoteState) => ({
      ...prevVoteState,
      [postId]: !prevVoteState[postId],
    }));
  };

  return (
    <section className="w-full md:space-y-4">
      {data?.posts.map((post: any, index: any) => (
        <article
          key={index}
          className="bg-white shadow-purple-600 shadow-md rounded-md p-1"
        >
          <header className="flex gap-2 justify-end">
            <FaEdit
              className="text-green-500 font-semibold hover:text-green-800 cursor-pointer"
              onClick={() => handleEdit(post._id, post.content)}
            />
            <MdDelete
              className="text-red-600 font-semibold hover:text-red-800 cursor-pointer"
              onClick={() => deletePost(post._id)}
            />
          </header>
          <section className="flex gap-2 border-b-2 border-purple-200 p-1">
            <img
              className="w-10 h-10 border-4 border-purple-200 rounded-md"
              src={user.avatar}
              alt="User Avatar"
            />
            <div className="text-sm">
              <h2 className="text-purple-700 font-semibold">
                {post.author.name}
              </h2>
              <span className="text-gray-500 text-xs font-mooli">
                {calculateTimeAgo(post.createdAt)}
              </span>
            </div>
          </section>
          <section>
            <div className="p-4 space-y-2">
              {modeEdit === post._id && toggle ? (
                <>
                  <ReactQuill value={content} onChange={handleContentChange} />
                  <button
                    className="bg-purple-500 text-white p-2 text-sm font-semibold rounded-md"
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
            <footer className="flex">
              <button
                className="flex items-center font-semibold px-2"
                onClick={() => handleVote(post._id)}
              >
                {post.votes.some((vote: string) => vote === auth) ? (
                  <FaHeart className="text-purple-500" />
                ) : (
                  <FaRegHeart className="text-purple-500" />
                )}
              </button>
              {`${post.votes.length} ${
                post.votes.length === 1 ? 'voto' : 'votos'
              }`}
            </footer>
          </section>
        </article>
      ))}
    </section>
  );
};

export default Post;
