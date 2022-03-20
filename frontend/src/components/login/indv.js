import React, {useState} from 'react'
import Userfront from "@userfront/react"

export const IndividualLogin = ({handleReg}) => {

  Userfront.init("8nwrppdb");

  function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

  const [username, userInput] = useInput({ type: "text" });
  const [password, passwordInput] = useInput({ type: "text" });

  function handleSubmit() {

    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: username,
      password: password,
      data: {
        accountName: username,
      },
    });
  }
  return (
      <div>
    <form className="bg-white">
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            
            {userInput}
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            
            {passwordInput}
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={() => handleSubmit}
          >
            Login
          </button>
          <p className="text-sm ml-2 hover:text-blue-500 cursor-pointer" onClick={() => console.log(username)}>
            Need to register?
          </p>
        </form>
        </div>
  );
};

export default IndividualLogin;
