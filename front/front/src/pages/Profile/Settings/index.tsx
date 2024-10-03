import { NavLink, Outlet, useOutletContext } from "react-router-dom"
import { IContextType } from "../../../lib/types"

export const Settings = () => {
  const {account,setAccount} = useOutletContext<IContextType >()
    return <>
      <nav>
        <NavLink to="password">Change Password</NavLink>
        <NavLink to="login">Change Login</NavLink>
        <NavLink to="set">Change Privacy</NavLink>
      </nav>
      <Outlet context={{account,setAccount}} />
    </>
}