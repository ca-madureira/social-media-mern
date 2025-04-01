import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiEditCircleFill } from "react-icons/ri";

import {
  useGetUserPostsQuery,
  useDeletePostByIdMutation,
  useEditPostMutation,
  useVotePostMutation,
} from "../redux/post/postApi";
import { RootState } from "../redux/store";
import calculateTimeAgo from "../utils/calculaTimeAgo";
import { useSelector } from "react-redux";
import { PostData } from "../interfaces";

const Post = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetUserPostsQuery({ id: id! });

  const auth = useSelector((state: RootState) => state.auth?.id);

  const [deletePostById] = useDeletePostByIdMutation();
  const [editPost] = useEditPostMutation();
  const [votePost] = useVotePostMutation();

  const [modeEdit, setModeEdit] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");

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

  const handleSaveEdit = async (postId: string) => {
    await editPost({ id: postId, content });
    setModeEdit(null);
  };

  const handleVote = async (postId: string) => {
    await votePost({ id: postId });
  };

  return (
    <section className="w-full space-y-2 md:space-y-4">
      {data?.posts.map((post: PostData, index: number) => (
        <article
          key={index}
          className="bg-white  border-2 border-purple-300 rounded-md shadow-purple-600 shadow-md rounded-md p-1"
        >
          <header className="flex gap-2 justify-end items-center">
            {post.author._id === auth && (
              <>
                <RiEditCircleFill
                  className="w-4 h-4 text-violet-400 font-semibold hover:text-violet-300 cursor-pointer"
                  onClick={() => handleEdit(post._id, post.content)}
                />
                <TiDelete
                  className="w-5 h-5 text-violet-400 font-semibold hover:text-violet-300 cursor-pointer"
                  onClick={() => deletePost(post._id)}
                />
              </>
            )}
          </header>
          <section className="flex gap-2 border-b-2 border-purple-200 p-1">
            <img
              className="w-10 h-10 border-4 border-purple-200 rounded-md"
              src={post.author.avatar}
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
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={250}
                    placeholder="O que está pensando?"
                    className="resize-none font-mooli text-sm text-violet-800 outline-none border-2 border-purple-200 w-full p-2"
                  />
                  <p className="text-sm text-purple-800">
                    {content.length} / 250
                  </p>
                  <button
                    className="bg-purple-500 text-white p-2 text-sm font-semibold rounded-md"
                    onClick={() => handleSaveEdit(post._id)}
                  >
                    Atualizar
                  </button>
                </>
              ) : (
                <p className="font-mooli text-sm text-violet-800">
                  {post.content}
                </p>
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
                post.votes.length === 1 ? "voto" : "votos"
              }`}
            </footer>
          </section>
        </article>
      ))}
    </section>
  );
};

export default Post;
