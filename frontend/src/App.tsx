import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./Components/NavBar";
import DataFormComponent_login from "./Pages/Login"; //login page
import SignupForm from "./Pages/SignUp";
import Home from "./Pages/Home";
import Admin_Page from "./views/admin";
import Blog from "./Pages/BlogF/Blog"
import './App.css';
import SinglePost from "./Pages/BlogF/singlePost"
//import Field_Officer_Page from "./views/field_officer";
import Field_officer_Page from "./views_field_officers/Field_officer_view";
import SignupForm_for_admin from "./views/admin_show_admin_adding_page";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<DataFormComponent_login/>}/>
            <Route path="/signup" element={<SignupForm/>}/>
            <Route path="/Blog" element={<Blog/>}/>
            <Route path = "/singlePost/:postId" element= {<SinglePost/>}/>
         
            
            <Route
              path="/admin"
              element={<Admin_Page />} // Display the Admin_Page component
            />
                          <Route
              path="/add_admins"
              element={<SignupForm_for_admin />} // Display the Admin_Page component
            />
              <Route
              path="/field_officer"
              element={<Field_officer_Page />} // Display the Admin_Page component
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  )

}

export default App;
