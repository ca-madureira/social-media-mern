const Chat = () => {
  return (
    <section className="absolute right-4 bottom-0 z-99 bg-white w-[25%]  p-2 shadow-md shadow-purple-600">
      <section className="flex items-center gap-2 bg-purple-500 px-2">
        <img
          className="w-8 h-8 border border-2 rounded-full border-purple-400"
          src="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
        />
        <div>
          <p className="text-white font-bold">João</p>

          <p className="text-sm font-light text-green-200">online</p>
        </div>
      </section>
      <section className="overflow-y-auto h-[250px]">ola</section>

      <section className="flex">
        <input className="border w-[90%] outline-none" />
        <button className="bg-green-200 text-sm p-2">Enviar</button>
      </section>
    </section>
  );
};

export default Chat;
