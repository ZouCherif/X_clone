/* eslint-disable jsx-a11y/anchor-is-valid */
import { logo } from "../assets";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
function Login() {
  return (
    <div className="flex flex-col min-h-screen sm:p-0 p-4 overflow-auto">
      <div className="flex flex-col sm:flex-row justify-center text-white flex-1">
        <div className="w-1/2 flex sm:justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="sm:max-w-[300px] sm:max-h-[300px] max-w-[70px] sm:mx-auto pl-7 mb-16"
          />
        </div>
        <div className="w-1/2 sm:pl-10 pl-7 flex flex-col justify-center">
          <h1 className="sm:text-6xl text-5xl font-bold mb-14">
            Happening now
          </h1>
          <div className="w-[280px]">
            <h2 className="font-bold text-3xl mb-5">Join today.</h2>
            <button className="bg-white rounded-3xl p-2 text-sm text-black flex w-full items-center font-semibold mb-2 justify-center">
              <FcGoogle size={20} className="mr-2" />
              Sign up with Google
            </button>
            <button className="bg-white rounded-3xl p-2 text-sm text-black flex w-full items-center font-semibold mb-2 justify-center">
              <FaApple size={20} className="mr-2" />
              Sign up with Apple
            </button>
            <div className="flex items-center ml-1 mb-2">
              <hr className="bg-white w-[120px] opacity-20" />
              <span className="mx-2 text-sm">Or</span>
              <hr className="bg-white w-[120px] opacity-20" />
            </div>
            <button className="bg-[#1d9bf0] p-2 mb-2 text-center text-sm rounded-3xl w-full font-semibold">
              Create account
            </button>
            <p className="text-gray-500 text-[10px] mb-[50px]">
              By signing up, you agree to the{" "}
              <a href="" className="text-[#1d9bf0] hover:underline">
                Terms of Service{" "}
              </a>
              and{" "}
              <a href="" className="text-[#1d9bf0] hover:underline">
                Privacy Policy{" "}
              </a>
              , including{" "}
              <a href="" className="text-[#1d9bf0] hover:underline">
                Cookie Use.
              </a>
            </p>
            <h2 className="font-semibold mb-2">Already have an account?</h2>
            <button className="text-[#1d9bf0] border hover:bg-[#1d9bf0] hover:bg-opacity-10 border-[#1d9bf0] p-2 mb-2 text-center text-sm rounded-3xl w-full font-semibold">
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-xs flex justify-center">
        <ul className="flex flex-wrap justify-center">
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Download the X app
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Help Center
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Accessibility
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Ads info
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Blog
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Status
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Careers
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Brand Resources
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Advertising
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Marketing
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              X for Business
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Developers
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Directory
            </a>
          </li>
          <li className="mr-4 mb-2">
            <a href="#" className="hover:underline">
              Settings
            </a>
          </li>
          <li className="mb-2">© 2023 X Corp.</li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
