import React from 'react';
// import './App.css';
import Kanbas from "./Kanbas";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Labs from "./Labs";
import store from "./Kanbas/store";
import { Provider } from 'react-redux';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/Kanbas" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </Provider>
      </div>
    </HashRouter>
  );
}

export default App;
