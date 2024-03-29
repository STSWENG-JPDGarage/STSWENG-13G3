import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header>
            <div className="container">
                {/* Links to the dashboard */}
                <Link to="/dashboard">
                    <h1>JPDGarage</h1>
                </Link>

                {/* Links to the shopping cart */}
                <Link to="/shopping-cart">
                    <button type='button' className='primary navbar-cart'><p>Cart</p></button>
                    {/** ^^This part should have functionality to have # of items in cart */}
                </Link>

                
                {/* Links to the login page*/}
                <Link to="">
                    <p>Justin Depano</p>
                    {/** ^^This part should change name depending on logged-in user */}
                </Link>
            </div>
        </header>
    )
}

export default Header