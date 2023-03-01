import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className="navbar nav2">
                <div className="flex-1">
                    <Link to="/">
                        <img src='https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' className="btn btn-ghost normal-case text-xl" />
                    </Link>
                </div>
            
            </div>

        </div>
    )
}

export default Navbar