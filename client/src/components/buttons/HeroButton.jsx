const HeroButton = ({
  label,
  icon,
  iconPosition = "right",
  href,
  className = "",
}) => {
  const content = (
    <span className="inline-flex items-center gap-3">
      {icon && iconPosition === "left" && icon}
      <span>{label}</span>
      {icon && iconPosition === "right" && icon}
    </span>
  );

  const baseClasses = `
    inline-flex items-center justify-center
    px-8 py-4
    text-lg font-extrabold
    rounded-xl
    bg-gradient-to-r from-amber-500 to-orange-500
    text-white
    shadow-xl shadow-orange-500/30
    hover:scale-105 hover:shadow-2xl
    transition-all duration-300
  `;

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {content}
      </a>
    );
  }

  return <button className={`${baseClasses} ${className}`}>{content}</button>;
};

export default HeroButton;

//USAGE
// <HeroButton
//   label="Get Started"
//   icon={<FaArrowRight />}
//   iconPosition="right"
//   href="/get-started"
//   className="additional-custom-classes"
// />

{
  /* <HeroButton
  label="View Projects"
  icon={<FaArrowRight />}
/>

<HeroButton
  label="Download CV"
  icon={<FaCloud />}
  className="bg-slate-900 shadow-slate-900/40"
  href="/assets/cv-bishwajit-paul.pdf"
/>
<HeroButton
  label="Contact Me"
  icon={<FaEnvelope />}
  iconPosition="left"
/>
<HeroButton
    label="Learn More"
    icon={<FaInfoCircle />}
    href="/learn-more"
  /> */
}
