import { Link } from 'react-router-dom';
import './style.css'
const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="logo">
          <img
            src="https://probation-backend-developer.cikatechdev.fun/assets/img/cikatech1.png"
            alt=""
            className="img-fluid"
          />
        </Link>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <Link className="navbar-brand" to="/simple-crud">
                Simple CRUD
              </Link>
            </li>
            <li>
              <Link className="navbar-brand" to="/form-deposit">
                Form Deposit
              </Link>
            </li>

            <li>
              <Link className="navbar-brand" to="/deposit">
                Deposit
              </Link>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};
export default Header;