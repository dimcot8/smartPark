import React, { useState, useEffect } from "react";
import bgImg from "../assets/img2.jpg";
import "../styles/login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Notification from "../components/Notification";
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    let timer;
    if (isLoginSuccess) {
      timer = setTimeout(() => {
        setIsLoginSuccess(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoginSuccess]);
  async function onSubmit(data) {
    console.log(data);
    try {
      const response = await fetch("https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 200 && responseData.success) {
        console.log("Login successful!");

        console.log("JWT Token: ", responseData.token);
        setIsLoginSuccess(true);
        navigate("/dashboard", { state: { email: data.email } });
      } else {
        setIsLoginSuccess(false);
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  }

  const col1Classes = classNames("col-1", {
    "responsive-col-1": window.innerWidth <= 768,
  });
  const col2Classes = classNames("col-2", {
    "responsive-col-2": window.innerWidth <= 768,
  });

  return (
    <section>
      <div className="login">
        <div className={col1Classes}>
          <h2>Smart Park</h2>
          <span>Login and enjoy the service</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="email"
            />
            <span className="error-message">{errors.email?.message}</span>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: async (value) => {
                    const emailValue = document.getElementById("email").value;
                    if (value === emailValue) {
                      return "Password should not match the email";
                    }
                    return true;
                  },
                })}
                placeholder="Password"
              />
              <span className="error-message">{errors.password?.message}</span>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {loginError && <p className="login-error-message">{loginError}</p>}

            <button className="btn">Login</button>
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Click here to sign up</Link>.
            </p>
          </form>
        </div>
        <div className={col2Classes}>
          <img src={bgImg} alt="" />
        </div>
      </div>
      <Notification
        listItems={
          isLoginSuccess
            ? [
                {
                  list: [
                    {
                      type: "Login",
                      content: "Login Successful",
                    },
                  ],
                },
              ]
            : []
        }
      />
    </section>
  );
}
