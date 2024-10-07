import ContactMeForm from "./ContactMeForm";
import SectionTitle from "../../sectionTitle/SectionTitle";

const ContactMeSection = () => {
  return (
    <div>
      <SectionTitle
        title={"Contact Me"}
        subtitle={
          "Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        }
      />
      <ContactMeForm />
    </div>
  );
};

export default ContactMeSection;
