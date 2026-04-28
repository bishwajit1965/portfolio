import { motion } from "framer-motion";
import { FaShoppingCart, FaChartLine, FaBlog, FaCode } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import SectionTitle from "../../sectionTitle/SectionTitle";
import Button from "../../buttons/Button";

const services = [
  {
    icon: <FaShoppingCart />,
    title: "Custom E-commerce Store Development",
    description:
      "I will build a complete full-stack e-commerce platform for your business with product management, cart system, secure authentication, and an admin dashboard to control everything.",
    features: [
      { id: 1, option: "Easy product and inventory management" },
      { id: 2, option: "Shopping cart & checkout flow" },
      { id: 3, option: "Admin panel for full control" },
      { id: 4, option: "Secure login and customer account system" },
    ],
  },
  {
    icon: <FaChartLine />,
    title: "Business Admin Dashboard Development",
    description:
      "I will create powerful admin dashboards with analytics, user management, role-based access, and real-time data control for your business operations.",
    features: [
      { id: 1, option: "Role-based access system" },
      { id: 2, option: "Analytics & data visualization" },
      { id: 3, option: "User & content management" },
      { id: 4, option: "Clean and scalable UI" },
    ],
  },
  {
    icon: <FaBlog />,
    title: "Blog & CMS Development",
    description:
      "I will develop modern blog systems with authentication, categories, comments, bookmarks, and full content management capabilities.",
    features: [
      { id: 1, option: "Admin-controlled CMS" },
      { id: 2, option: "User interaction features" },
      { id: 3, option: "Category & tag system" },
      { id: 4, option: "SEO-friendly structure" },
    ],
  },
  {
    icon: <FaCode />,
    title: "Custom Full-Stack Web Application Development",
    description:
      "I build custom full-stack web applications tailored to your business needs — from idea to production-ready system with scalable backend and modern UI.",
    features: [
      { id: 1, option: "Business automation tools" },
      { id: 2, option: "Booking / management systems" },
      { id: 3, option: "API-driven applications" },
      { id: 4, option: "Fully customized architecture" },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto text-center space-y-6">
        {/* Heading */}
        <SectionTitle
          title="What I Can"
          decoratedText="Build For You"
          subtitle="Production-ready web applications built with clean architecture, secure backend systems, and scalable frontend experiences."
          icon={FaBriefcase}
        />

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:gap-6 gap-4 text-left">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="lg:p-6 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-all"
            >
              <div className="text-2xl text-emerald-500 mb-3">
                {service.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {service.title}
                </h3>

                <p className="text-slate-500 mt-2 text-lg leading-relaxed">
                  {service.description}
                </p>
                <div className="px-4">
                  {service.features.map((feature) => (
                    <li key={feature.id} className="dark:text-slate-500">
                      {feature.option}
                    </li>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-6">
          <p className="text-sm text-emerald-500 font-medium mb-3">
            Have a project idea? Let’s discuss your requirements and build the
            right solution.
          </p>

          <Button
            type="button"
            href="/contact-me"
            variant="outline"
            size="md"
            label="Start a Project"
            icon={<FaBriefcase />}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
