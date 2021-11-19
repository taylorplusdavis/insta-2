import { useEffect, useState } from "react";
import Suggestion from "./Suggestion";
import faker from "faker";
import { useSession } from "next-auth/react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  const { data: session } = useSession();

  return (
    <div className="p-8 sticky top-36">
      <div className="title flex justify-between items-center">
        <p className="font-bold text-gray-400">Suggestions for you</p>
        <p className="cursor-pointer hover:text-gray-500">See All</p>
      </div>
      {suggestions.map((profile) => (
        <Suggestion
          key={profile.id}
          username={profile.username}
          userImage={profile.avatar}
          workplace={profile.company.name}
        />
      ))}
    </div>
  );
}

export default Suggestions;
