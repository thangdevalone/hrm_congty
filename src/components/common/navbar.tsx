interface Props {}

const Navbar = (props: Props) => {
    const {} = props;

    return (
        <div className="flex justify-between gap-2 items-center mr-[70px]">
            <div className="flex-2 border breadcrumbs">
                <ul>
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>Documents</a>
                    </li>
                    <li>Add Document</li>
                </ul>
            </div>
            <div className="flex flex-1 border justify-between items-center">
                <div className=" border">search</div>
                <div className=" border">all leads</div>
            </div>
        </div>
    );
};

export default Navbar;
