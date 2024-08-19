import logo from '../assets/logo.png';

export default function Logo() {
    return (
        <div className='p-1 m-1'>
            <a href="https://flowbite.com" className='flex max-w-fit' >
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Prime News" />
            </a>
        </div>
    )
}
