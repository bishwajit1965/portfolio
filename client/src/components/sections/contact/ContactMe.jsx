import ContactMeForm from "./ContactMeForm";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../sectionTitle/SectionTitle";
import { FaEnvelope } from "react-icons/fa";

const ContactMe = () => {
  return (
    <div className="">
      <Helmet>
        <title>Web-tech-services || Contact</title>
      </Helmet>
      <SectionTitle
        title="Contact"
        decoratedText="Me 24/7"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaEnvelope}
      />
      <ContactMeForm />
    </div>
  );
};

export default ContactMe;
