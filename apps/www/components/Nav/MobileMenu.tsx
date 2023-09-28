import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'

import { DEFAULT_EASE } from '~/lib/animations'
import { Accordion, Button, TextLink } from 'ui'
import MenuItem from './MenuItem'

import * as supabaseLogoWordmarkDark from 'common/assets/images/supabase-logo-wordmark--dark.png'
import * as supabaseLogoWordmarkLight from 'common/assets/images/supabase-logo-wordmark--light.png'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDarkMode: boolean
  menu: any
}

const MobileMenu = ({ open, setOpen, isDarkMode, menu }: Props) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.1, staggerChildren: 0.05, ease: DEFAULT_EASE } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  }

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: DEFAULT_EASE } },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence exitBeforeEnter>
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-overlay fixed overflow-hidden inset-0 z-50 h-screen max-h-screen w-screen supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] transform"
          >
            <div className="absolute h-16 px-6 flex items-center justify-between w-screen left-0 top-0 z-50 bg-overlay">
              <Link href="/" as="/">
                <a className="block w-auto h-6">
                  <Image
                    src={isDarkMode ? supabaseLogoWordmarkDark : supabaseLogoWordmarkLight}
                    width={124}
                    height={24}
                    alt="Supabase Logo"
                  />
                </a>
              </Link>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="inline-flex items-center justify-center p-2 bg-white rounded-md text-scale-900 focus:ring-brand dark:bg-scale-300 dark:hover:bg-scale-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-screen supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] overflow-y-auto py-8 px-4">
              <div className="mt-10 mb-20 space-y-1">
                <Accordion
                  type="default"
                  openBehaviour="multiple"
                  size="large"
                  className="py-2 space-y-1"
                  justified={true}
                  chevronAlign="right"
                >
                  {menu.primaryNav.map((menuItem: any) => (
                    <m.div
                      variants={listItem}
                      className="border-b [&>div]:!rounded-none"
                      key={menuItem.title}
                    >
                      {menuItem.hasDropdown ? (
                        <Accordion.Item
                          header={menuItem.title}
                          id={menuItem.title}
                          className="block relative py-2 pl-3 pr-4 text-base font-medium text-foreground hover:bg-overlay-hover hover:border-gray-300"
                        >
                          {menuItem.title === 'Product' ? (
                            Object.values(menuItem.subMenu)?.map((component: any) => (
                              <MenuItem
                                key={component.name}
                                title={component.name}
                                href={component.url}
                                description={component.description_short}
                                icon={component.icon}
                              />
                            ))
                          ) : menuItem.title === 'Developers' ? (
                            <div className="px-3 mb-2 flex flex-col gap-2">
                              {menuItem.subMenu['navigation'].map((column: any) => (
                                <div key={column.label} className="flex flex-col gap-3">
                                  {column.label !== 'Developers' && (
                                    <label className="text-muted text-xs uppercase tracking-widest font-mono mt-4">
                                      {column.label}
                                    </label>
                                  )}
                                  {column.links.map((link: any) => (
                                    <TextLink
                                      hasChevron={false}
                                      key={link.text}
                                      url={link.url}
                                      label={link.text}
                                      className="focus-visible:ring-offset-4 focus-visible:ring-offset-background-overlay !mt-0"
                                    />
                                  ))}
                                </div>
                              ))}

                              <div className="flex flex-col py-2">
                                <label className="text-muted text-xs uppercase tracking-widest font-mono">
                                  Troubleshooting
                                </label>
                                <TextLink
                                  hasChevron={false}
                                  url={menuItem.subMenu['footer']['support'].url}
                                  label={menuItem.subMenu['footer']['support'].text}
                                  className="focus-visible:ring-offset-4 focus-visible:ring-offset-background-overlay"
                                />
                                <TextLink
                                  hasChevron={false}
                                  url={menuItem.subMenu['footer']['systemStatus'].url}
                                  label={menuItem.subMenu['footer']['systemStatus'].text}
                                  className="focus-visible:ring-offset-4 focus-visible:ring-offset-background-overlay"
                                />
                              </div>
                            </div>
                          ) : null}
                        </Accordion.Item>
                      ) : (
                        <Link href={menuItem.url}>
                          <a className="block py-2 pl-3 pr-4 text-base font-medium text-scale-900 dark:hover:bg-scale-600 hover:border-gray-300 hover:bg-gray-50 dark:text-white">
                            {menuItem.title}
                          </a>
                        </Link>
                      )}
                    </m.div>
                  ))}
                </Accordion>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-auto w-full bg-alternative flex items-stretch p-4 gap-4">
              <Link href="https://supabase.com/dashboard" passHref>
                <Button block type="default" asChild>
                  <a className="">Sign in</a>
                </Button>
              </Link>
              <Link href="https://supabase.com/dashboard" passHref>
                <Button block asChild>
                  <a className="h-10 py-4">Start your project</a>
                </Button>
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-alternative fixed overflow-hidden inset-0 z-40 h-screen w-screen transform"
          />
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

export default MobileMenu