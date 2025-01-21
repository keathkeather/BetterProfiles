'use client';

import { Button } from 'primereact/button'; // PrimeReact Button
import { Card } from 'primereact/card'; // PrimeReact Card
import { InputText } from 'primereact/inputtext'; // PrimeReact InputText
import Link from 'next/link';
import { Navbar } from './components/navbar';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Navbar */}
      <header className='flex items-center justify-between bg-white px-6 py-4 shadow-md'>
        {/* <h1 className='text-xl font-bold'>UserDash</h1>
        <div className='flex items-center space-x-4'>
          <form className='flex items-center space-x-2'>
            <InputText
              placeholder='Search for users...'
              className='p-inputtext-sm'
            />
            <Button label='Search' className='p-button-sm p-button-outlined' />
          </form>
          <Button label='Login' className='p-button-sm p-button-outlined' />
          <Button label='Sign Up' className='p-button-sm' />
        </div> */}
      </header>

      {/* Main Content */}
      <main className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <Card className='w-full max-w-md shadow-2'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold mb-4'>Welcome to UserDash</h2>
            <p className='text-lg text-gray-600 mb-6'>
              Connect with professionals and explore their experiences.
            </p>
            <p className='text-sm text-gray-500 mb-6'>
              Create your own professional dashboard and connect with others!
            </p>
            <div className='flex justify-center space-x-4'>
              <Button
                label='Get Started'
                className='p-button p-button-primary'
              />
              <Button
                label='Create Your Profile'
                className='p-button-outlined'
              />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
