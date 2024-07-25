import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Signup = () => {
  const [username, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signup"} />
          <SubHeading
            subHeading={"Enter your information to create an account"}
          />
          <InputBox label={"First Name"} holder={"John"}
            onChange = {e => {setFirstName(e.target.value)}}
          />
          <InputBox label={"Last Name"} holder={"Doe"}
            onChange = {e => {setLastName(e.target.value)}}
          />
          <InputBox label={"Email"} holder={"john@gmail.com"}
            onChange = {e => {setUserName(e.target.value)}}
           />
          <InputBox label={"Password"} holder={"123456"} 
            onChange = {e => {setPassword(e.target.value)}}
          />
          <div className="pt-4">

            {/* making backend call to create user */}
          <Button label={"Sign up"} onClick={ async () => {
            const response = await axios.post("https://moneywallet-backend.onrender.com/api/v1/user/signup", {
              username : username,
              password : password,
              firstName : firstName,
              lastName : lastName
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
