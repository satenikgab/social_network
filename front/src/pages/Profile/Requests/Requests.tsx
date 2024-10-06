import { useEffect, useState } from "react"
import { IRequest, IUser } from "../../../lib/types"
import { getAllRequestedUsers, handleAcceptRequest, handleDeclineRequest } from "../../../lib/api"
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant"

export const Requests = () => {


    const [requestedUser, setRequestedUser] = useState<IRequest[]>([])
    useEffect(() => {
        getAllRequestedUsers()
        .then(response => {
            setRequestedUser(response.payload as IRequest[])
        })

    },[requestedUser])
    
    
const handleAccept = (id:number) => {
    handleAcceptRequest(id)
    .then(() => {
        setRequestedUser(requestedUser.filter(u => u.id != id))
    })

}


const handleDecline = (id:number) => {
    handleDeclineRequest(id)
    .then(() => {
        setRequestedUser(requestedUser.filter(u => u.id != id))
    })

}

    return <>
      <h3>Requests</h3>
      {
        requestedUser.map(user => <div key={user.id}>
            <p>{user.user.name} {user.user.surname}</p>
            <img className="pic" src={user.user.picture?BASE_URL+user.user.picture:DEFAULT_PIC} />
            <button onClick= {() =>handleAccept(user.id)} className="btn">accept</button>
            <button onClick={() => handleDecline(user.id)} className="btn">decline</button>
        </div>)
      }

    </>
}