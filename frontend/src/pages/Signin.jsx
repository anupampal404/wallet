import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Signin = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Signin"} />
          <SubHeading
            subHeading={"Enter your credentials to access your account"}
          />
          <InputBox label={"Email"} holder={"john@gmail.com"} onChange={e => {setUserName(e.target.value)}}/>
          <InputBox label={"Password"} holder={"123456"} onChange={e => {setPassword(e.target.value)}}/>
          <div className="pt-4">
          <Button label={"Sign in"} onClick={async (e) => {
            e.preventDefault();
            
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin",payload, {
                username : username,
                password : password,
              },{
                headers: {
                  "Content-Type" : 'application/json',
                  "Content-Length": JSON.stringify(payload).length
                }
              });
              if(response.status === 200) {
                setMessage('Sign in Successfull')
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
              }
            } catch(error) {
              if(error.response && error.response.status === 411) {
                setMessage("Invalid username or password");
              }
              else {
                setMessage("server error");
              }
            }
            
          }}/>
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
          <div><BottomWarning label={message}/></div>
        </div>
      </div>
    </div>
  );
};
