'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@nextui-org/shared-icons';
import { Button } from '@nextui-org/react';

export function ThemeSwitcher() {

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Button
            aria-label="switch theme"
            variant="light"
            isIconOnly
            className="text-medium hover:bg-default-200"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}
