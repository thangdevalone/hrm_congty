import { ModeToggleCustome } from "@/components/mode-toggle-custome";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/inputPassword";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-3  w-screen h-screen ">
      <div className="col-span-2 flex flex-col">
        <div  className="py-3 px-4 ">
        <a href="/" className="cursor-pointer inline-block">
          {theme == "light" ? (
            <img className="w-[300px]" src="/assets/logo-black.jpg" />
          ) : (
            <img className="w-[300px]" src="/assets/logo-white.png" />
          )}
        </a>
        </div>
        <div className="flex flex-1 items-center  justify-center py-3 px-4">
          <div className="max-w-[400px] -translate-y-[50px]">
            <Card className="py-3 px-4">
              <form>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-3xl">Đăng nhập</CardTitle>
                  <CardDescription className="text-base">
                    Nhập tài khoản và mật khẩu để đăng nhập
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Tên đăng nhập</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder=""
                      autoComplete="username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <InputPassword id="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Đăng nhập</Button>
                </CardFooter>
              </form>
              <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                  © 2023{" "}
                  <a href="https://whiteneurons.com/" className="hover:underline">
                    WhiteNeuron®
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="h-screen relative bg-[hsl(var(---background))]">
        <div className="absolute top-[20px] right-[30px]">
          <ModeToggleCustome />
        </div>
      </div>
    </div>
  );
}
