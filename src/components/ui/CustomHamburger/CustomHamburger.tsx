"use client";

import { useSidebarStore } from "@/components/entities/DropdownHeader/store";
import React from "react";



const CustomHamburger = () => {
  const setIsDropdownOpened = useSidebarStore((state) => state.toggleIsOpened);
  const isDropdownOpened = useSidebarStore((state) => state.isOpened);
  
  return <button onClick={() => setIsDropdownOpened(!isDropdownOpened)}>ыловмпы</button>;
};

export default CustomHamburger;
