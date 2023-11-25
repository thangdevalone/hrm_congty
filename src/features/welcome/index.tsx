import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import * as React from 'react';

export interface WelcomeProps {}

export default function Welcome(props: WelcomeProps) {
    const { theme } = useTheme();
    return (
        <div className="h-screen w-screen">
            <header>
                <div className="py-5 px-[50px] flex items-center justify-between ">
                    <a href="/" className="cursor-pointer inline-block">
                        {theme == 'light' ? (
                            <img className="w-[300px]" src="/assets/logo-black.jpg" />
                        ) : (
                            <img className="w-[300px]" src="/assets/logo-white.png" />
                        )}
                    </a>
                    <div className="flex items-center gap-5">
                        <a
                            href="https://whiteneurons.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg mr-[20px] hover:underline font"
                        >
                            Trang chủ
                        </a>
                        <a
                            href="https://whiteneurons.com/contact.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg mr-[20px] hover:underline font"
                        >
                            Liên hệ
                        </a>
                        <Button>Đăng nhập</Button>
                        <ModeToggle />
                    </div>
                </div>
            </header>
            <section className="main-content mx-auto">
                <div className="container text-center flex flex-col items-center max-w-[1024px] pt-[100px]">
                    <div className="max-w-[800px]">
                        <h1 className="text-[3.5rem] leading-[1.5] mb-4 font-bold">
                            Chào mừng đến với ứng dụng quản trị nhân sự
                        </h1>
                        <p className="leading-[1.875] mb-5 px-[10px]">
                            Ứng dụng được phát triển và xây dựng cho cục bộ không nhằm mục đích kiếm
                            tiền. Mọi thắc mắc xin liên hệ với công ty để được hướng dẫn và giải
                            quyết!{' '}
                        </p>
                        <a href="/login">
                            <Button
                                className="w-[250px] h-[50px] border-black dark:border-white"
                                variant={'outline'}
                            >
                                Bắt đầu ngay!
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
