import React from "react";


const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 py-10 text-gray-400">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* <!-- Logo and About Section --> */}
            <div>
              <h2 className="text-xl font-semibold text-white">
                Edueme Reseach Labs
              </h2>
              <p className="mt-4 text-sm">
                At Edueme, we believe in shaping young minds for the future. Our
                dedicated team of research scientists, innovators, and
                physicists bring a wealth of knowledge and experience in
                Robotics, Mechanical Design, Machine Learning, and Artificial
                Intelligence to provide our students with unparalleled learning
                opportunities.
                <br /> With a focus on the second half of the 21st century, we
                are proud to be the pioneers in India to introduce robotics
                education from as early as third grade, empowering our students
                to explore the exciting world of robotics with hands-on
                experience.
              </p>
            </div>

            {/* <!-- Quick Links Section --> */}
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Resources Section --> */}
            <div>
              <h3 className="text-lg font-semibold text-white">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Contact Section --> */}
            <div>
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="mailto:info@yourbrand.com"
                    className="hover:text-white"
                  >
                    info@eduemeresearchlabs.com
                  </a>
                </li>
                <li>
                  <a className="hover:text-white">
                    Madhapur, Hyderabad, Telangana
                  </a>
                </li>
                <li>
                  <a href="tel:+919059508050" className="hover:text-white">
                    +91 9059508050
                  </a>
                </li>
                <ul>
                  {/*<div className="">
                    <a
                      href="https://wa.me/+919059508050"
                      target="#"
                      className="hover:text-white"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} text-sm />
                    </a>
                    <a
                      href="https://www.instagram.com/edueme_researchlabs/"
                      target="#"
                      className="hover:text-white"
                    >
                      <FontAwesomeIcon icon={faInstagram} text-sm />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/edueme-research-labs/"
                      target="#"
                      className="hover:text-white"
                    >
                      <FontAwesomeIcon icon={faLinkedin} text-sm />
                    </a>
                  </div>*/}
                </ul>
              </ul>
            </div>
          </div>

          {/* <!-- Footer Bottom --> */}
          <div className="mt-10 border-t border-gray-700 pt-6 text-center">
            <p className="text-sm">
              © 2024 Edueme Research Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
