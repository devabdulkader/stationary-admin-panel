'use client';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LuSettings } from 'react-icons/lu';
import { TbChevronDown } from 'react-icons/tb';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CustomBackDrop from '@/components/common/CustomBackDrop';
import { usePathname } from 'next/navigation';
import { instance } from '@/axios/axiosInstance';

interface NavLink {
  title: string;
  href: string;
}
interface User {
  id: string;
  email: string;
  role: string;
}
const navLinks: NavLink[] = [
  { title: 'Inventory', href: '/' },
  { title: 'Accounts', href: '/accounts' },
  { title: 'Orders', href: '/orders' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // If on the login page, render only the Logo

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.post('', {
          query: `
            query GetUser {
              getUserById(id: "USER_ID") {
                id
                email
                role
              }
            }
          `,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        setUser(response.data.data.getUserById);
        console.log(user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (pathname === '/login') {
    return (
      <header className="bg-blue flex h-20 items-center px-5 py-5 2xl:px-10">
        <Logo />
      </header>
    );
  }
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div>
      <header className="bg-blue flex h-20 items-center px-5 py-5 2xl:px-10">
        <div className="flex w-full items-center justify-between">
          {/* Left side: Logo and Nav Links */}
          <div className="flex items-center gap-10">
            <Logo />
            <div className="hidden flex-grow sm:block">
              <Nav />
            </div>
          </div>

          {/* Right side: Notification, Settings, Profile */}
          <div className="hidden items-center space-x-3 sm:flex">
            <button className="group relative rounded-full p-2 hover:bg-gray-100 focus:bg-gray-100 focus:text-black">
              <Link href="/notifications">
                <IoNotificationsOutline
                  size={24}
                  className="text-white group-hover:text-slate-800"
                />
              </Link>
            </button>
            <button className="group relative rounded-full p-2 hover:bg-gray-100 focus:bg-gray-100 focus:text-black">
              <Link href="/settings">
                <LuSettings
                  size={24}
                  className="text-white group-hover:text-slate-800"
                />
              </Link>
            </button>
            <ProfileDropdown />
          </div>

          {/* Mobile Menu Button */}
          <div
            className="flex items-center justify-between py-2 sm:hidden"
            onClick={toggleMenu}
          >
            <div className="flex flex-col items-start gap-1.5">
              <div className="h-0.5 w-8 bg-white"></div>
              <div className="h-0.5 w-12 bg-white"></div>
            </div>
            <div className="ml-4 text-xl font-semibold text-white">Menu</div>
          </div>
        </div>
      </header>

      {/* Sliding menu for mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <section className="fixed left-0 top-0 z-30 h-screen w-screen">
            <CustomBackDrop onClose={toggleMenu} zIndex="100" />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5 }}
              className="z-20 h-full w-64 bg-white shadow-lg"
            >
              <div className="bg-blue h-20 p-5">
                <Logo />
              </div>
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block w-full px-5 py-3 text-lg text-black hover:bg-gray-100"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li className="block w-full px-5 py-3 text-lg text-black hover:bg-gray-100">
                  Notifications
                </li>
                <Link href="/settings">
                  <li className="block w-full px-5 py-3 text-lg text-black hover:bg-gray-100">
                    Settings
                  </li>
                </Link>
                <Link href="/profile">
                  <li className="block w-full px-5 py-3 text-lg text-black hover:bg-gray-100">
                    Profile
                  </li>
                </Link>
              </ul>
            </motion.div>
          </section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

const Nav = () => (
  <nav>
    <ul className="flex gap-5">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-lg text-white">
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const ProfileDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 rounded-lg border border-white p-2"
      >
        <Image
          src="/profile.jpeg"
          alt="user profile photo"
          height={300}
          width={300}
          className="h-8 w-8 rounded-full object-cover"
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
            transition={{ duration: 0.1 }}
            className="absolute right-0 top-12 z-10 w-56 rounded-md border bg-white shadow-lg"
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
  );
};
