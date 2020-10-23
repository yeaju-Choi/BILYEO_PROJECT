import React, { Component } from "react";
import "./form.css";
import axios from "axios";
export default class SignUp extends Component {
  state = {
    nameEntered: "",
    isNameValid: false,
    emailEntered: "",
    isEmailValid: false,
    // phoneNumberEntered: "",
    // isPhoneNumberValid: false,
    password: "",
    confirmPassword: "",
    isDuplicateUser: false, //중복이있는지확인
  };
  validateName = (nameEntered) => {
    if (nameEntered.length > 1) {
      this.setState({
        isNameValid: true,
        nameEntered,
      });
    } else {
      this.setState({
        isNameValid: false,
        nameEntered,
      });
    }
  };
  isEnteredNameValid = () => {
    const { nameEntered, isNameValid } = this.state;

    if (nameEntered) return isNameValid;
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

  validateEmail = (emailEntered) => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

    if (emailEntered.match(emailRegExp)) {
      this.setState({
        isEmailValid: true,
        emailEntered,
      });
    } else {
      this.setState({
        isEmailValid: false,
        emailEntered,
      });
    }
  };
  isEnteredEmailValid = () => {
    const { emailEntered, isEmailValid } = this.state;

    if (emailEntered) return isEmailValid;
  };
//   validatePhoneNumber = (phoneNumberInput) => {
//     const phoneNumberRegExp = /^\d{3}\d{3,4}\d{4}$/;

//     if (phoneNumberInput.match(phoneNumberRegExp)) {
//       this.setState({
//         isPhoneNumberValid: true,
//         phoneNumberEntered: phoneNumberInput,
//       });
//     } else {
//       this.setState({
//         isPhoneNumberValid: false,
//         phoneNumberEntered: phoneNumberInput,
//       });
//     }
//   };
//   isEnteredPhoneNumberValid = () => {
//     const { phoneNumberEntered, isPhoneNumberValid } = this.state;

//     if (phoneNumberEntered) return isPhoneNumberValid;
//   };

  isEveryFieldValid = () => {
    const { isNameValid, isEmailValid } = this.state;
    return isNameValid && isEmailValid;
  };

  renderSubmitBtn = () => {
    if (this.isEveryFieldValid()) {
      return (
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      );
    }

    return (
      <button type="submit" className="btn btn-primary btn-block" disabled>
        Submit
      </button>
    );
  };
  handleOnPasswordInput(passwordInput) {
    this.setState({ password: passwordInput });
  }

  handleOnConfirmPasswordInput(confirmPasswordInput) {
    this.setState({ confirmPassword: confirmPasswordInput });
  }

  doesPasswordMatch() {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  }

  confirmPasswordClassName() {
    const { confirmPassword } = this.state;

    if (confirmPassword) {
      return this.doesPasswordMatch() ? "is-valid" : "is-invalid";
    }
  }

  renderFeedbackMessageforPassword() {
    const { confirmPassword } = this.state;

    if (confirmPassword) {
      if (!this.doesPasswordMatch()) {
        return (
          <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
        );
      }
    }
  }

  async handleOnChange(emailEntered) {
    const response = await axios.get("http://localhost:8000/users");

    const users = response.data;
    const isUserFound = users.filter(
      (user) => user.email.toLowerCase() === emailEntered.toLowerCase()
    ).length;

    isUserFound
      ? this.setState({
          emailEntered,
          isDuplicateUser: true,
        })
      : this.setState({
          emailEntered,
          isDuplicateUser: false,
        });
  }

  emailInputClassName() {
    if (this.state.typedEmail) {
      return this.state.isDuplicateUser ? "is-invalid" : "is-valid";
    }
    return "";
  }

  renderFeedbackMessageforEmail() {
    if (this.state.typedEmail) {
      return this.state.isDuplicateUser ? (
        <div className="invalid-feedback">이미 등록되어 있는 이메일입니다</div>
      ) : (
        <div className="valid-feedback">사용할 수 있는 이메일입니다</div>
      );
    }
  }

  handleSubmit = (e) => {
    const {
      nameEntered,
      emailEntered,
      phoneNumberEntered,
      password,
    } = this.state;
    const signupInfo = {
      nameEntered: this.state.nameEntered,
      emailEntered: this.state.emailEntered,
      phoneNumberEntered: this.state.phoneNumberEntered,
      paswword: this.state.password,
    };
    const signup_info = {
      method: "POST",
      body: JSON.stringify(signupInfo),
      headers: {
        "Content-Type": "application/json",
      },
    };
    {
      fetch("http://localhost:8000/user", signup_info)
        .then(alert("가입이 완료되었습니다/"))
        .then(this.props.histoty.push("/login"));
    }
  };

  render() {
    return (
      <form className="my-form">
        <h3>Sign Up</h3>

        <div className="form-group">
          <label htmlFor="idInput">아이디</label>
          <input
            type="text"
            className="form-control"
            id="idInput"
            placeholder="아이디"
          />
        </div>

        <div className="form-group">
          <label htmlFor="passworkInput">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="비밀번호"
            onChange={(e) => this.handleOnPasswordInput(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPasswordInput">비밀번호 확인</label>
          <input
            type="password"
            className={`form-control ${this.confirmPasswordClassName()}`}
            id="confirmpasswordreInput"
            placeholder="비밀번호 확인"
            onChange={(e) => this.handleOnConfirmPasswordInput(e.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="nikname">닉네임</label>
          <input
            type="text"
            className="form-control"
            id="nicknameInput"
            placeholder="닉네임"
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            className={`form-control ${this.inputClassNameHelper(
              this.isEnteredNameValid()
            )}`}
            id="nameInput"
            placeholder="홍길동"
            onChange={(e) => this.validateName(e.target.value)}
            required
          />
        </div> */}

        <div className="form-group">
          <label>이메일 주소</label>
          <input
            type="email"
            className={`form-control ${this.inputClassNameHelper(
              this.isEnteredEmailValid(),
              this.emailInputClassName()
            )}`}
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="이메일"
            onChange={
              ((e) => this.validateEmail(e.target.value),
              (e) => this.handleOnChange(e.target.value))
            }
            required
          />
          {this.renderFeedbackMessageforEmail()}
        </div>

        {/* <div className="form-group">
          <label htmlFor="phoneNumberInput">휴대폰 번호</label>
          <input
            type="text"
            className={`form-control ${this.inputClassNameHelper(
              this.isEnteredPhoneNumberValid()
            )}`}
            id="phoneNumberInput"
            placeholder="- 빼고 입력"
            onChange={(e) => this.validatePhoneNumber(e.target.value)}
          />
        </div> */}

        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary btn-block"
        >
          {this.renderSubmitBtn()}
        </button>
        <p className="signin">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    );
  }
}
