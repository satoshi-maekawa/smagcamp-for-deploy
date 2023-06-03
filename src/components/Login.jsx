import React from "react";

export const Login = (props) => {
  const login = (e) => {
    let pass = e.target.previousElementSibling;
    let user = pass.previousElementSibling;
    if (user.value === "admin" && pass.value === "admin") {
      props.pageChange("ItemList");
      localStorage.setItem("user", user.value);
    } else {
      window.alert("user or pass nothing");
    }
  };
  return (
    <>
      <div className="loginMainBrock">
        <div className="loginBrock">
          <h1 className="loginHead">
            <span>Smug</span> Camp
          </h1>
          <input placeholder="Username" type="text" className="user" />
          <input placeholder="Password" type="password" className="pass" />
          <button className="btn loginBtn" onClick={login}>
            Log in
          </button>
          <div className="hrLine">
            <hr className="hrStart" />
            <h6 className="NewSmugCamp">New SmugCamp?</h6>
            <hr className="hrEnd" />
          </div>
          <h6
            className="addAccount"
            onClick={() => props.pageChange("UserRegistration")}
          >
            Add Account
          </h6>
        </div>
      </div>
    </>
  );
};
