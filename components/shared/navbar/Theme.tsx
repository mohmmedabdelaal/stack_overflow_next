'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { themes } from '@/constants';
import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none">
      <MenubarMenu>
        <MenubarTrigger>
          {mode === 'light' ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              height={20}
              width={20}
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              height={20}
              width={20}
            />
          )}
        </MenubarTrigger>

        <MenubarContent
          className="absolute right-[-3rem]
        mt-3 min-w-[120px] 
        rounded border bg-light-900
        py-2 dark:border-dark-400 dark:bg-dark-300"
        >
          {themes.map((items) => (
            <MenubarItem
              className="cursor-pointer"
              key={items.value}
              onClick={() => {
                setMode(items.value);
                if (items.value !== 'system') {
                  localStorage.theme = items.value;
                } else {
                  localStorage.removeItem('themes');
                }
              }}
            >
              <Image
                src={items.icon}
                alt={items.value}
                width={16}
                height={16}
                className={`${mode === items.value && 'active-theme'}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === items.value
                    ? 'text-primary-500 '
                    : 'text-dark100_light900'
                }`}
              >
                {items.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
