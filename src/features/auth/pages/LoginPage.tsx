import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/inputPassword';
import { Label } from '@/components/ui/label';

export function LoginPage() {
    const { theme } = useTheme();
    // const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <>
            <div className="absolute top-[20px] right-[20px] z-20">
                <ModeToggle />
            </div>
            <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r  lg:flex">
                    <div className="absolute inset-0 bg-zinc-800" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <img
                            src="/assets/logo-white.png"
                            alt="logo-white-neuron"
                            className="w-[300px]"
                        />
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Welcome to White Neuron Smart Technology & IT Solutions,
                                where innovation meets excellence in the ever-evolving landscape of
                                technology. As a leading company at the forefront of smart
                                technology and IT solutions, White Neuron is dedicated to
                                transforming businesses through cutting-edge innovations and
                                intelligent solutions.&rdquo;
                            </p>
                            <footer className="text-sm">White Neuron</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
                            <p className="text-sm text-muted-foreground">
                                Nhập tên đăng nhập và mật khẩu để tiếp tục
                            </p>
                        </div>
                        <form>
                            <CardContent className="grid gap-3 px-6 py-4">
                                <div className="grid gap-2 mb-2">
                                    <Label htmlFor="username" className="mb-0.5">
                                        Tên đăng nhập
                                    </Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="haidang@gmail.com"
                                        autoComplete="username"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="mb-0.5">
                                        Mật khẩu
                                    </Label>
                                    <InputPassword id="password" placeholder="Nhập mật khẩu" />
                                </div>
                                <p className="text-end">
                                    <i className="text-sm ">Quên mật khẩu?</i>
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Đăng nhập</Button>
                            </CardFooter>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
