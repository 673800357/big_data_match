import React from 'react'
const Login = ({cancelLogin,cancelRegist,login,regist}) => {
    return(
        <div className='container_login'>
            <div className='button_login' style={{marginRight:'38px'}} onClick ={regist}>注册</div>
            <div className='button_login' onClick={login}>登录</div>
        </div>
    )
}
export default Login

