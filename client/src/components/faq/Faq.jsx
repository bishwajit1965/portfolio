import { FaRocket } from "react-icons/fa";
import PageTitle from "../../pages/pageTitle/PageTitle";

const Faq = () => {
  const faqs = [
    {
      id: 1,
      question: "What services do you provide?",
      answer:
        "I build full-stack web applications, admin dashboards, e-commerce systems, and custom business platforms tailored to specific needs.",
    },
    {
      id: 2,
      question: "What technologies do you use?",
      answer:
        "My core stack includes React, Node.js, Express, MongoDB, Tailwind CSS, JWT authentication, Firebase, and Cloudinary.",
    },
    {
      id: 3,
      question: "Can you build custom business applications?",
      answer:
        "Yes. I build scalable custom solutions including e-commerce platforms, dashboards, content systems, and business automation tools.",
    },
    {
      id: 4,
      question: "Do you work on existing projects?",
      answer:
        "Yes. I can improve existing applications by fixing bugs, adding features, optimizing performance, and refactoring codebases.",
    },
    {
      id: 5,
      question: "How do we start working together?",
      answer:
        "Simply send your project details through the contact form. I will review your requirements and get back to you quickly.",
    },
    {
      id: 6,
      question: "Do you provide deployment and post-launch support?",
      answer:
        "Yes. I can help with deployment, production setup, and ongoing support after project delivery.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto max-h-screen px-4 lg:px-0 py-8">
      <PageTitle
        title="Frequently Asked"
        decoratedText="Questions"
        subtitle="Everything you need to know about my web development services, project workflow, tech stack, and support—before we start building your next project."
        icon={FaRocket}
        dataLength={faqs?.length}
      />
      <div className="space-y-2">
        {faqs.map((qa) => (
          <div
            key={qa.id}
            className="collapse collapse-plus bg-base-100 border border-base-300 dark:bg-slate-800 dark:border-slate-700"
          >
            <input
              type="radio"
              name="my-accordion-3"
              defaultChecked={qa.id === 1}
            />
            <div className="collapse-title font-semibold">{qa.question}</div>
            <div className="collapse-content text-sm">{qa.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
