import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EmojiHappyIcon,
  CubeTransparentIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

function Post({ id, username, userImage, img, caption }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmark] = useState(false);
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  const likePost = async () => {
    if (isLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  useEffect(
    () =>
      setIsLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  console.log(isLiked);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white shadow-sm">
      {/* Header */}
      <div class="flex items-center justify-between">
        <div className="flex items-center p-3 bg-white mt-1">
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={userImage}
            alt="userImage"
          />
          <p className="font-bold pl-3 cursor-pointer">{username}</p>
        </div>
        <DotsHorizontalIcon className="w-6 h-6 cursor-pointer mr-5" />
      </div>

      {/* Img */}
      <div className="">
        <img
          className="w-full max-h-[1350px] object-cover"
          src={img}
          alt="image"
        />
      </div>

      {/* Likes */}
      <div className="likesContainer flex font-bold text-md ml-3 mt-1">
        {likes.length > 0 && <p>{likes.length} like</p>}
        {likes.length > 1 && <span className="">s</span>}
      </div>

      {/* Buttons */}
      {session && (
        <div className="buttonsContainer flex justify-between mt-1">
          <div className="left flex space-x-3 ml-3">
            {!isLiked ? (
              <HeartIcon onClick={likePost} className="iconButton" />
            ) : (
              <HeartSolidIcon
                onClick={likePost}
                className="iconButton text-red-600"
              />
            )}
            <ChatIcon className="iconButton" />
            <PaperAirplaneIcon className="iconButton hover:rotate-45" />
          </div>
          <div className="right mr-3">
            {!isBookmarked ? (
              <BookmarkIcon
                onClick={() => setIsBookmark(true)}
                className="iconButton"
              />
            ) : (
              <BookmarkSolidIcon
                onClick={() => setIsBookmark(false)}
                className="iconButton"
              />
            )}
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="truncate p-3 -mt-3">
        <p className="inline font-bold cursor-pointer text-sm"> {username} </p>
        <p className="inline text-sm">{caption}</p>
      </div>

      {/* comments */}
      {comments.length > 0 && (
        <div className="h-24 comments pl-3 pr-3 space-y-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-black justify-between">
          {comments.map((comment) => (
            <div className="flex justify-between items-center">
              <div className="comment flex">
                <p className="mr-1 font-bold cursor-pointer text-sm">
                  {comment.data().username}
                </p>
                <p className="text-sm">{comment.data().comment}</p>
              </div>

              <Moment className="text-xs text-gray-400" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form>
          <div className="flex commentContainer items-center justify-between p-3">
            <div className="commentInput flex items-center">
              <EmojiHappyIcon className="h-7 text-gray-500" />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-0 focus:ring-0"
                type="text"
                placeholder="Add a comment..."
              />
            </div>
            {comment.trim() != "" ? (
              <button
                className="text-blue-500 text-sm cursor-pointer font-semibold"
                onClick={sendComment}
              >
                Post
              </button>
            ) : (
              <p></p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Post;
