// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <>
      <div>
        <footer footer class="footer-distributed">
          <div class="footer-left">
            <h3>Muhammad Waqar Ayub Khan</h3>

            <p class="footer-links">UEA ID: 100334069</p>

            <p class="footer-company-name">
              Information Visualization &copy; 2021
            </p>
            {/* <div class="footer-icons">
              <a href="#">
                <i class="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fa fa-linkedin"></i>
              </a>
              <a href="#">
                <i class="fa fa-github"></i>
              </a>
            </div> */}
          </div>

          <div class="footer-center">
            <div>
              <i class="fa fa-map-marker"></i>
              <p>
                <span>137 Cadge Road</span> NR58DD, Norwich
              </p>
            </div>

            <div>
              <i class="fa fa-phone"></i>
              <p>+44 7903 759517</p>
            </div>

            <div>
              <i class="fa fa-envelope"></i>
              <p>
                <a href="mailto:support@company.com">asq21ezu@uea.ac.uk</a>
              </p>
            </div>
          </div>

          <div class="footer-right">
            <p class="footer-company-about">
              <span>About the Project</span>
              This project is to analyze the COVID data how it impacts the
              different countries, how it is more dangerous than the other
              pandemics
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
