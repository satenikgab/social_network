import { useParams } from "react-router-dom"
import { handleGetUserAccount } from "../lib/api"
import { IAccount, IPost, IUser } from "../lib/types"
import { useEffect, useState } from "react"
import { BASE_URL, DEFAULT_PIC, LOCK, UNLOCK } from "../lib/constant"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Gallery } from "./Gallery"


export const Account = () => {
    const  {id} = useParams()
    const [account, setAccount] = useState<IAccount | null>(null)
    
   
    useEffect(() => {
        if(!id){
            throw new Error("error")
        } else {
            handleGetUserAccount(id)
            .then(response => {
               
                setAccount(response.payload as IAccount)
            })
        }

    }, [account])
   


    
  return (
    <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={!account?.picture ? DEFAULT_PIC : BASE_URL+ account?.picture }
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{account?.name} {account?.surname}</MDBCardTitle>
                    

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      
                      <div className="px-3">
                        <p>followers</p>
                        <p className="small text-muted mb-1">{account?.followers?.length || 0}</p>
                        
                      </div>
                      <div>
                        <p>following</p>
                        <p className="small text-muted mb-1">{account?.following?.length || 0}</p>
                       
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      
                      <MDBBtn className="flex-grow-1">Follow</MDBBtn>
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
        !account?.isPrivate && <Gallery posts={account?.posts || [] }/>
      }
    </div>
    
  );
}