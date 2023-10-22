import React from "react";
import Logo from "./bits_comp/Logo";
import { DropdownMenuDemo } from "./bits_comp/Menu";
import { ModeToggle } from "../components/mode-toggle";
import { SignIn } from "./bits_comp/SignIn";
import { SignUp } from "./bits_comp/SignUp";

interface NavProps {
  handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  username: string | null;
  handlelogout: () => void;
  handleSignIn: (e: React.FormEvent) => void;
  logoutStatus: boolean;
  fetchToken: string | null;
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
        { !logoutStatus &&fetchToken ? (
          <DropdownMenuDemo username={username} handlelogout={handlelogout} />
        ) : (
          <>
            <SignIn handleForm={handleForm} handleSignIn={handleSignIn} />
            <SignUp handleForm={handleForm} handleSubmit={handleSubmit} />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Nav;
