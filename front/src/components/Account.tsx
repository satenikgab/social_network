import {  useParams } from "react-router-dom"
import { handleAccountBlock, handleCancelRequest, handleGetUserAccount, handleSendFollow, handleSendUnfollow } from "../lib/api"
import { IAccount } from "../lib/types"
import { useEffect, useState } from "react"
import { BASE_URL, DEFAULT_PIC, LOCK, UNLOCK } from "../lib/constant"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Gallery } from "./Gallery"



export const Account = () => {
    const  {id} = useParams()
    const [account, setAccount] = useState<IAccount | null>(null)
   

    const handleFollow = () => {
      if(account){
        if(account.connection.following){
          unfollowUser()
        } else if(account.connection.requested){
          cancelRequest()
        } else followUser()
      }

    }
    const handleBlock = () => {
   
      if(account && account?.id){
          handleAccountBlock(account.id)
          .then(response => {
            console.log(response)
            setAccount({
                        ...account,
                        connection:{...account.connection,didIBlock: !account.connection.didIBlock}
                      })
          })
        
      }
    }

 

    const followUser = () => {
      if(account && account.id){
        handleSendFollow(account.id)
        .then(response => {
          if(response.status == "following"){
            setAccount({
              ...account,
              connection:{...account.connection, following: true}})
          }  else if(response.status == "requested"){
            setAccount({
              ...account, 
              connection:{...account.connection, requested: true}})
          }
        })
      }

    }
    const unfollowUser = () => {
      if (account?.id) {
        handleSendUnfollow(account.id)
        .then((response) => {
          if (response.status == "unfollowed") {
            setAccount({
              ...account,
              connection: { ...account.connection, following: false },
              followers:
                account.followers &&
                account.followers.filter(a => a.id != id),
            })
          }
        })
      }
    }

    const cancelRequest = () => {
      if (account?.id) {
        handleCancelRequest(account.id).then((response) => {
          if (response.status == "cancelled") {
            setAccount({
              ...account,
              connection: { ...account.connection, requested: false },
            })
          }
        })
      }
    }
    
   
    useEffect(() => {
        if(!id){
            throw new Error("error")
        } else {
            handleGetUserAccount(id)
            .then(response => {
              console.log(response)
               
                setAccount(response.payload as IAccount)
            })
        }

    }, [id])
   


    
  return (
   account && <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                   {!account.connection.didIBlock ?<MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={!account?.picture ? DEFAULT_PIC : BASE_URL+ account?.picture }
                      alt='Generic placeholder image'
                      fluid /> : 
                      <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={ DEFAULT_PIC  }
                      alt='Generic placeholder image'
                      fluid />
                   }
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{account?.name} {account?.surname}</MDBCardTitle>
                    

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      
                    </div>
                    <div className="d-flex pt-1">
                      
                      <button onClick={handleFollow} className="btn btn-info">
                        {
                          account.connection.following?"UNFOLLOW":
                          account.connection.followsMe?"FOLLOW BACK":
                          account.connection.requested?"CANCEL REQUEST":
                          "FOLLOW"
                        }
                      </button>

                      {
                        account.connection.blockedMe? <p>you are blocked</p>:
                        <button onClick={handleBlock} className="btn btn-info" style={{background:"red"}}>
                          {
                          !account.connection.didIBlock?"BLOCK":
                          "UNBLOCK"
                        }
                      </button>
                      }
                      
                      
                      <MDBCardImage
                      style={{ width: '50px', borderRadius: '50px' }}
                      src={!account?.isPrivate ? UNLOCK : LOCK }
                      alt='Generic placeholder image'
                      fluid />
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      
      {
        account.posts &&!account.connection.didIBlock?<Gallery posts={account.posts} />:
        <p>THIS USER IS NOT AVAILABLE</p>
      }
    </div>
    
  );
}