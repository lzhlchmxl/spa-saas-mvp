import { Outlet } from 'react-router-dom';
import Footer from './app/PageComponents/Footer';
import Header from './app/PageComponents/Header';

export type IsAuthContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

function App() {

  return (
    <div className="flex flex-col w-full h-full justify-between items-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
