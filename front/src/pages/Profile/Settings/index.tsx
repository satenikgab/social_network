import { NavLink, Outlet } from "react-router-dom"

export const Settings = () => {
    return <>
      <nav>
        <NavLink to="password">Change Password</NavLink>
        <NavLink to="login">Change Login</NavLink>
      </nav>
      <Outlet/>
    </>
}