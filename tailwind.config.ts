import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    },
    darkMode: 'class',
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    primary: {
                        DEFAULT: '#17C964',
                        foreground: '#FFF'
                    },
                    secondary: '#f2f2f2',
                }
            },
            dark: {
                colors: {
                    background: '#10141c',
                    primary: {
                        DEFAULT: '#17C964',
                        foreground: '#000'
                    },
                    secondary: '#303b4e',
                }
            }
        }
    })],
};
export default config;
