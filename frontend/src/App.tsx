import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './routes';

import AppProvider from './hooks/index';

const App: React.FC = () => {

  return (
    <div className="App">
      <GlobalStyle/>
        <AppProvider>
          <BrowserRouter>  
              <Routes/>
          </BrowserRouter>
        </AppProvider>
      
    </div>
  );
}

export default App;
