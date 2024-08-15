import { MdOutlineOndemandVideo } from 'react-icons/md';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { BiSolidSend } from 'react-icons/bi';
import { FaRegImage } from 'react-icons/fa';
const PostEdit = () => {
  return (
    <>
      <div className="flex flex-col w-[600px] m-12 p-4 gap-2 border-2  ">
        <div className="flex gap-3 items-center justify-center">
          <img
            className="w-12 h-12 rounded-md border-2 border-purple-500"
            src="https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg"
          />
          {/* <textarea className="w-full border-2 resize-none rounded-md" /> */}
          <input
            type="text"
            placeholder="O que está pensando?"
            className="w-full h-12 border-2 resize-none rounded-md outline-none p-2"
          />
          <button className="flex items-center p-2 rounded-md bg-purple-700">
            <BiSolidSend className="text-white" />
          </button>
        </div>

        <div className="flex gap-2 ml-16">
          <FaRegImage className="text-green-900 h-6 w-6" />
          <MdOutlineOndemandVideo className="text-red-900  h-6 w-6" />
          <MdOutlineEmojiEmotions className="text-yellow-700  h-6 w-6" />
        </div>
      </div>
    </>
  );
};

export default PostEdit;
