import Navbar from './Navbar';

const Layout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
            <Navbar />
            { children }
        </div>
    );
}
 
export default Layout;