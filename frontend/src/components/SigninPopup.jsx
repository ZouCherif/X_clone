import React from "react";

const SigninPopup = ({ onClose }) => {
  return (
    <div className="text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-lg p-8 z-20">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SigninPopup;
