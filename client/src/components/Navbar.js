import React from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
   let history = useNavigate();

   const handleClick= ()=>{
      localStorage.removeItem('token');
      history("/Login");
      props.showAlert("success", "Successful Logout");
   }
      let location = useLocation()
      React.useEffect(() => {
         console.log(location.pathname);
      }, [location]);

      return (
         <nav className={`navbar navbar-expand-lg navbar-${props.navbarMode} bg-${props.bgMode}`}>
            <div className="container-fluid">
               <Link className="navbar-brand" to="/">{props.title}</Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/Home" ? "active" : ""}`} aria-current="page" to="/Home">Home</Link>
                     </li>
                     <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/About" ? "active" : ""}`} aria-current="page" to="/About">About</Link>
                     </li>


                  </ul>
                  {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                     <Link type="button" to= "/Login" className="btn btn-danger mx-2">Login</Link>
                     <Link type="button" to="/SignUp" className="btn btn-danger mx-2">Signup</Link>
                  </form>: <button className='btn btn-danger' onClick={handleClick}>Logout</button>}
               </div>
            </div>
         </nav>
      )
   }

   export default Navbar
