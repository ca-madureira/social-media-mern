import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { BiSolidSend } from 'react-icons/bi';
import { FaRegImage } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from 'react';

interface PostEditProps {
  setOpenModal: (value: boolean) => void;
}

const PostEdit = ({ setOpenModal }: PostEditProps) => {
  const emojiRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddEmoji = (emoji: any) => {
    setPost((msg: string) => msg + emoji.emoji);
  };

  const handleSendPost = () => {};

  return (
    <div className="flex flex-col w-[600px] m-12 p-4 gap-2 border-2">
      <div className="flex gap-3 items-center justify-center">
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
          onFocus={() => setOpenModal(true)} // Abre o modal quando o input é focado
          className="w-full h-12 border-2 resize-none rounded-md outline-none p-2"
        />
        <button
          className="flex items-center p-2 rounded-md bg-purple-700"
          onClick={handleSendPost}
        >
          <BiSolidSend className="text-white" />
        </button>
      </div>

      <div className="relative flex gap-2 ml-16">
        <button
          className="bg-green-300 p-2 rounded-md"
          onClick={() => setOpenModal(true)}
        >
          <FaRegImage className="text-green-900 w-4 h-4" />
        </button>

        <button
          className="text-yellow-700 bg-yellow-500 hover:bg-yellow-400 rounded-md p-2"
          onClick={() => setEmojiPickerOpen((prev) => !prev)}
        >
          <MdOutlineEmojiEmotions className="w-4 h-4" />
        </button>
        {/* Contêiner do Emoji Picker */}
        {emojiPickerOpen && (
          <div ref={emojiRef} className="absolute right-12">
            <EmojiPicker
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostEdit;
