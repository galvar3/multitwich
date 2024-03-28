'use client';

import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Link,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Navbar,
    NavbarBrand,
    NavbarContent,
    Tab,
    Tabs,
    useDisclosure
} from '@nextui-org/react';
import { CloseIcon } from '@nextui-org/shared-icons';
import Image from 'next/image';
import { ThemeSwitcher } from '@/app/components/themeSwitcher';
import { dynaPuff } from '@/app/ui/fonts';

export default function Home() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [dimensions, setDimensions] = useState(
        { width: 0, height: 0, bestWidth: 0, bestHeight: 0 });
    const [channel, setChannel] = useState('');
    const [channels, setChannels] = useState({});
    const [channelToDelete, setChannelToDelete] = useState('');
    const [activeChat, setActiveChat] = useState<string | number>('');

    useEffect(() => {
        const handleResize = () => {
            const n = Object.keys(channels).length;
            const width = window.innerWidth - 320;
            const height = window.innerHeight;

            let bestHeight = 0;
            let bestWidth = 0;

            for (let perRow = 1; perRow <= n; perRow++) {
                const numRows = Math.ceil(n / perRow);
                let maxWidth = Math.floor(width / perRow) - 4;
                let maxHeight = Math.floor(height / numRows) - 4;

                if (maxWidth * 9 / 16 < maxHeight) {
                    maxHeight = maxWidth * 9 / 16;
                } else {
                    maxWidth = maxHeight * 16 / 9;
                }

                if (maxWidth > bestWidth) {
                    bestWidth = maxWidth;
                    bestHeight = maxHeight;
                }
            }

            setDimensions({
                width,
                height,
                bestWidth,
                bestHeight
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [channels]);

    return (
        <main className="h-screen max-h-screen flex justify-between overflow-hidden">
            <div className="flex flex-col w-full h-full">
                <Navbar isBordered>
                    <NavbarContent justify="start">
                        <NavbarBrand>
                            <Link href="/" className="flex items-center gap-1 font-semibold">
                                <Image src={'/logo.png'} alt={'Streameow Logo'} width={50} height={50} />
                                <p className={`${dynaPuff.className} font-semibold text-2xl text-foreground`}>
                                    Strea<span className={'text-primary'}>Meow</span>
                                </p>
                            </Link>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarContent as="div" justify="end">
                        <div className="flex items-center gap-1">
                            <Button
                                aria-label="twitter"
                                href="https://twitter.com/streameow"
                                as={Link}
                                variant="light"
                                isIconOnly
                                isExternal
                                className="text-medium hover:bg-default-200"
                            >𝕏
                            </Button>
                            <ThemeSwitcher></ThemeSwitcher>
                        </div>
                    </NavbarContent>
                </Navbar>

                <div className="h-full flex justify-between overflow-hidden">
                    <div className="flex justify-center m-auto gap-1">
                        {Object.keys(channels).length > 0 ?
                            <div className="flex flex-wrap justify-center">
                                {Object.keys(channels).map((ch, index) => (
                                    <div key={ch + index}
                                         className="relative"
                                    >
                                        <iframe className="border border-primary"
                                                src={`https://player.twitch.tv/?channel=${ch}&muted=true&parent=localhost&parent=streameow.com`}
                                                allowFullScreen
                                                style={{
                                                    width: `${dimensions.bestWidth}px`,
                                                    height: `${dimensions.bestHeight}px`
                                                }}
                                        >
                                        </iframe>
                                        <Button isIconOnly
                                                color="danger"
                                                variant="ghost"
                                                radius="full"
                                                size="sm"
                                                aria-label="delete stream"
                                                className="absolute top-4 right-4"
                                                onClick={() => {
                                                    setChannelToDelete(ch);
                                                    onOpen();
                                                }}
                                        >
                                            <CloseIcon />
                                        </Button>
                                    </div>
                                ))}
                            </div> :
                            <Card className="max-w-md bg-secondary">
                                <CardHeader className="flex gap-4">
                                    <Image src={'/logo.png'} alt={'Streameow Logo'} width={50} height={50} />
                                    <div className="flex flex-col">
                                        <p className="text-md">Multi Twitch</p>
                                        <p className="text-small text-default-500">Watch any number of streams at the
                                            same
                                            time</p>
                                    </div>
                                </CardHeader>
                                <Divider></Divider>
                                <CardBody>
                                    <p className="leading-7">Add each channel at the bottom, and remove them pressing
                                        the
                                        <Button isIconOnly
                                                color="danger"
                                                variant="ghost"
                                                radius="full"
                                                size="sm"
                                                aria-label="delete mock"
                                                className="mx-1"
                                        >
                                            <CloseIcon />
                                        </Button> button in the corner of each stream window</p>
                                </CardBody>
                            </Card>
                        }
                    </div>
                    <div className="h-full min-w-[320px] w-[320px] flex flex-col bg-background">
                        <Tabs aria-label="options"
                              className=""
                              size="sm"
                              color="primary"
                              selectedKey={activeChat}
                              onSelectionChange={setActiveChat}
                              classNames={{
                                  tabList: 'flex-wrap gap-0 rounded-none bg-background',
                                  tab: 'max-w-fit px-2',
                                  panel: 'h-full py-1 px-0'
                              }}>
                            {Object.keys(channels).map((ch) => (
                                <Tab key={ch}
                                     title={ch}>
                                </Tab>
                            ))}
                        </Tabs>
                        <div className="h-full relative">
                            {Object.keys(channels).map((ch, index) => (
                                <iframe key={ch + index}
                                        className={`absolute transition-left ${activeChat === ch ? 'left-0' : 'left-full'}`}
                                        src={`https://www.twitch.tv/embed/${ch}/chat?darkpopout&parent=localhost&parent=streameow.com`}
                                        height="100%"
                                        width="320px"
                                >
                                </iframe>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <Input type="text"
                                   label="New channel"
                                   aria-label="add channel"
                                   placeholder=""
                                   size="sm"
                                   radius="none"
                                   value={channel}
                                   onValueChange={setChannel} />
                            <Button color="primary"
                                    isDisabled={channel.length < 4}
                                    className="rounded-none h-full"
                                    onClick={() => {
                                        setChannels(prevChannels => ({ ...prevChannels, [channel]: true }));
                                        setChannel('');
                                    }}>
                                Add</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"
                            >{`Remove ${channelToDelete} stream?`}
                            </ModalHeader>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}
                                >No, cancel
                                </Button>
                                <Button color="danger" onPress={() => {
                                    setChannels(prevChannels => {
                                        const newChannels = { ...prevChannels };
                                        // @ts-ignore
                                        delete newChannels[channelToDelete];
                                        return newChannels;
                                    })
                                    onClose();
                                }
                                }>Yes, remove
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    )
}
