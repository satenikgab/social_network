import { useOutletContext } from "react-router-dom"
import { IAccount, IContextType, IWideUser } from "../../../../lib/types"
import { useEffect } from "react"
import { handleAccountPrivacy } from "../../../../lib/api"
import { LOCK, UNLOCK } from "../../../../lib/constant"






export const ChangePrivacy = () => {
  const {account, setAccount} = useOutletContext<IContextType>()
  console.log(account)
  useEffect(() => {
    handleAccountPrivacy()
    .then(response => {
      console.log(response.payload as IContextType)
    })

  },[account])

  
 const handleChange = () => {
  const updated = {...account,isPrivate:!account.isPrivate}
  setAccount(updated)
 }
    
    return <>
      <h3>change privacy</h3>
      <p className={`${account.isPrivate?"private":"public"}`}>{account.isPrivate?"Private":"Public"}</p>
      <img className="privacy" src={account.isPrivate?LOCK:UNLOCK}/>
      <button className="btn" onClick={handleChange}>change privacy</button>
     
    </>
}