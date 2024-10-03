import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { InputUser } from '../../lib/types';
import { handleSignup } from '../../lib/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import* as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';


export function Signup() {
   const schema = yup.object({
    name:yup.string().required("name is required"),
    surname:yup.string().required("surname is required"),
    login:yup.string().required("login is required and must included number"),
    password:yup.string().min(6).required("password must be minimum 6")

   })

    const {register, handleSubmit,formState:{errors}, reset} = useForm<InputUser>({
        resolver:yupResolver(schema)
    })

    const [error, setError] = useState<string>("")

    const handleAdd:SubmitHandler<InputUser> =(data) => {
        const {name, surname, login, password} = data
       
        const user:InputUser = {name, surname, login, password}
        handleSignup(user)
        .then(response => {
            if(response.status == "error" && response.message){
                setError(response.message)

            }
        })
        reset()
    }
    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>

                            <form onSubmit = {handleSubmit(handleAdd)}>
                                {
                                    errors.name && <p className='text-danger'>{errors.name.message}</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                   
                                    type="text" placeholder="name" {...register("name")}
                                />

{
                                    errors.surname && <p className='text-danger'>{errors.surname.message}</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                  
                                     type="text" placeholder="surname" {...register("surname")}
                                />
                                {
                                    errors.login && <p className='text-danger'>{errors.login.message}</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                    
                                    type='text' placeholder='login' {...register("login")}
                                />
                                {
                                    errors.password && <p className='text-danger'>{errors.password.message}</p>
                                }
                                <MDBInput
                                    wrapperClass='mb-4'
                                    
                                    type='password' placeholder='password' {...register("password")}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}
