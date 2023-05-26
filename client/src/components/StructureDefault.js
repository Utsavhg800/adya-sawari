import React from 'react'
import '../resources/structure.css'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function StructureDefault({children}) {
    const navigate = useNavigate();
    const [collapsed, setcollapsed] = React.useState(false);
    const {user} = useSelector(state => state.users)
    const userMenu = [
        {
            name: 'Home',
            icon: 'bi bi-house',
            path: '/'
        },
        {
            name: 'Bookings',
            icon: 'bi bi-book',
            path: '/bookings'
        },
        {
            name: 'Profile',
            icon: 'bi bi-people',
            path: '/profile'
        },
        {
            name: 'Logout',
            icon: 'bi bi-box-arrow-left',
            path: '/logout'
        },
        {
            name: 'Review',
            path: '/review',
            icon: 'bi bi-star'
        },

    ]
    const adminMenu = [{
        name: 'Home',
        path: '/',
        icon: 'bi bi-house'
    },

        {
            name: 'Manage Buses',
            path: '/admin/buses',
            icon: 'bi bi-bus-front'
        },

        {
            name: 'User Management',
            path: '/admin/users',
            icon: 'bi bi-people'

        },

        {
            name: 'List Bookings',
            path: '/admin/bookings',
            icon: 'bi bi-book'
        },

        {
            name: 'Logout',
            path: '/logout',
            icon: 'bi bi-box-arrow-left'
        },

        {
            name: 'Review',
            path: '/admin/review',
            icon: 'bi bi-star'
        },

    ]
    const menutobeDisplayed = user?.isAdmin ? adminMenu : userMenu;
    const activeRoute = window.location.pathname

    return (
        <div className='main-structure'>
            <div className='navbar'>
                <div className='navbar-header'>
                    <h1 className='logo'>
                        <i className="bi bi-bus-front-fill bus-logo"></i> Adya</h1>
                    <h1 className='role'> {user?.name} <br/> Role: {user?.isAdmin ? 'Admin ' : 'User'}</h1>
                </div>
                <div className='menu'>
                    {menutobeDisplayed.map((item, index) => {
                        return <div className={`${activeRoute === item.path && 'active'} menu-items`}>
                            <i className={item.icon}></i>
                            {!collapsed && <span onClick={() => {
                                if (item.path === "/logout") {
                                    localStorage.removeItem("token");
                                    navigate("/login")
                                } else {
                                    navigate(item.path);
                                }
                            }}
                            >
                                {item.name}
                            </span>}

                        </div>
                    })}
                </div>

            </div>
            <div className='page-body'>
                <div className='body-header'>
                    {collapsed ? (
                            <i class="bi bi-x-lg"
                               onClick={() => setcollapsed(!collapsed)}

                            ></i>
                        ) :
                        (<i class="bi bi-list"
                            onClick={() => setcollapsed(!collapsed)}
                            ></i>
                        )}
                </div>
                <div className='body-content'>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default StructureDefault