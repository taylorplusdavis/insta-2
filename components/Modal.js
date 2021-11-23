import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import { db, storage } from "../firebase";

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.name,
      caption: captionRef.current.value,
      profileImage: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="container flex items-end justify-center min-h-[500px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {/* Modal Content */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {selectedFile ? (
                <img
                  className="w-full max-h-full object-contain cursor-pointer"
                  src={selectedFile}
                  onClick={() => setSelectedFile(null)}
                  alt=""
                />
              ) : (
                <div className="flex w-full items-center justify-center">
                  <CameraIcon
                    onClick={() => filePickerRef.current.click()}
                    className="w-14 h-14 bg-red-200 rounded-full text-red-500 p-3 cursor-pointer"
                  />
                </div>
              )}
              {/* Icon */}

              {/* Photo */}
              <div className="photoContainer">
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-4 font-medium text-gray-900"
                  >
                    Upload a photo
                  </Dialog.Title>
                </div>

                {/* File Picker */}
                <div className="filePickContainer">
                  <input
                    ref={filePickerRef}
                    type="file"
                    onChange={addImageToPost}
                    hidden
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="captionContainer mt-2">
                <input
                  ref={captionRef}
                  className="border-none focus:ring-0 w-full text-center"
                  type="text"
                  placeholder="Please enter a caption..."
                />
              </div>

              {/* Upload Post */}
              <div className="buttonContainer mt-5 sm:mt-6">
                <button
                  onClick={uploadPost}
                  disabled={!selectedFile}
                  className="w-full bg-red-500 rounded-lg p-2 text-white hover:bg-red-600"
                >
                  {loading ? "Uploading" : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
