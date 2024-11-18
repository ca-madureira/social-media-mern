import { useState } from 'react';

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  invites: object[];
  friends: object[];
}

interface PostEditProps {
  setOpenModal: (value: boolean) => void;
  user: UserData;
}

const PostEdit = ({ user, setOpenModal }: PostEditProps) => {
  const [post, setPost] = useState('');

  return (
    <section className="w-full flex gap-2 bg-white shadow-purple-600 shadow-md p-2">
      <img
        className="w-14 h-12 rounded-md border-4 border-purple-200"
        src={`${
          user?.avatar
            ? user?.avatar
            : 'https://cdn-icons-png.flaticon.com/512/6188/6188625.png'
        }`}
        alt="User Avatar"
      />
      <input
        type="text"
        placeholder="O que está pensando?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        onFocus={() => setOpenModal(true)}
        className="w-full h-12 resize-none shadow-purple-400 shadow-sm rounded-md outline-none p-2"
      />
    </section>
  );
};

export default PostEdit;
