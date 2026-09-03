import { useState } from "react";
import { Link } from "react-router-dom";
import ROLES_LIST from "../../ROLES_LIST";

const RoleDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const hasAdmin = user.roles?.Admin === ROLES_LIST.Admin;
  const hasCourier = user.roles?.Courier === ROLES_LIST.Courier;

  if (!hasAdmin && !hasCourier) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-black rounded cursor-pointer px-2 py-1 text-sm text-amber-200"
      >
        Dashboard
      </button>

      {open && (
        <div className="absolute -right-10 mt-2 w-40 backdrop-blur-sm rounded-lg shadow-lg z-50">
          <ul className="flex flex-col text-amber-200">
            {hasAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="block px-4 py-2 rounded-lg border-b border-gray-200/10 hover:bg-gray-200/50"
                  onClick={() => setOpen(false)}
                >
                  Admin
                </Link>
              </li>
            )}
            {hasCourier && (
              <li>
                <Link
                  to="/courier"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-200/50"
                  onClick={() => setOpen(false)}
                >
                  Courier
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
