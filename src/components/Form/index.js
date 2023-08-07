import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { addUser } from "../DataStore/Action";

const RegistrationForm = () => {
  const initialValues = {
    id: new Date().getTime(),
    name: "",
    age: "",
    dateOfBirth: null,
    phoneNumber: "",
    Address: "",
    Password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // useEffect is used here for validation
  useEffect(() => {
   
    if (Object.keys(formError).length === 0 && isSubmit) {
     
    }
  }, [formError]);


  const dispatch = useDispatch();
 
  const handleSubmit = (e) => {
    e.preventDefault();
      setFormError(validate(userData));
      setIsSubmit(true);
      storeData()
      update(initialValues)
      const newUser = {
        ...userData, dateOfBirth : `${("0"+new Date(userData.dateOfBirth).getDate()).slice(-2)}-${("0" + (new Date(userData.dateOfBirth).getMonth() + 1)).slice(-2)}-${new Date(userData.dateOfBirth).getFullYear()}`
      };
      
      dispatch(addUser(newUser));
      if(Object.keys(formError).length === 0 && isSubmit){
         alert("Form successfully submitted")
        
      }
  };
  const validate = (values) => {
    const errors = {};
    const lettersOnlyRegex = /^[a-zA-Z ]+$/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const uppercaseRegex = /[A-Z]/;
    if (!values.name) {
      errors.name = "name is required!";
    } else if (!lettersOnlyRegex.test(values.name)) {
      errors.name = "name should contain only alphabets";
    }
    if (!values.age) {
      errors.age = "age is required!";
    }
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "date of birth is required!";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "phoneNumber is required!";
    }
    if (!values.Address) {
      errors.Address = "Address is required!";
    }
    if (!values.Password) {
      errors.Password = "Password is required!";
    } else if (
      !specialCharRegex.test(values.Password) &&
      !uppercaseRegex.test(values.Password)
    ) {
      errors.Password =
        "Password must contain one special character and one uppercase";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "confirmPassword is required!";
    }else  if(values.Password != values.confirmPassword){
         errors.confirmPassword="password not match"
    }
  
    return errors;
  };
  const handleDateChange = (date) => {
    setUserData({ ...userData, dateOfBirth: date });
  };

 function storeData(){
  let arrayData =JSON.parse(localStorage.getItem('FormData') || "[]");
  let prevData = {
    ...userData
  }
  arrayData.push(prevData)
  localStorage.setItem("FormData" ,JSON.stringify(arrayData))
 }

 function update(){
  setUserData(initialValues)
 }
  return (
    <div className="container">
      
      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="full name"
              maxLength={20}
            />
          </div>
          <p>{formError.name}</p>
          <div className="field" style={{ display: "flex",gap:"20px" }}>
          <div style={{width:"50%"}}>
            <label>Age</label>
            <input
              type="tel"
              name="age"
              minLength={1}
              maxLength={3}
              value={userData.age}
              onChange={handleChange}
              placeholder="age"
            />
            
            <p>{formError.age}</p>
            </div>
            <div style={{width:"50%"  ,display:"flex " ,flexDirection:"column"}}>
            <label>date of birth</label>
            <DatePicker
              selected={userData.dateOfBirth}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()} // this is not allowing user to set future dates
              isClearable
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
           
          <p>{formError.dateOfBirth}</p>
          </div>
          </div>
          <div className="field">
            <label>phone number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              placeholder="phone number"
              minLength={8}
              maxLength={10}
            />
          </div>
          <p>{formError.phoneNumber}</p>
          <div className="field">
            <label>Address</label>
            <input
              type="text"
              name="Address"
              value={userData.Address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          <p>{formError.Address}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="Password"
              minLength={10}
              value={userData.Password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <p>{formError.Password}</p>
          <div className="field">
            <label>confirmPassword</label>
            <input
              type="password"
              name="confirmPassword"
              minLength={10}
              value={userData.confirmPassword}
              onChange={handleChange}
              placeholder="confirm Password"
            />
          </div>
          <p>{formError.confirmPassword}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
