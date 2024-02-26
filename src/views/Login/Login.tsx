import { FormEvent } from "react"
import "./Login.scss"
import { useLogin } from "../../hooks/useLogin"
export const Login = () => {
    const {doLogin, error} = useLogin()
    const handleLogin = async (event:FormEvent) => {
        event.preventDefault()
        doLogin(new FormData(event.target as HTMLFormElement))
    }
    return <div className="login__wrap">
    <form onSubmit={handleLogin}>
        <input type="text" name="email"/>
        <input type="password" name="password"/>
        <button>Login</button>
    </form>
    {error && <h2>{error}</h2>}
    </div>
}