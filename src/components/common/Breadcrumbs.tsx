import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface PathItem {
    text: string;
    path: string;
}

interface BreadcrumbsProps {
    items: PathItem[];
}
export const Breadcrumbs = (props: BreadcrumbsProps) => {
    const { items } = props;
    const location = useLocation();

    return (
        <div className="flex gap-3 ">
            {items.map((item, index) => (
                <div key={`${item}${index}`} className="flex gap-2 items-center justify-center ">
                    <span
                        className={`${
                            location.pathname.includes(item.path) && 'text-blue-600 font-semibold'
                        } cursor-pointer text-lg `}
                    >
                        {item.text}
                    </span>
                    {index !== items.length - 1 && (
                        <span>
                            <ChevronRight size={20} />
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};
