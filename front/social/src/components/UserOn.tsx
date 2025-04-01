import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Ajuste o caminho conforme necessário
import { UserSocket } from "../interfaces";

export const UserOn = () => {
  // Acessando o estado onlineUsers de forma correta
  const onlineUsers = useSelector(
    (state: RootState) => state.connection.onlineUsers
  );
  console.log('gente online', onlineUsers)
  return (
    <div className="border-4 border-red-500">
      {onlineUsers.map((item: UserSocket) => (
        <div>
          <p>Usuario logado:</p>
          <p key={item.userId}>{item.userId}</p>
        </div>

      ))}
    </div>
  );
};
