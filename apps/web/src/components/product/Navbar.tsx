'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white">
      {/* Inner container */}
      <div className="max-w-[1325px] h-[70px] mx-auto flex items-center px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src="/logo.png" alt="Tracecork" width={142} height={25} />
          </Link>
        </div>

        {/* Desktop pages links */}
        <div className="hidden md:flex md:items-center md:ml-[132px] space-x-[55px]">
          <Link href="/" className="text-black hover:text-gray-700">
            Home
          </Link>
          <Link href="/contact" className="text-black hover:text-gray-700">
            Contact Us
          </Link>
        </div>

        {/* Spacer pushes actions group to right */}
        <div className="hidden md:flex md:items-center md:ml-auto space-x-[53px]">
          <button className="text-black hover:text-gray-700">en</button>
          <Link href="/login" className="text-black hover:text-gray-700">
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-between w-6 h-5"
          >
            <span className="block h-[2px] bg-black"></span>
            <span className="block h-[2px] bg-black"></span>
            <span className="block h-[2px] bg-black"></span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <Link
            href="/"
            className="block px-4 py-2 text-black hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 text-black hover:bg-gray-100"
          >
            Contact Us
          </Link>
          <button className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100">
            EN
          </button>
          <Link
            href="/login"
            className="block px-4 py-2 text-black hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-2 text-black hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
