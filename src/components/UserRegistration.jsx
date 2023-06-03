import React from "react";

export const UserRegistration = (props) => {
  const createAccount = () => {};
  return (
    <>
      <div className="loginMainBrock">
        <div className="loginBrock">
          <h1 className="createHead ">
            <span>CREATE</span> ACCOUNT
          </h1>
          <input placeholder="Username" type="text" className="user" />
          <input placeholder="Password" type="password" className="pass" />
          <button className="btn createAccountBtn" onClick={createAccount}>
            CREATE ACCOUNT
          </button>
          <h6 className="btn" onClick={() => props.pageChange("Login")}>
            Return Sign in
          </h6>
        </div>
      </div>
    </>
  );
};
