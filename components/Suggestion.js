function Suggestion({ username, workplace, userImage }) {
  return (
    <div className="flex items-center justify-between">
      <img
        className="w-16 h-16 rounded-full cursor-pointer p-3"
        src={userImage}
        alt=""
      />

      <div className="w-full">
        <p className="text-sm font-bold cursor-pointer">{username}</p>
        <p className="text-xs text-gray-500">Works at {workplace}</p>
      </div>

      <p className="text-sm text-blue-500 hover:text-blue-400 cursor-pointer">
        Follow
      </p>
    </div>
  );
}

export default Suggestion;
