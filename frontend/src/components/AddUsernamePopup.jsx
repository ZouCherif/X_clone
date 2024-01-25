import { useState } from "react";
import { logo } from "../assets";
import { MdDone } from "react-icons/md";

function AddProfilePicPopup() {
  const [username, setUsername] = useState(null);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black rounded-lg z-20 sm:w-[550px] w-screen sm:h-[600px] h-screen overflow-auto">
      <div className="w-2/3 mx-auto">
        <img src={logo} alt="logo" className="h-8 mx-auto mt-4" />
        <h1 className="text-3xl font-bold mb-1">What should we call you?</h1>
        <h3 className="text-gray-500 text-sm mb-8">
          Your @username is unique, You can always change it later.
        </h3>

        <div className="relative bg-black border border-gray-600 w-full mb-6 px-2 pt-5 pb-1 rounded-md">
          <span className="text-blue-500 text-xs absolute top-1 left-1">
            Username
          </span>
          <div className="flex items-center">
            <span className="mr-1 text-blue-400">@</span>
            <input type="text" className="flex-1 bg-transparent outline-none" />
            <div className="bg-green-500 rounded-full h-fit p-[1px]">
              <MdDone size={12} color="black" />
            </div>{" "}
          </div>
        </div>

        <div className="flex mb-6">
          <p className="text-blue-400 text-xs mr-1 cursor-pointer hover:underline">
            @helloWorld221,
          </p>
          <p className="text-blue-400 text-xs cursor-pointer hover:underline">
            @foobarbaz2024
          </p>
        </div>
        <p className="text-blue-400 text-xs cursor-pointer hover:underline">
          Show more
        </p>
      </div>
      <div className="fixed bottom-0 py-6 w-full">
        <button className="w-2/3 rounded-full border border-whit p-2 block mx-auto hover:bg-[#1d9bf0] bg-opacity-5">
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default AddProfilePicPopup;
