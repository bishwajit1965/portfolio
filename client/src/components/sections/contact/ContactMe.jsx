import ContactMeForm from "./ContactMeForm";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../sectionTitle/SectionTitle";

const ContactMe = () => {
  return (
    <div className="lg:pt-10">
      <Helmet>
        <title>Web-tech-services || Contact</title>
      </Helmet>
      <SectionTitle title="Contact" decoratedText="Me 24/7" />
      <ContactMeForm />
    </div>
  );
};

export default ContactMe;
