import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import PostEdit from '../components/PostEdit';
import Post from '../components/Post';
import Galery from '../components/Friends';
import ProfileCard from '../components/ProfileCard';
import Friends from '../components/Friends';
const Home = () => {
  // const location = useLocation();
  // const { name, email } = location.state || {};

  return (
    <div>
      <Header />
      <div className="flex">
        <ProfileCard />
        <div className="">
          <PostEdit />
          <Post />
        </div>
        <Friends />
      </div>
    </div>
  );
};

export default Home;
