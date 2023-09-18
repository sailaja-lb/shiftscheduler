import React from 'react';

function Admin() {
    return (
        <form className="input-group vertical">
            <div className="input-group">
                <button className="primary bordered medium">Register</button>
                <span />
                <button type="button" className="bordered medium">
                    Logout
                </button>
            </div>
        </form>
    );
}

export default Admin;
