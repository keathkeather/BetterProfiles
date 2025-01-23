'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button'; // PrimeReact Button
import { InputText } from 'primereact/inputtext'; // PrimeReact Input
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUserData, clearUserData } from '../store/userslice';
import Cookies from 'js-cookie';
import { Menu } from 'primereact/menu'; // PrimeReact Menu
import { Avatar } from 'primereact/avatar'; // PrimeReact Avatar

export function Navbar() {
  const [search, setSearch] = useState('');
  const user = useSelector((state: RootState) => state.user.userData);
  const email = useSelector((state: RootState) => state.user._EMAIL);
  const userId = useSelector((state: RootState) => state.user._USER_ID);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const menu = useRef<Menu>(null);

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(clearUserData());
    router.push('/');
  };

  const handleDashboardNavigation = () => {
    if (userId) {
      router.push(`/dashboard?userId=${encodeURIComponent(userId)}`);} else {
      console.error('User ID not found');
    }
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: handleDashboardNavigation,
    },
    {
      label: 'Edit Profile',
      icon: 'pi pi-pencil',
      command: () => router.push('/profile/edit'),
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: handleLogout,
    },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md w-full sticky top-0 z-50 h-16"> {/* Set fixed height */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Side: Brand */}
        <div className="flex-shrink-0 font-bold font-mokoto">
          <Link href="/" className="text-2xl text-bold" style={{ color:'#FA7422',textDecoration: 'none' }}>
            HatchProfiles
          </Link>
        </div>

        {/* Right Side: Search Bar and Buttons */}
        <div className="flex items-center space-x-4 ml-auto"> {/* Added ml-auto */}
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center">
            <InputText
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-inputtext-sm rounded-l-md"
              style={{
                borderRadius: '0.375rem 0 0 0.375rem', // Rounded left corners
                borderColor: '#FA7422',
                color: '#524d4d',
              }}
            />
            <Button
              type="submit"
              icon="pi pi-search"
              className="p-button-sm bg-white rounded-r-md"
              style={{
                borderRadius: '0 0.375rem 0.375rem 0',
                borderColor: '#FA7422',
                color: '#524d4d',
              }}
            />
          </form>

          {/* Conditional Rendering Based on User Authentication */}
          {user ? (
            <>
              {/* Avatar Dropdown */}
              <div>
                <Avatar
                  label={email?.charAt(0).toUpperCase()}
                  size="large"
                  shape="circle"
                  style={{ backgroundColor: '#FA7422', color: '#ffffff', cursor: 'pointer' }}
                  onClick={(e) => menu.current?.toggle(e)}
                />
                <Menu model={menuItems} popup ref={menu} />
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="p-button-sm hover:bg-amber-400"
                style={{
                    backgroundColor: 'white',
                    borderColor: '#FA7422',
                    color: '#524d4d',
                    
                  }}>
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="p-button-sm "
                style={{
                  backgroundColor: 'white',
                  borderColor: '#FA7422',
                  color: '#524d4d',
                  
                }}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}