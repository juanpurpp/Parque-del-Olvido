"use client";
import './globals.css'

import { Fragment, useEffect, useState } from 'react'
import { useRouter , usePathname, redirect} from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import api from '@/services/api'
import Image from 'next/image'
//import Logo from '/Logo.svg'
import ico from '@/assets/Cruz-white.ico'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Inter, Roboto } from 'next/font/google'
import Link from 'next/link';
const queryClient = new QueryClient()
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const roboto = Roboto({
  weight:'100',
  subsets: ['latin'],
  variable: '--font-roboto',
})

const navigation = [
  { name: 'Principal', href: '/', icon: HomeIcon, current: false , admin:false},
  { name: 'Usuarios', href: '/usuarios', icon: UsersIcon, current: false, admin:true },
  { name: 'Registros', href: '/registros', icon: FolderIcon, current: false, admin:false },
]
const publics = ['/login', '/register']

const {POST} = api('/api/authentication/renovate')
export default function RootLayout({ children }) {
  const rol = getCookie('rol') ?? 'no rol'
  const token = getCookie('token') ?? 'no token'
  useEffect(() => {
    if(rol !== 'Administrador') navigation.splice(1, 1);
    POST({token: token}).then(res=> {
      setCookie('token', res.data.token)
      setCookie('rol', res.data.rol)
    }) 
  }, [rol]);
  
  return (
    
    <html className="h-full bg-white" lang="es-cl">
      <body className={` font-sans h-full`}>
        <QueryClientProvider client={queryClient}>
          { 
            publics.includes(usePathname())
            ?
              children
            :
            <Layout>
              
                {children}
              
            </Layout>
          }
        </QueryClientProvider>
      </body>
    </html>
  )
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Logo(){
  return(
    <div>
      <Link id="logo" name="logo" href="/">
        <img
          src="/Logo.svg"
          className='mt-4 self-center h-16 w-16'
          alt="Parque del Olvido"
        />
      </Link>
    </div>
  )
}
function Layout({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const email = getCookie('email') ?? 'no email'
  //console.log('path', usePathname())
  return (
    <div >
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-white">
        <body className="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <Logo/>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                //  onClick={()=>setCurrent(item.href)}
                                  href={item.href}
                                  className={classNames(
                                    item.href===usePathname()
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Logo/>    
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          //onClick={()=>setCurrent(item.href)}
                          href={item.href}
                          className={classNames(
                            item.href===usePathname()
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <Menu></Menu>
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
                      alt=""
                    />
                    <span className="sr-only">Perfil</span>
                    <span aria-hidden="true">{email}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">{navigation.find(i=>i.href===usePathname()).name}</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src="https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72 ">
          <div className="px-4 sm:px-6 lg:px-8 overflow-x-auto overflow-y-hidden">{children}</div>
        </main>
      </div>
    </div>
  )
}
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const solutions = [
  { name: 'Salir de la cuenta', href: '#', onClick:()=>{
    deleteCookie('token')
    redirect('/login')
    
  }},
]
function Menu() {
  return (
    <Popover className="relative -top-4 ml-2">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-3 text-gray-50">
        <span>Opciones</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-3 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {solutions.map((item) => (
              <button key={item.name}  onClick={item.onClick} className="block  hover:text-indigo-600">
                {item.name}
              </button>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}