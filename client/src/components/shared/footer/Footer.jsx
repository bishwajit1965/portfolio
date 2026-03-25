import { Link } from "react-router-dom";
import CopyrightText from "../copyright/CopyrightText";
import Logo from "/assets/favicon/webDevProF.png";
import RssImage from "/assets/rss.png";
import SocialMediaLinks from "../socialMedia/SocialMediaLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      {/* MAIN FOOTER */}
      <footer className="bg-slate-900 text-slate-300 lg:py-12 py-8 lg:px-28 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ABOUT */}
          <div>
            <img src={Logo} alt="Logo" className="w-10 h-10 mb-3" />
            <h2 className="text-white font-semibold text-lg">Bishwajit Paul</h2>
            <p className="text-sm mt-2">
              Fullstack developer building scalable web applications with React,
              Node.js, and MongoDB.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h6 className="text-white font-semibold mb-3">Quick Links</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about-me">About</Link>
              </li>
              <li>
                <Link to="/portfolio-projects">Projects</Link>
              </li>
              <li>
                <Link to="/blog-posts">Blogs</Link>
              </li>
              <li>
                <Link to="/contact-me">Contact</Link>
              </li>
            </ul>
          </div>

          {/* PROJECTS */}
          <div>
            <h6 className="text-white font-semibold mb-3">Projects</h6>
            <ul className="space-y-2 text-sm">
              <li>Nova Cart (E-Commerce)</li>
              <li>Nova Dashboard</li>
              <li>Blog Mongoose</li>
              <li>Developer Portfolio</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h6 className="text-white font-semibold mb-3">Get in Touch</h6>
            <p className="text-sm">Available for freelance work.</p>
            <p className="text-sm mt-2">Email: your@email.com</p>
            <div className="flex items-center gap-2">
              <div className="mt-3">
                <SocialMediaLinks />
              </div>

              <a
                href="/rss"
                className="inline-block mt-3 tooltip"
                data-tip="Subscribe to RSS"
              >
                <img
                  src={RssImage}
                  alt="RSS Feed"
                  width="20"
                  height="20"
                  className="rounded-sm"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTTOM BAR */}
      <footer className="bg-slate-800 text-slate-400 border-t border-slate-700 lg:px-28 px-6 py-3">
        <div className="lg:flex grid flex-col md:flex-row justify-between items-center text-sm">
          <div className="lg:flex grid items-center gap-2">
            <img src={Logo} alt="Logo" className="w-6 h-6" />
            <span className="items-center lg:flex grid gap-2">
              © {currentYear} <CopyrightText />
            </span>
          </div>

          <p className="mt-2 md:mt-0">
            Built with React, Tailwind & a lot of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
