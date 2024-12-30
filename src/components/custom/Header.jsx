import { Button } from "../ui/button";

const Header = () => {
    return (
        <div className="p-3 shadow-sm flex justify-between items-center px-5 bg-white">
            <div className="flex items-center">
                <img className="h-20 w-20" src="/logo.svg" alt="Logo" />
                <h3 className="font-mono text-xl text-gray-800 tracking-wide">AI-Nomad</h3>
            </div>
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    );
};

export default Header;
