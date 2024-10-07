import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByUserName } from "../../services/userService"

export const Register = () => {
  const [customer, setCustomer] = useState({ userName: "" })
  const navigate = useNavigate()

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "honey_user",
          JSON.stringify({
            id: createdUser.id
          })
        )
        navigate("/")
      }
    }).catch((error) => {
      console.error("Error creating user:", error)
      window.alert("Error during registration")
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByUserName(customer.userName).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that username already exists")
      } else {
        registerNewUser()
      }
    }).catch((error) => {
      console.error("Error checking username:", error)
      window.alert("Error checking username")
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy.userName = evt.target.value
    setCustomer(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>GameRev</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="userName"
              className="form-control"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}

