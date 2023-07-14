import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle hover:bg-primary hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="hover:bg-primary hover:text-black">Homepage</a>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-black">Files</a>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-black">About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl bg-primary text-black hover:bg-opacity-80 hover:bg-primary">
          CloudStorage
        </a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="" alt="" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="hover:bg-primary hover:text-black">Profile</a>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-black">Settings</a>
            </li>
            <li>
              <a className="hover:bg-primary hover:text-black">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
