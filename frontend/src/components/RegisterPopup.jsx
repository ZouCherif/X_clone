import { IoIosClose } from "react-icons/io";
const RegisterPopup = ({ onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black rounded-lg z-20 sm:w-[550px] w-screen sm:h-[600px] h-screen overflow-auto">
      <div className="py-2 sm:px-14 px-6">
        <IoIosClose
          onClick={onClose}
          className="absolute top-2 left-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer"
          size={30}
        />
        <h2 className="text-lg font-semibold mb-6 sm:px-0 px-4">Step 1 of 5</h2>
        <div className="px-4">
          <h1 className="text-3xl font-bold mb-8">Create your account</h1>
          <input
            type="text"
            placeholder="Name"
            className="bg-black border border-gray-600 w-full mb-8 px-2 py-3 rounded-md"
          />
          <input
            type="text"
            placeholder="Email"
            className="bg-black border border-gray-600 w-full mb-8 px-2 py-3 rounded-md"
          />
          <h2 className="font-bold mb-2">Date of birth</h2>
          <p className="text-gray-500 text-xs mb-4">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
          <div className="flex">
            <div className="relative w-fit mr-3">
              <span className="text-xs absolute top-0 left-0 text-gray-500 py-1 pl-2">
                Month
              </span>
              <select
                className="px-4 pt-5 pb-1 text-left rounded border bg-black border-gray-500 w-[190px]"
                defaultValue=""
              >
                <option value="" disabled hidden></option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="relative w-fit mr-3">
              <span className="text-xs absolute top-0 left-0 text-gray-500 py-1 pl-2">
                Day
              </span>
              <select
                className="px-4 pt-5 pb-1 text-left rounded border bg-black border-gray-500 w-[80px]"
                defaultValue=""
              >
                <option value="" disabled hidden></option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-fit">
              <span className="text-xs absolute top-0 left-0 text-gray-500 py-1 pl-2">
                Year
              </span>
              <select
                className="px-4 pt-5 pb-1 text-left rounded border bg-black border-gray-500 w-[115px]"
                defaultValue=""
              >
                <option value="" disabled hidden></option>
                {Array.from({ length: 2024 - 1903 + 1 }, (_, i) => (
                  <option key={2024 - i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 px-16 fixed bottom-0 w-full">
        <button className="bg-white text-black font-semibold p-2 rounded-3xl w-full">
          Next
        </button>
      </div>
    </div>
  );
};

export default RegisterPopup;