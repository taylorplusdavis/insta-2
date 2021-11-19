import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto mt-8 ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2">
        {/* Stories */}
        <Stories />

        {/* Posts */}
        <Posts />
      </section>

      <section className="sticky top-20">
        {/* Mini Profile */}
        {session ? (
          <MiniProfile className="" username={session?.user?.name} />
        ) : (
          <p></p>
        )}
        {/* Suggestions */}
        {session ? <Suggestions /> : <p></p>}
      </section>
    </main>
  );
}

export default Feed;
