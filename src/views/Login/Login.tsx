import { FormEvent } from "react"
import { login } from "../../api"
import "./Login.scss"
export const Login = () => {
    const handleLogin = async (event:FormEvent) => {
        event.preventDefault()
        login(new FormData(event.target as HTMLFormElement))
    }
    return <div className="login__wrap">
    <form onSubmit={handleLogin}>
        <input type="text" name="email"/>
        <input type="password" name="password"/>
        <button>Login</button>
    </form>
    </div>
}