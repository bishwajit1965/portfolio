import ContactMeForm from "./ContactMeForm";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { FaEnvelope } from "react-icons/fa";
import CTAButton from "../../ctaButton/CTAButton";
import { FaCloud } from "react-icons/fa6";
import heroImage from "../../../assets/hero-1.png";

const ContactMeSection = () => {
  return (
    <div>
      <SectionTitle
        title="Contact"
        decoratedText="Me 24/7"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaEnvelope}
      />
      <div className="lg:max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-8 gap-4 items-center mt-6">
          <div className="lg:col-span-5 col-span-12">
            <div className="space-y-2 text-slate-700 dark:text-gray-300 bg-base-200 dark:bg-slate-800 p-4 rounded-lg shadow-md relative">
              {/* You can add an image or illustration here if desired */}
              <figure>
                <img
                  src={heroImage}
                  alt="Bishwajit Paul"
                  className="rounded-xl border border-slate-400 dark:border-slate-700 shadow-md object-cover w-full relative"
                />

                {/* <img
                  src="https://i.ibb.co.com/Gv6zHk5d/Gemini-Generated-Image-7h0z6s7h0z6s7h0z.png"
                  alt="Contact Me Illustration"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                /> */}

                <figcaption>
                  <h2 className="lg:text-lg text-sm font-semibold text-center mt-1">
                    Bishwajit Paul,{" "}
                    <span className="text-amber-600">
                      Full-stack{" "}
                      <span className="text-emerald-600 lg:text-xl dark:text-orange-300">
                        {" "}
                        MERN
                      </span>{" "}
                      Developer
                    </span>
                  </h2>
                </figcaption>

                <div className="absolute lg:bottom-[14.8rem] bottom-[14rem] lg:right-7 right-5 h-9 w-9 bg-emerald-500 border-2 border-emerald-400 rounded-full flex items-center justify-center text-base-100 font-semibold">
                  BP
                </div>
              </figure>
              <p>
                I am always open to discussing new opportunities, creative
                projects, or potential collaborations. Feel free to reach out if
                you have any questions! I am here to help and answer.
              </p>

              <div className="w-44 bg-emerald-400 rounded-full absolute lg:left-[15px] lg:top-[8] p-1 top-[8px] right-[15px] flex items-center justify-center border border-emerald-300 shadow-lg">
                <div className="w-44 rounded-full text-black bg-emerald-300 shadow dark:text-slate border border-emerald-400 flex items-center justify-center text-sm gap-1">
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
                  className="btn lg:btn-md btn-sm lg:w-48 w-36 lg:text-xl text-sm"
                />
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 col-span-12">
            <ContactMeForm />

            {/* Additional content can be added here if needed */}
            <div className="lg:mt-3 mt-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border dark:border-slate-700 p-6 rounded-md shadow-md">
              <address>
                <h2 className="font-bold text-amber-600">
                  <span className="text-slate-700 dark:text-amber-500">
                    Bishwajit Paul
                  </span>{" "}
                  • Full-stack{" "}
                  <span className="text-emerald-600 dark:text-orange-300">
                    {" "}
                    MERN
                  </span>{" "}
                  Developer (Currently based in Bangladesh)
                </h2>
                <p>Available for freelance work and full-time positions</p>
                <p>Email: paul.bishwajit09@gmail.com</p>
                <p>Phone: +880 1712 80 92 79, Jashore, Bangladesh, Dhaka</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMeSection;
