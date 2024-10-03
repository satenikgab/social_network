import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Dashboard } from './pages/Profile/Dashboard'
import { Settings } from './pages/Profile/Settings'
import { ChangeLogin } from './pages/Profile/Settings/ChangeLogin'
import { ChangePassword } from './pages/Profile/Settings/ChangePassword'
import { Posts } from './pages/Profile/Posts'
import { Search } from './pages/Profile/Search'
import { Account } from './components/Account'

import { ChangePrivacy } from './pages/Profile/Settings/ChangePrivacy'



const routes = createBrowserRouter([
  {
    path:'',
    element:<Signup/>
  },
  {
    path:'login',
    element:<Login/>
  },
  {
    path:"profile",
    element:<Profile/>,
    children:[
      {
        path:"",
        element:<Dashboard/>
      },
      {
        path:"posts",
        element:<Posts/>

      },
      {
        path:"search",
        element:<Search/>

      },
      {
        path:":id",
        element:<Account/>

      },
      {
        path:"settings",
        element:<Settings/>,
        children:[
          {
            path:"login",
            element:<ChangeLogin/>
          },
          {
            path:"password",
            element:<ChangePassword/>
          },
          {
            path:"set",
            element:<ChangePrivacy/>
    
          },
        ]

      }
      
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={routes}>
    </RouterProvider>
  </StrictMode>,
)
