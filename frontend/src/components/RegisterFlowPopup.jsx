import { logo } from "../assets";
import DropZoneBtn from "./DropZoneBtn";
function RegisterFlowPopup() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black rounded-lg z-20 sm:w-[550px] w-screen sm:h-[600px] h-screen overflow-auto">
      <div className="w-2/3 mx-auto">
        <img src={logo} alt="logo" className="h-8 mx-auto mt-4" />
        <h1 className="text-3xl font-bold mb-1">Pick a profile picture</h1>
        <h3 className="text-gray-500">
          Have a favorite selfie? Upload it now.
        </h3>
        <DropZoneBtn />
      </div>
      <div className="fixed bottom-0 py-6 w-full">
        <button className="w-2/3 rounded-full border border-whit p-2 block mx-auto hover:bg-[#1d9bf0] bg-opacity-5">
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default RegisterFlowPopup;
