'use client';

import { useState } from 'react';
import { Button } from 'primereact/button'; // PrimeReact Button
import { InputText } from 'primereact/inputtext'; // PrimeReact InputText
import { useRouter } from 'next/navigation';

export default function UserSearch() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className='flex w-full max-w-sm space-x-[10]'>
      <InputText
        type='text'
        placeholder='Search for users...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full'
      />
      <Button label='Submit' />
    </form>
  );
}
