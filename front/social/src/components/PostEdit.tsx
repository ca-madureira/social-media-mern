import { useState } from 'react';

interface PostEditProps {
  setOpenModal: (value: boolean) => void;
}

const PostEdit = ({ setOpenModal }: PostEditProps) => {
  const [post, setPost] = useState('');

  return (
    <div className="flex gap-2 bg-white shadow-purple-600 shadow-md p-2">
      <img
        className="w-12 h-12 rounded-md border-2 border-purple-500"
        src="https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg"
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
    </div>
  );
};

export default PostEdit;
