// Libraries
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"

// Components
import Home from './Components/Pages/HomePage';
import Account from './Components/Accounts/Account';
import LoginRedirect from './routing/LoginRedirect';

// Hooks
import { PublicRoute, PrivateRoute } from './hooks/useProvider';
import { AccountContext } from './hooks/useAccount';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoute/>}>
        <Route path='/' element={<Home/>}/>
      </Route>
      <Route path="/connect/discord/redirect" element={<LoginRedirect/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/account" element={<Account/>}/>
      </Route>
      <Route path='*' element={<p>Not Found</p>}/>
    </>
  )
)

const App = () => {
  return (
    <AccountContext>
      <RouterProvider router={router}/>
    </AccountContext>
  )
}

export default App;
