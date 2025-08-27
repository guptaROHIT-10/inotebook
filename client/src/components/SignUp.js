import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
   let history = useNavigate();
   const [data, setdata] = useState({ name: "", email: "", password: "" })

   const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:3000/api/auth/storeData`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",

         },
         body: JSON.stringify({ name: data.name, email: data.email, password: data.password })

      });
      const json = await response.json();
      console.log(json);

      // Save the auth token and redirect
      if (json.authToken) {   // or json.authtoken or json.token (based on backend)
         localStorage.setItem("token", json.authToken);
         history("/Home");
         props.showAlert("success", "Successful Signup");
      } else {
         props.showAlert("danger", "Invalid Data");

      }

   }

   const onChange = (e) => {
      setdata({ ...data, [e.target.name]: e.target.value })
   }
   return (
      <div>
         <div className="container my-3">
            <form>
               <div class="d-flex justify-content-center">
                  <h3>Signup Please</h3>
               </div>


               <div className="mb-3">
                  <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Enter Your Name: </label>
                     <input type="text" className="form-control" id="name" name="name" onChange={onChange} placeholder="Your Name" />
                  </div>
               </div>

               <div className="mb-3">
                  <div className="form-group">
                     <label htmlFor="exampleInputEmail1">Email address: </label>
                     <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Signup with Your Email address" />
                     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
               </div>

               <div className="mb-3">
                  <div className="form-group">
                     <label htmlFor="exampleInputPassword1">Enter Password: </label>
                     <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={onChange} placeholder="Create Strong Password" />
                  </div>
               </div>

               <div className="mb-3">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
               </div>

            </form>
         </div>
      </div>
   )
}

export default SignUp
