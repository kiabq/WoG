// Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from './Components/Pages/HomePage';
import Account from './Components/Accounts/Account';
import LoginRedirect from './routing/LoginRedirect';

// Hooks
import { PublicRoute, PrivateRoute } from './hooks/useProvider';
import { AccountContext } from './hooks/useAccount';


const App = () => {
  return (
    <AccountContext>
      <Router>
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          <Route path="/connect/:providerName/redirect" element={<LoginRedirect/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/account" element={<Account/>}/>
          </Route>
          <Route path='*' element={<p>Not Found</p>}/>
        </Routes>
      </Router>
    </AccountContext>
  )
}

export default App;
