import { Link } from "react-router-dom";
import "./Home.css";
const HomePage = () => {
  return (
    <section id="hero" className="d-flex align-items-center" style={{height: "100vh"}}>
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-6 pt-4 pt-lg-0  order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1>Probation Test for Backend Developer at Cikatech</h1>
            <div>
              {/* <a
                href="https://probation-backend-developer.cikatechdev.fun/simple-crud"
                className="btn-get-started scrollto"
              >
                Get Started
              </a> */}
              <Link to="/simple-crud" className="btn-get-started">
                Get Started
              </Link>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <img
              src="https://probation-backend-developer.cikatechdev.fun/assets/img/hero-img.png"
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
