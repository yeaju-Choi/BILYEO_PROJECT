import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillNotification, AiOutlineSearch } from "react-icons/ai"
import { BiLogOutCircle } from "react-icons/bi"
import  { CgProfile } from "react-icons/cg"
import './Layout.scss';

const Layout = ({children}) => {

    return (
        <div className="Layout">
        <div className="MainHeader">
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
                <h1>BILYEO</h1>
            </Link>
            <div>
                <div className="SearchOption">
                    <select>
                        <option>All Categories</option>
                    </select>
                    <input type="text" />
                    <button>
                       <AiOutlineSearch />
                    </button>
                </div>
            </div>
            <div className ="Icons">
                <h2><CgProfile /></h2>
                <h2><AiFillNotification /></h2>
                <h2><BiLogOutCircle /></h2>
            </div>
        </div>

        <nav class="navbar-custom">
            <ul class="nav nav-pills nav-justified">
                <li class="nav-item"> <a class="nav-link" href="/bg">빌려가</a> </li>
                <li class="nav-item"> <a class="nav-link" href="/bj">빌려줘</a> </li>
                <li class="nav-item"> <a class="nav-link" href="#">나의 대여소</a> </li>
                <li class="nav-item"> <a class="nav-link" href="#">Q&A</a> </li>
            </ul>
        </nav>

        <div>{children}</div>
        </div>
    );
}

export default Layout;
