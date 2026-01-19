import ContactMeForm from "./ContactMeForm";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { FaEnvelope } from "react-icons/fa";
const ContactMeSection = () => {
  return (
    <div>
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

export default ContactMeSection;
