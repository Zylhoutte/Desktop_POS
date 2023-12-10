import React from 'react';
import { useSelector } from 'react-redux';
import Toggle from './ThemeToggle';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className='bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800 h-20'>
      <div className='container flex justify-between items-center mx-auto pt-3'>
        <div className='flex items-center mx-auto'>
          <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
            {user && user.role === 'admin' ? 'Admin' : null}
          </span>
        </div>

        <div className='flex justify-end pr-4'>
          {/* Your additional content goes here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
