import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#F3F3F3]">
      <footer className="footer sm:footer-horizontal text-base-content p-10">
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Contact Us</a>
          <a className="link link-hover">Blog</a>
          <a className="link link-hover">About</a>
        </nav>
        <nav>
          <h6 className="footer-title">Support</h6>
          <a className="link link-hover">FAQ</a>
          <a className="link link-hover">Help Center</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Refund Policy</a>
        </nav>
        <nav>
          <h6 className="footer-title"> Get in touch</h6>
          <div className="flex gap-4 items-center">
            <a
              href="https://web.facebook.com/ma.joynul"
              className="link link-hover text-2xl text-blue-600"
            >
              <FaSquareFacebook />
            </a>
            <a
              href="https://www.linkedin.com/"
              className="link link-hover text-2xl text-blue-400"
            >
              <IoLogoLinkedin />
            </a>
            <a
              href="https://github.com/joynul24"
              className="link link-hover text-2xl"
            >
              <FaGithub />
            </a>
          </div>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="w-80">
            <label>Enter your email address</label>
            <div className="join mt-2">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn bg-[#07332F] hover:bg-[#F7A582] join-item text-white">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
      <small className="flex justify-center py-4 text-gray-600">
        Copyright © {new Date().getFullYear()} - All right reserved by Doc House
        Ltd
      </small>
    </div>
  );
};

export default Footer;
