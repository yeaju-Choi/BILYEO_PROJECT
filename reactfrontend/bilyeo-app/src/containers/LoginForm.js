import React, { Component } from "react";
import axios from "axios";
import APIKit, { setClientToken, SetClientToken } from "../api/APIKit";
const initialState = {
  ID: "",
  password: "",
  errors: {},
  isAuthorizred: false,
  isLoading: false,
  IDEntered: "",
  PWEntered: "",
  isIDValid: false,
  isPWValid: false,
  isLogin: null,
};

export default class LoginForm extends Component {
  state = initialState;

  componentWillUnmount() {}

  onUserNameChane = (ID) => {
    this.setState({ ID });
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onPressLogin() {
    const { ID, password } = this.state;
    const payload = { ID, password };
    console.log(payload);

    const onSuccess = ({ data }) => {
      //json web 토큰을 성공으로 바꾼다
      setClientToken(data.token);
      this.setState({ isLoading: false, isAuthorizred: true });
    };

    const onFailure = (error) => {
      console.log(error && error.reponse);
      this.setState({ errors: error.reponse.data, isLoading: false });
    };

    this.setState({ isLoading: true }); //이부분은 api 손봐야됨
    APIKit.post("/api-token-auth", payload).then(onSuccess).catch(onFailure);
  }
  validateID = (IDEntered) => {
    if (IDEntered.length > 5) {
      this.setState({
        isIDValid: true,
        IDEntered,
      });
    } else {
      this.setState({
        isIDValid: false,
        IDEntered,
      });
    }
  };

  validatePW = (PWEntered) => {
    if (PWEntered.length > 5) {
      this.setState({
        isPWValid: true,
        PWEntered,
      });
    } else {
      this.setState({
        isPWValid: false,
        PWEntered,
      });
    }
  };

  inputClassNameHelper = (boolean) => {
    switch (boolean) {
      case true:
        return "is-valid";
      case false:
        return "is-invalid";
      default:
        return "";
    }
  };

  isEnteredIDValid = () => {
    const { IDEntered, isIDValid } = this.state;

    if (IDEntered) return isIDValid;
  };
  isEnteredPWValid = () => {
    const { PWEntered, isPWValid } = this.state;

    if (PWEntered) return isPWValid;
  };

  inputClassNameHelper = (boolean) => {
    switch (boolean) {
      case true:
        return "is-valid";
      case false:
        return "is-invalid";
      default:
        return "";
    }
  };

  isEveryFieldValid = () => {
    const { isNameValid, isEmailValid } = this.state;
    return isNameValid && isEmailValid;
  };

  //서버로 가입 양식 제출
  handleSubmit = (e) => {
    const login_info = {
      mothod: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8000/login", login_info)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success === true) {
          alert("로그인되었습니다");
          window.localStorage.setItem("userInfo", JSON.stringify(json));
          this.setState({
            idx: json.idx,
            ID: json.ID,
            email: json.email,
            nickname: json.nickname,
            isLogin: json.success,
          });
          this.props.history.push("/");
        } else {
          alert("아이디 혹은 비밀번호를 확인하세요");
        }
      });
  };
  render() {
    return (
      <form className="my-form">
        <h3>Sign In</h3>
        <div className="form-group">
          <label for="inputID">ID</label>
          <input
            type="ID"
            onChange={this.handleIDChange}
            id="inputID"
            className={`form-control ${this.inputClassNameHelper(
              this.isEnteredIDValid()
            )}`}
            placeholder="ID"
            onChange={(e) => this.validateID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label for="inputPW">Password</label>
          <input
            type="password"
            onChange={this.handlePWChange}
            id="inputPW"
            className={`form-control ${this.inputClassNameHelper(
              this.isEnteredPWValid()
            )}`}
            placeholder="Enter password"
            onChange={(e) => this.validatePW(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary btn-block"
        >
          Login
        </button>

        <p className="forgot-password text-right">
          <a href="/signup">Not a member?</a>
        </p>
      </form>
    );
  }
}
