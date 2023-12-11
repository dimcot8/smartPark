import React, { useState } from "react";
import bgImg from "../assets/img1.jpeg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "../styles/signup.css";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  async function onSubmit(data) {
    if (isValid) {
      if (data.password === data.password2) {
        console.log(data);
        await fetch("https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).catch((err) => console.log(err));

        navigate("/login");
      } else {
        console.error("Passwords do not match.");
      }
    } else {
      console.error("Form contains validation errors.");
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
      <div className="register">
        <div className={col1Classes}>
          <h2>Smart Park</h2>
          <span>Register and enjoy the service</span>
          <form id="form" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              placeholder="Name"
            />
            {errors.name && <p className="error">Name is required</p>}
            <input
              type="text"
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              })}
              placeholder="Email"
            />
            {errors.email && <p className="error">Invalid email format</p>}

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Password"
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="password-container">
              <input
                type={showPassword1 ? "text" : "password"}
                {...register("password2", {
                  required: "Confirm Password is required",
                })}
                placeholder="Confirm Password"
              />
              {errors.password2 && <p className="error">{errors.password2.message}</p>}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? "Hide" : "Show"}
              </button>
            </div>
            <button className="btn" disabled={!isValid}>
              Sign In
            </button>
            <p>
              Already have an account? <Link to="/login">Click here to Login</Link>
            </p>
          </form>
        </div>
        <div className={col2Classes}>
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
}
