import React from "react";
import Logo from "./bits_comp/Logo";
import { DropdownMenuDemo } from "./bits_comp/Menu";
import { ModeToggle } from "../components/mode-toggle";
import { SignIn } from "./bits_comp/SignIn";
import { SignUp } from "./bits_comp/SignUp";

// Define a TypeScript interface to specify the expected props for the Nav component
interface NavProps {
  handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle form changes
  handleSubmit: (e: React.FormEvent) => void; // Function to handle form submissions
  username: string | null; // User's username, which can be a string or null
  handlelogout: () => void; // Function to handle user logout
  handleSignIn: (e: React.FormEvent) => void; // Function to handle sign-in form submissions
  logoutStatus: boolean; // A boolean representing the user's logout status
  fetchToken: string | null; // A fetched token, which can be a string or null
}

const Nav: React.FC<NavProps> = ({
  handleForm,
  handleSubmit,
  username,
  handlelogout,
  handleSignIn,
  logoutStatus,
  fetchToken,
}) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-between mx-0 px-6 lg:px-20 p-4 fixed top-0 left-0 right-0 z-10 bg-white dark:bg-[#020817]">
      <a className="flex items-center">
        <Logo />
        <span className="self-center text-2xl font-semibold">&nbsp;&nbsp;TalkingDoc</span>
      </a>
      <div className="flex justify-center gap-4">
        {/* Conditional rendering based on logout status and fetchToken */}
        { !logoutStatus &&fetchToken ? (
          // Display the dropdown menu if logged in
          <DropdownMenuDemo username={username} handlelogout={handlelogout} />
        ) : (
          <>
          {/* Render the sign-in and sing-up form in navbar */}
            <SignIn handleForm={handleForm} handleSignIn={handleSignIn} />
            <SignUp handleForm={handleForm} handleSubmit={handleSubmit} />
          </>
        )}
        <ModeToggle /> {/* Render the mode toggle component for changing display modes */}
      </div>
    </div>
  );
};

export default Nav;
