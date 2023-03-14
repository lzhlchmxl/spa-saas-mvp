import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './app/PageComponents/Footer';
import Header from './app/PageComponents/Header';

export type IsAuthContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="flex flex-col w-full h-full justify-between items-center">
      <Header 
        isAuthenticated={isAuthenticated}
      />
      <Outlet 
        context={[isAuthenticated, setIsAuthenticated]}
      />
      <Footer />
    </div>
  );
}

export default App;
