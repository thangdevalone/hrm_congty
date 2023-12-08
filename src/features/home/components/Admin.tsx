import { Navbar } from '@/components/common';
import {
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link, Outlet } from 'react-router-dom';
{/* <div className="flex flex-row gap-3">
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
            </div> */}
export const Admin = () => {
    return (
        <>
            <div className="nav-bs dark:border-b">
                <Navbar  />
                <div className="pl-4 pr-[70px] pt-1 pb-4 flex justify-between flex-row">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="./employee">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Nhân viên
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Công việc</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <ListItem href="./job-positions" title="Chức vụ nhân viên">
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
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Tổ chức
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div className="p-5 flex-1 relative">
                <Outlet />
            </div>
        </>
    );
};
