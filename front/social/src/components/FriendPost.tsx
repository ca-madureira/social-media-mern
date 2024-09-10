import React from 'react';
import { useGetFriendPostsQuery } from '../redux/friend/friendApi'; // Importar o serviço

const FriendPosts = () => {
  const { data: posts, error, isLoading } = useGetFriendPostsQuery(); // Sem argumentos

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os posts.</p>;

  console.log(posts);
  return (
    <div>
      {posts?.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.author.name}</h3>
          <p
            className="max-w-full h-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <span>{post.createdAt}</span>
        </div>
      ))}
    </div>
  );
};

export default FriendPosts;
