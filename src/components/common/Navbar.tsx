import { BellIcon, MagnifyingGlassIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '.';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

interface NavbarProps {
    navigation?: boolean;
}

export function Navbar({ navigation }: NavbarProps) {
    return (
        <>
            <div className="flex gap-2  items-center  pl-4 py-5 pr-[70px]  ">
                <div className="flex-2 flex items-center  h-full ml-5">
                    <Breadcrumbs />
                </div>
                <div className="flex flex-1 gap-3 h-full  justify-between items-center">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="w-[25px] absolute left-[5px] top-1/2 -translate-y-1/2 h-[25px] text-inh" />
                        <Input
                            type="text"
                            className={'pl-[35px]'}
                            placeholder="Nhập nội dung để tìm kiếm"
                        />
                    </div>
                </div>
            </div>
            <div className="pl-4 pr-[70px] pt-1 pb-4 flex justify-between flex-row">
                {navigation ? (
                    <>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link to="./employee">
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Nhân viên
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Công việc</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <ListItem
                                                href="./job-positions"
                                                title="Chức vụ nhân viên"
                                            >
                                                Quản lý thêm sửa xóa chức vụ trong công ty.
                                            </ListItem>
                                            <ListItem
                                                href="./employee-status"
                                                title="Trạng thái nhân viên"
                                            >
                                                Quản lý trạng thái của nhân viên.
                                            </ListItem>
                                            <ListItem href="./work-shifts" title="Ca làm việc">
                                                Quản lý ca làm việc của nhân viên.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="./organization">
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Tổ chức
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>{' '}
                    </>
                ) : (
                    <div></div>
                )}

                <div className="flex flex-row gap-3">
                    <Button className="rounded-[50%] p-0 w-9 h-9 ">
                        <BellIcon />
                    </Button>
                    <Button>
                        <PlusCircledIcon className="mr-2" />
                        Thêm
                    </Button>
                    <Button>
                        <Icons.filter className="mr-2 text-white dark:text-black" />
                        Lọc
                    </Button>
                </div>
            </div>
        </>
    );
}
