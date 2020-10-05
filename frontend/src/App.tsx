import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './routes';
import {AuthProvider} from './hooks/AuthContext';

const App: React.FC = () => {

  return (
    <div className="App">
      <GlobalStyle/>
        <AuthProvider>
        <BrowserRouter>  
            <Routes/>
        </BrowserRouter>
        </AuthProvider>
      
    </div>
  );
}

export default App;
