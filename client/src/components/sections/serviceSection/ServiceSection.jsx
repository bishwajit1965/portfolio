import { motion } from "framer-motion";
import { FaShoppingCart, FaChartLine, FaBlog, FaCode } from "react-icons/fa";

const services = [
  {
    icon: <FaShoppingCart />,
    title: "E-commerce Web Applications",
    description:
      "Full-stack online stores with product management, cart system, authentication, and admin control panels.",
  },
  {
    icon: <FaChartLine />,
    title: "Admin Dashboards",
    description:
      "Custom dashboards with analytics, user management, role-based access, and real-time data control.",
  },
  {
    icon: <FaBlog />,
    title: "Blog & Content Platforms",
    description:
      "Scalable blog systems with authentication, comments, categories, and content management systems.",
  },
  {
    icon: <FaCode />,
    title: "Custom Web Solutions",
    description:
      "Tailored full-stack applications built from scratch based on your business requirements.",
  },
];

const ServicesSection = () => {
  return (
    <section className="lg:py-16 py-4 lg:px-12 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto text-center space-y-10">
        {/* Heading */}
        <div>
          <h2 className="lg:text-3xl text-2xl font-bold text-slate-800 dark:text-slate-100">
            What I Can Build For You
          </h2>
          <p className="text-slate-500 mt-2">
            Real-world solutions designed for businesses and startups
          </p>
        </div>

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

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {service.title}
              </h3>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-6">
          <p className="text-sm text-emerald-500 font-medium mb-3">
            Need something custom? Let’s build it.
          </p>

          <a href="/contact-me">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all">
              Start a Project
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
