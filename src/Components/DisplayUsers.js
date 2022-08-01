import React from 'react'

const DisplayUsers = ({ users }) => {
  return (
    <div>
      <table border={1} className="table">
        <thead className="thead bg-dark text-white">
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {users.map((user) => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayUsers
