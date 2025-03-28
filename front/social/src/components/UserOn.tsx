import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Ajuste o caminho conforme necessário

export const UserOn = () => {
  // Acessando o estado onlineUsers de forma correta
  const onlineUsers = useSelector(
    (state: RootState) => state.connection.onlineUsers
  );

  return (
    <div>
      {onlineUsers.map((item) => (
        // Adicionando uma key única para cada elemento renderizado
        <p key={item.userId}>{item.userId}</p>
      ))}
    </div>
  );
};
