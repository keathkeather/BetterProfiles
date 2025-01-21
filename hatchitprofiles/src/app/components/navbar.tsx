'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'primereact/button'; // PrimeReact Button
import { InputText } from 'primereact/inputtext'; // PrimeReact Input
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16'>
        {/* Left Side: Logo */}
        <div className='flex items-center'>
          <Link href='/' className='text-2xl font-bold text-gray-900'>
            UserDash
          </Link>
        </div>

        {/* Right Side: Search Bar and Actions */}
        <div className='flex items-center space-x-4'>
          {/* Search Form */}
          <form onSubmit={handleSearch} className='flex items-center'>
            <InputText
              type='text'
              placeholder='Search for users...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='p-inputtext-sm mr-2'
            />
            <Button type='submit' label='Search' className='p-button-sm' />
          </form>

          {/* Login & Sign Up Buttons */}
          <Button className='p-button-outlined p-button-sm'>
            <Link href='/login'>Login</Link>
          </Button>
          <Button className='p-button-sm'>
            <Link href='/signup'>Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
