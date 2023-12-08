import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Breadcrumbs } from '.';
import { Input } from '../ui/input';


export function Navbar() {
    return (
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
            
                     

                 
    );
}
