import ContactMeForm from "./ContactMeForm";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { FaEnvelope } from "react-icons/fa";
import CTAButton from "../../ctaButton/CTAButton";
import { FaCloud } from "react-icons/fa6";
const ContactMeSection = () => {
  return (
    <div>
      <SectionTitle
        title="Contact"
        decoratedText="Me 24/7"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaEnvelope}
      />
      <div className="lg:max-w-7xl mx-auto lg:p-0 p-2">
        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-8 gap-4 items-center mt-6">
          <div className="lg:col-span-5 col-span-12">
            <div className="space-y-2 text-gray-700 dark:text-gray-300 bg-base-200 dark:bg-slate-800 p-4 rounded-lg shadow-md relative">
              {/* You can add an image or illustration here if desired */}
              <figure>
                <img
                  src="https://i.ibb.co.com/Gv6zHk5d/Gemini-Generated-Image-7h0z6s7h0z6s7h0z.png"
                  alt="Contact Me Illustration"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />

                <figcaption>
                  <h2 className="lg:text-lg text-sm font-semibold text-center mt-1">
                    Bishwajit Paul,{" "}
                    <span className="text-amber-600">
                      Full-stack MERN Developer
                    </span>
                  </h2>
                </figcaption>
              </figure>
              <p>
                I am always open to discussing new opportunities, creative
                projects, or potential collaborations. Feel free to reach out if
                you have any questions! I am here to help and answer.
              </p>

              <div className="w-44 bg-slate-400 rounded-full absolute lg:left-[15px] lg:top-[8] p-1 top-[8px] right-[15px] flex items-center justify-center border border-slate-300 shadow-lg">
                <div className="w-44 rounded-full text-black bg-slate-300 shadow dark:text-slate border border-slate-400 flex items-center justify-center text-sm gap-1">
                  <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse text-black"></span>{" "}
                  Open to Opportunities
                </div>
              </div>
              <a
                href="/assets/cv-bishwajit-paul.pdf"
                download="cv-bishwajit-paul.pdf"
              >
                <CTAButton
                  label="Download CV"
                  icon={<FaCloud size={20} />}
                  variant="amber"
                  className="btn lg:btn-md btn-sm lg:w-40 w-36 lg:text-xl text-sm"
                />
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 col-span-12">
            <ContactMeForm />

            {/* Additional content can be added here if needed */}
            <div className="lg:mt-6 mt-3 text-gray-700 dark:text-gray-300">
              <address>
                <h2 className="text-lg font-bold text-amber-600">
                  <span className="text-gray-600 dark:text-amber-500">
                    Bishwajit Paul
                  </span>{" "}
                  ➡️ Full-stack MERN Developer (Currently based in Bangladesh)
                </h2>
                <p>Available for freelance work and full-time positions</p>
                <p>Email: bishwajitpaul123@gmail.com</p>
                <p>
                  KEYA MANZIL, 64/1 WAPDA Main Road, Nowapara, Abhaynagar,Phone:
                  +8801763041234, Jashore, Dhaka, Bangladesh
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMeSection;
