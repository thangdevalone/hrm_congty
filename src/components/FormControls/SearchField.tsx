import queryApi from '@/api/queryApi';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem } from '../ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea } from '../ui/scroll-area';
import { SearchSelection } from '../ui/searchSelection';
interface SearchFieldProps {
    typeApi: string;
    label: string;
    name: string;
    disabled?: boolean | undefined;
    placeholder: string;
    require?:boolean
}
export interface dataSearch {
    id: string | number;
    value: string;
}

export const SearchField = (props: SearchFieldProps) => {
    const { name, label, disabled = false, placeholder = '', typeApi,require=false } = props;
    const form = useFormContext();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<dataSearch[]>();
    const [search, setSearch] = useState<string>('');
    const debouncedValue = debounce((value) => {
        setSearch(value);
        // You can perform additional actions here, like making an API call with the debounced query.
    }, 500);
    const [choose, setChoose] = useState<string>('');
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        //call api search
        debouncedValue(value);
    };
    useEffect(() => {
        (async () => {
            try {
                const { data } = await queryApi.querySearch({query:search}, typeApi);
                setData(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [search, typeApi]);
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="">
                    <FormLabel className="relative">{label}{require&& <span className="text-xl absolute top-[-5px] right-[-10px] text-[red]"> *</span>}</FormLabel>
                    <FormControl>
                        <FormControl>
                            <Popover open={open} onOpenChange={setOpen}  {...field}>
                                <PopoverTrigger asChild>
                                    <Button
                                        disabled={disabled}
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between"
                                    >
                                        {choose ? choose : `${placeholder}`}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px]  p-0">
                                    <Command>
                                        <SearchSelection
                                            value={search}
                                            onChange={handleSearch}
                                            placeholder="Search ..."
                                        />
                                        <ScrollArea  className="h-[200px]">
                                            {data && data?.length > 0 ? (
                                                <CommandGroup {...field}>
                                                    {data.map((item) => (
                                                        <CommandItem
                                                            key={item.id}
                                                            className='justify-between'
                                                            value={`${item.value}`}
                                                            onSelect={(currentValue) => {
                                                                form.setValue(
                                                                    `${name}`,
                                                                    item.id
                                                                );
                                                                setChoose(currentValue);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            <span className='ml-1'>{item.value}</span>
                                                            <Check
                                                                className={cn(
                                                                    "h-4 w-4",
                                                                    field.value == item.value
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0'
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            ) : (
                                                <CommandEmpty>Không tìm thấy dữ liệu</CommandEmpty>
                                            )}
                                        </ScrollArea>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
