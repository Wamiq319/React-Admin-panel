import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SidebarContext } from "../../context/SidebarContext";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaBox, FaChartLine, FaClipboardList, FaUndo } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";

const SideBar = () => {
  const { isSidebarCollapsed } = useContext(SidebarContext);
  const words = useSelector((state) => state.lang.words);
  const lang = useSelector((state) => state.lang.lang);
  const location = useLocation(); // Track current location

  const menus = [
    {
      name: words["Dashboard"],
      link: "/home/dashboard",
      icon: MdOutlineDashboard,
      subMenu: [
        { name: words["Overview"], link: "/home/dashboard" },
        {
          name: words["Sales"],
          link: "/home/sales-analytics",
          icon: IoMdAnalytics,
        },
      ],
    },
    {
      name: words["Products"],
      link: "/home/products",
      icon: FaBox,
      subMenu: [
        { name: words["Products List"], link: "/home/products" },
        { name: words["Product Upload"], link: "/home/product-upload" },
        { name: words["Product Classification"], link: "/home/classification" },
        { name: words["Product Attributes"], link: "/home/attributes" },
      ],
    },

    {
      name: words["Orders"],
      link: "/home/all-orders",
      icon: FaBox,
      subMenu: [
        { name: words["All Orders"], link: "/home/all-orders" },
        { name: words["New Orders"], link: "/home/new-orders" },
        { name: words["Pending Orders"], link: "/home/pending-orders" },
        { name: words["Completed Orders"], link: "/home/completed-orders" },
        {
          name: words["Returns/Refunds"],
          link: "/home/returns-refunds",
          icon: FaUndo,
        },
      ],
    },
    {
      name: words["Users"], // Main Menu for User Management
      link: "/home/user-list",
      icon: AiOutlineUser,
      subMenu: [
        { name: words["User List"], link: "/home/user-list" }, // List of users
        { name: words["Add User"], link: "/home/add-user" }, // Add a new user
        { name: words["User Roles"], link: "/home/user-roles" }, // Manage user roles (optional)
      ],
    },
  ];

  const [openSubMenu, setOpenSubMenu] = useState({});
  const handleSubMenuToggle = (menuName) => {
    setOpenSubMenu((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  return (
    <div
      className={`Side-bar bg-white ${
        isSidebarCollapsed ? "w-20 bg-opacity-45" : "w-72"
      } duration-1000 transition-all text-slate-700 pt-0 pb-11`}
    >
      <div className="mt-4 flex flex-col gap-2 relative z-20">
        {menus.map((menu, i) => {
          const isActive =
            location.pathname === menu.link ||
            menu.subMenu?.some(
              (subMenuItem) => location.pathname === subMenuItem.link
            );

          return (
            <div key={i}>
              <div
                className={`flex items-center justify-start w-full ${
                  isActive
                    ? "bg-slate-300 text-orange-400 rounded-md"
                    : "hover:bg-slate-300 hover:text-orange-400 hover:rounded-md"
                }`}
              >
                <Link
                  to={menu.link}
                  className={`group flex items-center text-lg gap-3.5 font-bold p-4`}
                >
                  <div className="group-hover:text-orange-400 transition">
                    {menu.icon
                      ? React.createElement(menu.icon, { size: "20" })
                      : null}
                  </div>
                  <h3
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-1000 ${
                      isSidebarCollapsed
                        ? lang === "urd"
                          ? "translate-x-[-7rem] opacity-0"
                          : "translate-x-28 opacity-0"
                        : ""
                    }`}
                  >
                    {menu.name}
                  </h3>

                  {menu.subMenu && !isSidebarCollapsed && (
                    <button
                      className="ml-auto p-2"
                      onClick={() => handleSubMenuToggle(menu.name)}
                    >
                      {openSubMenu[menu.name] ? (
                        <FaChevronDown size={14} />
                      ) : (
                        <FaChevronRight
                          size={14}
                          className={
                            lang === "urd" || lang == "ar" ? "rotate-180" : ""
                          }
                        />
                      )}
                    </button>
                  )}
                </Link>
              </div>

              {/* Submenu toggle and active submenu */}
              {menu.subMenu &&
                openSubMenu[menu.name] &&
                !isSidebarCollapsed && (
                  <div className="ml-6 mt-2">
                    {menu.subMenu.map((subMenuItem, j) => {
                      const isSubMenuActive =
                        location.pathname === subMenuItem.link;
                      return (
                        <div key={j} className="relative group">
                          <Link
                            to={subMenuItem.link}
                            className={`flex align-middle p-2 ${
                              isSubMenuActive
                                ? "bg-gray-300 text-orange-500"
                                : "hover:bg-gray-300 hover:text-orange-500"
                            } rounded-md`}
                          >
                            <h4 className="mx-1">{subMenuItem.name}</h4>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
