import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../utills/links";

//axios create api
const api = axios.create({
  baseURL: `${BASE_URL}${TOKEN_PATH}`,
});

//yup validation schema
const schema = yup.object().shape({
  username: yup.string().min(2).required("Please enter your username"),
  password: yup.string().min(8).max(32).required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(false);

  //get state of the authentication provider
  const [auth, setAuth] = useContext(AuthContext);

  //handle if logout button is clicked
  const logout = () => {
    setAuth(null);
    Router.push("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //handle when validation passes and submit is engaged
  const onSubmitHandler = async (data) => {
    setSubmitting(true);
    setLoginError(null);
    /*  console.log for debugging, commented out
     console.log({ data });   */

    try {
      //make an api call
      const response = await api.post("", data);
      //set response to authentication
      setAuth(response.data);
      //redirect user to admin page
      Router.push("/admin");
    } catch (error) {
      //catch error
      console.log("error", error);
      //set login error state to whatever the error is
      setLoginError(error.toString());
      //reset the form
      reset();
    } finally {
      //set submitting state back to false, user can input again
      setSubmitting(false);
    }
  };

  return (
    <>
      {!auth ? (
        //do this if the user is not authenticated
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          style={{ width: 300, marginLeft: "auto", marginRight: "auto" }}
        >
          {loginError && (
            <div className="login-error-container">
              <span>
                {loginError.includes("403")
                  ? "Wrong username or password"
                  : loginError}
              </span>
            </div>
          )}
          <fieldset disabled={submitting} className="login-form-container">
            <input
              {...register("username")}
              placeholder="username"
              type="name"
              required
            />
            <p style={{ color: "#B00020" }}>{errors.username?.message}</p>
            <input
              {...register("password")}
              placeholder="password"
              type="password"
              required
            />
            <p style={{ color: "#B00020" }}>{errors.password?.message}</p>
            <button type="submit">
              {submitting ? "Logging in..." : "Login"}
            </button>
          </fieldset>
        </form>
      ) : (
        //could redirect if user enters login automatically
        <>
          <button
            onClick={logout}
            style={{
              cursor: "pointer",
              marginRight: 5,
              padding: 5,
              letterSpacing: 1,
            }}
          >
            Logout
          </button>
          <button
            onClick={() => Router.push("/admin")}
            style={{ cursor: "pointer", padding: 5, letterSpacing: 1 }}
          >
            Admin
          </button>
        </>
      )}
    </>
  );
}
