import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export function AboutDropdown({ isScrolled }) {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = React.useState(false);

  const menuItems = [
    {
      title: t('location'),
      path: "/location",
    },
    {
      title: t('expo_initiatives'),
      path: "/about/team",
    }
  ];

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className={`flex items-center gap-2 text-base font-bold capitalize tracking-normal p-0 hover:bg-transparent focus:bg-transparent active:bg-transparent ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          {t('about')} AGS{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-4 w-4 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="min-w-[150px] bg-white p-1 border-white z-50">
        {menuItems.map(({ title, path }) => (
          <NavLink to={path} key={title} className="w-full">
            <MenuItem className="hover:bg-gray-100 py-2 px-4 rounded-md w-full text-left border-white text-lg">
              <Typography 
                variant="small" 
                className="font-sans font-bold text-gray-900"
              >
                {title}
              </Typography>
            </MenuItem>
          </NavLink>
        ))}
      </MenuList>
    </Menu>
  );
}