import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },

  {
    title: "Products",
    submenu: [
      {
        title: "Cookies",
      },
    ],
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
];
