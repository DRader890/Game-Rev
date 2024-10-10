import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByUserName } from "../../services/userService"

export const Login = () => {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByUserName(name).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "honey_user",
          JSON.stringify({
            id: user.id
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="container-login">
      <section  className="container-login">
        <form className="form-login" onSubmit={handleLogin}>
          <h1 className="game-info">GameRev</h1>
          <h2 className="game-info">Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
                className="form-control"
                placeholder="Username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register" className="game-info">Not a member yet?</Link>
      </section>
    </main>
  )
}
