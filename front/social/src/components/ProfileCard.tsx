const ProfileCard = () => {
  return (
    <div className="flex flex-col ml-4 mt-12 items-center p-4 border-2 max-w-xs space-y-4 ">
      <img
        src="https://www.designi.com.br/images/preview/12040180.jpg"
        className="w-24 h-24 rounded-full border-2 border-purple-500"
      />
      <div className="text-center">
        <h2 className="text-lg font-semibold">Ana Claudia</h2>
        <h3 className="text-sm text-gray-500">ana.claudia@hotmail.com</h3>
      </div>
      <div className="flex justify-around w-full text-center">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">520</span>
          <span className="text-sm text-gray-500">amigos</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">234</span>
          <span className="text-sm text-gray-500">posts</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">345</span>
          <span className="text-sm text-gray-500">curtidas</span>
        </div>
      </div>
      <button className="bg-purple-500 text-white p-2 ">Fazer Amizade</button>
    </div>
  );
};

export default ProfileCard;
