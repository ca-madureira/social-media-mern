import { useState } from "react";
import { UserProfile } from "../interfaces";
import { useCreatePostMutation } from "../redux/post/postApi";

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  invites: UserProfile[];
  friends: UserProfile[];
}

interface PostEditProps {
  setOpenModal: (value: boolean) => void;
  user: UserData;
}

const PostEdit = ({ user }: PostEditProps) => {
  const [content, setContent] = useState("");

  const [createPost] = useCreatePostMutation();

  const handleSubmit = async () => {
    try {
      await createPost({ content }).unwrap();
      setContent("");
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  };

  return (
    <section className="w-full flex border-2 border-purple-300 gap-2 bg-white shadow-purple-600 shadow-md p-2">
      <img
        className="w-14 h-14 rounded-md border-4 border-purple-200"
        src={`${user?.avatar
          ? user?.avatar
          : "https://cdn-icons-png.flaticon.com/512/6188/6188625.png"
          }`}
        alt="User Avatar"
      />
      <div className="w-full">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={250}
          placeholder="O que está pensando?"
          className={
            "resize-none font-mooli text-sm text-violet-800 outline-none border-2 border-purple-200 w-full p-2"
          }
        />

        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2">
            <p className="text-sm text-purple-800">{content.length} / 250</p>
          </div>

          <button
            className="bg-purple-400 text-sm px-2 py-1 rounded-md text-white font-semibold"
            onClick={handleSubmit}
          >
            Postar
          </button>
        </div>
      </div>

      {/* <input
        type="text"
        placeholder="O que está pensando?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        onFocus={() => setOpenModal(true)}
        className="w-full h-12 resize-none shadow-purple-400 shadow-sm rounded-md outline-none p-2"
      /> */}
    </section>
  );
};

export default PostEdit;
