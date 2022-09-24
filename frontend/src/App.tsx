// Libraries
import React, { useCallback, useState, useEffect, createContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams, Navigate} from "react-router-dom";
import axios from 'axios';

// Components
import Home from './Components/Home/Home';
import Account from './Components/Accounts/Account';
import LoginRedirect from './Components/Accounts/LoginRedirect';

// Hooks
import { ConsumeAuth, PublicRoute, PrivateRoute, ProvideAuth, useAuth } from './hooks/useProvider';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route element={<PublicRoute/>}>
          </Route>
          <Route path='/connect/:providerName/redirect' element={<LoginRedirect />}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/account' element={<Account />}/>
          </Route>
          {/* <Route path='*' element={<p>Not Found</p>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;
