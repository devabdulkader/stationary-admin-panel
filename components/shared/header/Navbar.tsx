'use client';
import React, { useState } from 'react';
import Logo from './Logo';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LuSettings } from 'react-icons/lu';
import { TbChevronDown } from 'react-icons/tb';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavLink {
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  { title: 'Inventory', href: '/' },
  { title: 'Accounts', href: '/accounts' },
  { title: 'Orders', href: '/orders' },
];

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <header className="bg-blue flex h-20 items-center px-5 py-5 2xl:px-10">
        <div className="mr-8 cursor-pointer">
          <Logo />
        </div>
        <div className="relative w-full max-w-md sm:ml-8">
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-lg text-white">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="ml-auto flex flex-shrink-0 items-center gap-4">
          <div className="ml-3 space-x-1 pl-3">
            <button className="foucus:text-slate-800 group relative rounded-full p-2 hover:bg-gray-100 focus:bg-gray-100">
              <IoNotificationsOutline
                size={24}
                className="text-white group-hover:text-slate-800 group-focus:text-black"
              />
            </button>
            <button className="foucus:text-slate-800 group relative rounded-full p-2 hover:bg-gray-100 focus:bg-gray-100">
              <LuSettings
                size={24}
                className="text-white group-hover:text-slate-800 group-focus:text-black"
              />
            </button>
          </div>
          <button
            onClick={toggleDropdown}
            className="relative inline-flex items-center gap-3 rounded-lg border border-white p-2"
          >
            <Image
              src="/profile.jpeg"
              alt="user profile photo"
              height={300}
              width={300}
              className="size-8 rounded-full object-cover"
            />
            <span className="text-white">Admin</span>
            <TbChevronDown className="text-white" size={24} />
          </button>
          {/* Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-20 w-56 rounded-md border bg-white"
              >
                <div className="cursor-pointer px-5 py-3 hover:bg-gray-100">
                  Profile
                </div>
                <div className="cursor-pointer px-5 py-3 hover:bg-gray-100">
                  Messages
                </div>
                <div className="cursor-pointer px-5 py-3 hover:bg-gray-100">
                  To Do
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
