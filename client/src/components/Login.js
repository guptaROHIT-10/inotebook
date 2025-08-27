import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
   let history = useNavigate();
   const [data, setdata] = useState({ email: "", password: "" })

   const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:3000/api/auth/checkData`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",

         },
         body: JSON.stringify({ email: data.email, password: data.password })

      });
      const json = await response.json();
      console.log(json);

      if (json.success) {
         // Save the auth token and redirect
         localStorage.setItem('token', json.authToken);
         history("/Home");
         props.showAlert("success", "Successful Login");

      }
      else {
         props.showAlert("danger", "Invalid Data");
      }
   }

   const onChange = (e) => {
      setdata({ ...data, [e.target.name]: e.target.value })
   }
   return (
      <div>
         <div className="container my-3 mt-5">
            <div className="d-flex justify-content-center">
               <h3>Login Please</h3>
            </div>

            
            <form >

               <div className="mb-3">
                  <div className="form-group">
                     <label htmlFor="exampleInputEmail1">Email address: </label>
                     <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
               </div>

               <div className="mb-3">
                  <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Enter Password: </label>
                     <input type="password" className="form-control" id="password" name="password" onChange={onChange} placeholder="Enter Password" />
                  </div>
               </div>

               <div className="mb-3">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
               </div>

            </form>
         </div>

      </div>
   )
}

export default Login
