import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DataProvider from './Providers/DataProvider'
import Main from './components/MainComponent'

function App() {
  return <DataProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </DataProvider>
  
}

export default App;
