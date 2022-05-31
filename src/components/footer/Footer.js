import './Footer.css';
const Footer = () => { 
    return (
      <footer id="footer">
        <div class="container py-4">
          <div class="copyright">
            © <span id="yearCopy">2022</span> Copyright{" "}
            <strong>
              <span>Cikatech</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </footer>
    );
}
export default Footer;