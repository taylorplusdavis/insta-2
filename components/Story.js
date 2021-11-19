function Story({ img, username }) {
  return (
    <div className="">
      <img
        className="h-14 w-14 rounded-full bg-gradient-to-b from-red-800 to-yellow-400 border-2
        cursor-pointer p-[1.5px] object-contain hover:scale-110 transition transform duration-200 ease-out"
        src={img}
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
