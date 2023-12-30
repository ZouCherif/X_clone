/* eslint-disable jsx-a11y/anchor-is-valid */
import { IoIosClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { useState } from "react";
import { sendCode, verifyCode } from "../utils/api";

const RegisterPopup = ({ onClose }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const [code, setCode] = useState("");

  const [isEmailValid, setEmailValidity] = useState(true);
  const [view, setView] = useState(1);

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValidity(emailPattern.test(e.target.value));
    }
  };

  const sendVerificationCode = async () => {
    try {
      sendCode(data.email);
      if (view !== 4) {
        setView(view + 1);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const verifyMyCode = async () => {
    try {
      const response = await verifyCode(code);
      setView(view + 1);
    } catch (e) {
      console.log(e.message);
    }
  };
  const isFormValid =
    data.name.trim() !== "" && data.email.trim() !== "" && isEmailValid;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black rounded-lg z-20 sm:w-[550px] w-screen sm:h-[600px] h-screen overflow-auto">
      <div className="py-2 sm:px-14 px-6">
        <IoIosClose
          onClick={onClose}
          className={`${
            view === 1 ? "block" : "hidden"
          } absolute top-2 left-2 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer`}
          size={30}
        />
        <FaArrowLeft
          onClick={() => setView(view - 1)}
          className={`${
            view > 1 && view !== 4 ? "block" : "hidden"
          } absolute top-3 left-3 hover:bg-gray-800 bg-opacity-5 rounded-full cursor-pointer p-1`}
          size={25}
        />
        <h2 className="text-lg font-semibold mb-6 sm:px-0 px-4">
          Step {view} of 5
        </h2>
        <div className={`px-4 ${view === 1 ? "block" : "hidden"} `}>
          <h1 className="text-3xl font-bold mb-8">Create your account</h1>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInput}
            autoComplete="off"
            placeholder="Name"
            className="bg-black border border-gray-600 w-full mb-8 px-2 py-3 rounded-md"
          />
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleInput}
            placeholder="Email"
            className={`bg-black border border-gray-600 w-full mb-1 px-2 py-3 rounded-md ${
              !isEmailValid ? "border-red-500" : ""
            }`}
          />
          {!isEmailValid && (
            <p className="text-red-500 text-xs">Please enter a valid email.</p>
          )}
          <h2 className="font-bold mb-2  mt-8">Date of birth</h2>
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
        <div className={`px-4 ${view === 2 ? "block" : "hidden"} `}>
          <h1 className="text-3xl font-bold mb-8">Create your account</h1>
          <div className="relative bg-black border border-gray-600 w-full mb-8 px-2 pt-5 pb-1 rounded-md">
            <p
              className="cursor-pointer flex justify-between items-center"
              onClick={() => setView(view - 1)}
            >
              {data.name}
              <div className="bg-green-500 rounded-full h-fit p-[1px]">
                <MdDone size={12} color="black" />
              </div>
            </p>
            <span className="absolute text-gray-500 top-1 left-2 text-xs">
              Name
            </span>
          </div>
          <div className="relative bg-black border border-gray-600 w-full mb-8 px-2 pt-5 pb-1 rounded-md">
            <p
              className="cursor-pointer flex justify-between items-center"
              onClick={() => setView(view - 1)}
            >
              {data.email}
              <div className="bg-green-500 rounded-full h-fit p-[1px]">
                <MdDone size={12} color="black" />
              </div>
            </p>
            <span className="absolute text-gray-500 top-1 left-2 text-xs">
              Email
            </span>
          </div>
          <div className="relative bg-black border border-gray-600 w-full mb-8 px-2 pt-5 pb-1 rounded-md">
            <p
              className="cursor-pointer flex justify-between items-center"
              onClick={() => setView(view - 1)}
            >
              Date of birth
              <div className="bg-green-500 rounded-full h-fit p-[1px]">
                <MdDone size={12} color="black" />
              </div>
            </p>
            <span className="absolute text-gray-500 top-1 left-2 text-xs">
              Date of birth
            </span>
          </div>
        </div>
        <div className={`px-4 ${view === 2 ? "block" : "hidden"} `}>
          <h1 className="text-3xl font-bold mb-4">Verification code</h1>
          <p className="text-xs text-gray-500">
            Enter the code sent to ${data.email}.
          </p>
          <input
            type="number"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
            placeholder="Code"
            className="bg-black border border-gray-600 w-full mb-8 px-2 py-3 rounded-md"
          />
          <p
            className="text-xs text-[#1d9bf0] hover:underline cursor-pointer"
            onClick={sendVerificationCode}
          >
            Didn't receive an email?
          </p>
        </div>
      </div>
      <div className="py-4 px-16 fixed bottom-0 w-full">
        <p
          className={`${
            view === 2 ? "block" : "hidden"
          } text-xs text-gray-500 mb-6 px-4`}
        >
          By signing up, you agree to our{" "}
          <a href="" className="text-[#1d9bf0] hover:underline">
            Terms,
          </a>{" "}
          <a href="" className="text-[#1d9bf0] hover:underline">
            Privacy Policy
          </a>
          , and{" "}
          <a href="" className="text-[#1d9bf0] hover:underline">
            Cookie Use.
          </a>{" "}
          X may use your contact information, including your email address and
          phone number for purposes outlined in our Privacy Policy.{" "}
          <a href="" className="text-[#1d9bf0] hover:underline">
            Learn more
          </a>
        </p>
        <button
          className={`bg-white text-black font-semibold p-2 rounded-3xl w-full ${
            isFormValid ? "" : "opacity-50 cursor-not-allowed"
          } ${view !== 2 ? "block" : "hidden"}`}
          disabled={!isFormValid}
          onClick={() => {
            if (view === 1) {
              setView(view + 1);
            } else {
              try {
                verifyMyCode();
              } catch (e) {
                console.log(e.message);
              }
            }
          }}
        >
          Next
        </button>
        <button
          className={`bg-[#1d9bf0] p-2 text-center text-sm rounded-3xl w-full font-bold ${
            view === 2 ? "block" : "hidden"
          }`}
          onClick={sendVerificationCode}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default RegisterPopup;
