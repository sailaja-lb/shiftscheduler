import React from 'react';

function CreateUser() {
    return (
        <form className="input-group vertical">
            <label htmlFor="name">Username</label>
            <input type="text" name="username" placeholder="username" />
            <label htmlFor="password">Password</label>
            <textarea name="password" placeholder="password" />
            <div className="input-group">
                <button className="primary bordered medium">Create User</button>
                <span />
                <button type="button" className="bordered medium">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default CreateUser;
