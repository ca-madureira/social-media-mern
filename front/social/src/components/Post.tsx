import { FaRegGrinHearts } from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { BiSolidSend } from 'react-icons/bi';

const Post = () => {
  return (
    <div className="m-auto mt-10 border-2 w-[600px] p-2">
      <div className="flex gap-2 justify-end">
        <FaRegHeart className="text-purple-500" />
        <FaRegEdit className="text-green-500" />
        <MdDeleteOutline className="text-red-500" />
      </div>
      <div className="flex gap-2 items-center border-b-2 w-full p-2">
        <img
          className="w-10 h-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEsWHk8I9ffSkzewp-xK6eissGNZm_c9Iocg&s"
        />
        <div className="text-sm">
          <h2>Ana Clara Silva</h2>3 horas atrás
        </div>
      </div>
      <div>
        <div className="h-12">
          <h3>Hoje o dia está bonito!</h3>
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
  );
};

export default Post;
