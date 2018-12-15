import React from 'react'

const Users = (props) => (
    <div>
        <h4>All Users in the Database</h4>
        <div>
            {props.users.map(user => {
                return <span key={user}> {user}, </span>
            })}
        </div>
    </div>
)

export default Users;