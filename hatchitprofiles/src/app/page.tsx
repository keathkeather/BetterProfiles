'use client';

import { Button } from 'primereact/button'; // PrimeReact Button
import { Card } from 'primereact/card'; // PrimeReact Card
import { InputText } from 'primereact/inputtext'; // PrimeReact InputText
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar } from './components/navbar';

const handle_link_to_profile = () => {
  const router = useRouter();
  router.push('/profile/edit'); 
}



export default function Home() {
  return (
    <div className='min-h-screen bg-gray-100 '>
 

      {/* Main Content */}
      <main className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 '>
        <Card className='w-full max-w-md shadow-2 '>
          <div className='text-center'>
            <h2 className='text-7xl font-bold mb-4'>Welcome to <span style={{ color: '#FA7422' }}>HatchProfiles</span></h2>
            <p className='text-lg text-gray-600 mb-6'>
              Connect with professionals and explore their experiences.
            </p>
           
            <div className='text-center mb-6'>
              <Button
                label='Get Started'
                className='p-button p-button-primary inline-block mb-2 mr-2' 
                style={{ backgroundColor: '#FA7422', borderColor: '#FA7422' ,}}
              />
              <Link href="/profile/edit">
                <Button
                  label='Create Your Profile'
                  className='p-button-outlined inline-block mb-2'
                  style={{borderColor: '#FA7422' ,color: '#524d4d'}}
                />
              </Link>
                

            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
