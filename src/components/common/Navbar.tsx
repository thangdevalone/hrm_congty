import { STATIC_HOST_NO_SPLASH } from '@/constants';
import { authActions } from '@/features/auth/AuthSlice';
import { useInfoUser } from '@/hooks';
import { Group, LogOut, SquareUserRound } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Breadcrumbs } from '.';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Navbar() {
    const user = useInfoUser();
    const dispatch = useDispatch();
    const [openAlertLogout, setOpenAlertLogout] = useState(false);
    const handleLogout = () => {
        dispatch(authActions.logout());
    };
    return (
        <div className="flex gap-2  items-center  pl-4 py-5 pr-[70px]  ">
            <div className="flex-2 flex items-center  h-full ml-5">
                <Breadcrumbs />
            </div>
            {/* <div className="flex flex-1 gap-3 h-full  justify-between items-center">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="w-[25px] absolute left-[5px] top-1/2 -translate-y-1/2 h-[25px] text-inh" />
                    <Input
                        type="text"
                        className={'pl-[35px]'}
                        placeholder="Nhập nội dung để tìm kiếm"
                    />
                </div>
            </div> */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <img
                        src={`${STATIC_HOST_NO_SPLASH + user?.PhotoPath}`}
                        alt="avatar"
                        className=" cursor-pointer w-10 h-10 border rounded-full"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer flex gap-2">
                        <SquareUserRound /> Thông tin cá nhân
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex gap-2">
                        <Group /> Nhóm
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenAlertLogout(true)}
                        className="cursor-pointer flex gap-2"
                    >
                        <LogOut />
                        Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={openAlertLogout} onOpenChange={setOpenAlertLogout}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc muốn đăng xuất?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Đăng xuất xong bạn sẽ không thể thao tác với dữ liệu của ứng dụng
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
