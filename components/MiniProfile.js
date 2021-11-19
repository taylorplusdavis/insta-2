import { useSession, signOut } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="container flex items-center justify-between pt-8 pl-8 pr-8 pb-3 sticky top-20">
      <img
        className="w-14 h-14 rounded-full"
        src={session?.user?.image}
        alt="profile pic"
      />
      <div className="nameContainer">
        <p className="font-bold">{session?.user?.name}</p>
        <p className="text-sm text-gray-400">Welcome to Instagram</p>
      </div>
      <div className="signOutContainer">
        <p
          onClick={signOut}
          className="text-sm text-blue-500 hover:text-blue-400 cursor-pointer"
        >
          Sign Out
        </p>
      </div>
    </div>
  );
}

export default MiniProfile;
