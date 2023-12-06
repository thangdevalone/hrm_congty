import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Breadcrumbs } from '.';
import { useTheme } from '../theme-provider';
import { Button } from '../ui/button';

const thangyeulink = [
    { text: 'home', path: 'home' },
    { text: 'user', path: 'user' },
    { text: 'đăng', path: 'dang' },
    { text: 'thắng', path: 'thang' },
    { text: 'Tiến', path: 'tien' },
];

export function Navbar() {
    const theme = useTheme();
    console.log(theme);
    const [isInputFocused, setIsInputFocused] = useState(false);

    return (
        <div className="flex gap-2  items-center h-9  mr-[70px]">
            <div
                className={`flex-2 flex items-center border h-full ${
                    isInputFocused ? 'focused' : ''
                }`}
            >
                <Breadcrumbs items={thangyeulink} />
            </div>
            <div className="flex flex-1 gap-3 h-full  justify-between items-center">
                <div
                    className={`flex flex-6 border rounded-[4px] px-2  cursor-pointer items-center gap-3 h-full ${
                        isInputFocused &&
                        theme.theme === 'light' &&
                        'border border-black rounded-[4px]'
                    } ${theme.theme === 'dark' && 'border borde-whiter'}`}
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="11"
                            cy="11"
                            r="6"
                            stroke={`${theme.theme === 'dark' ? '#ffffff' : '#222222'}`}
                        />
                        <path
                            d="M20 20L17 17"
                            stroke={`${theme.theme === 'dark' ? '#ffffff' : '#222222'}`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <input
                        type="text"
                        className={`outline-none ${theme.theme === 'dark' && 'bg-black'}`}
                        placeholder="Example: Hải Đăng, thangdevalone"
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                </div>
                <Button className="flex-1 cursor-pointer flex items-center justify-center h-full rounded-[4px]">
                    <span className="capitalize px-2 py-1">all leads</span>
                    <Cross2Icon />
                </Button>
            </div>
        </div>
    );
}
