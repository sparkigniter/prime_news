import logo from '../assets/logo.png';

export default function Header({ children }) {
    return (<nav className="bg-white border-gray-200 dark:bg-gray-900 fixed">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {children}
        </div>

    </nav>);
}
