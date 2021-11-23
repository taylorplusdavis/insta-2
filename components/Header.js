import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle - search */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray
            focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center">
          {session ? (
            <div className="relative flex items-center justify-end space-x-1 md:space-x-4 -ml-2">
              <HomeIcon className="navButton" />
              <div className="relative navButton">
                <PaperAirplaneIcon className="navButton rotate-45" />
                <div className="absolute navButton -top-1 -right-2 text-xs w-5 h-5 bg-red-600 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(!open)}
                className="navButtonNotHidden h-12 md:h-6"
              />
              <MenuIcon className="h-12 md:hidden cursor-pointer" />
              <UserGroupIcon className="navButton" />
              <HeartIcon className="navButton" />
              <img
                onClick={signOut}
                className="h-10 rounded-full cursor-pointer border-2 border-pink-600"
                src={session.user.image}
                alt="profile pic"
              />
            </div>
          ) : (
            <>
              <HomeIcon className="navButton inline" />
              <button onClick={signIn}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
