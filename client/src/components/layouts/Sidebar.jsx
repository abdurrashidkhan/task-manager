import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FiLink, FiUsers, FiMessageCircle } from "react-icons/fi";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[4%] bg-white border-r border-white shadow-2xl flex flex-col justify-between items-center py-4 h-screen">
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />

        {/* Menu */}
        <nav className="flex flex-col items-center space-y-6">
          <SidebarLink to="/dashboard" icon={<Squares2X2Icon className="w-6 h-6" />} />
          <SidebarLink to="/team" icon={<FiUsers size={22} />} />
          <SidebarLink to="/chat" icon={<FiMessageCircle size={22} />} />
          <SidebarLink to="/links" icon={<FiLink size={22} />} />
        </nav>
      </div>

      {/* Middle Avatars */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar src="https://i.pravatar.cc/40?img=1" />
        <Avatar src="https://i.pravatar.cc/40?img=2" />
        <Avatar src="https://i.pravatar.cc/40?img=3" />
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
          <PlusIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Bottom Settings */}
      <div className="flex flex-col items-center">
        <button className="hover:text-purple-500 transition-colors">
          <Cog6ToothIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </aside>
  );
};

// Sidebar link with purple active indicator
const SidebarLink = ({ to, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center justify-center w-full group`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 w-1 h-6 bg-purple-500 rounded-full"></span>
          )}
          <div
            className={`p-2 rounded-lg transition-colors ${
              isActive
                ? "text-purple-500"
                : "text-gray-500 group-hover:text-purple-500"
            }`}
          >
            {icon}
          </div>
        </>
      )}
    </NavLink>
  );
};

// Avatar component
const Avatar = ({ src }) => (
  <div className="w-8 h-8 rounded-full overflow-hidden">
    <img src={src} alt="avatar" className="w-full h-full object-cover" />
  </div>
);

export default Sidebar;
