const formatWords = (text) =>
  text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getSuperAdminPageTitle = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);

  // For dashboard home only
  if (segments[0] === "super-admin" && segments.length === 1) {
    return {
      title: "Super Admin •",
      decoratedText: "Dashboard Home",
      subtitle: "Super admin dashboard home",
    };
  }

  // Get last meaningful part
  let slug = segments.pop() || "dashboard";

  // Remove ID-like values (optional safety)
  if (/^[a-f0-9]{24}$/.test(slug)) {
    slug = segments.pop() || "dashboard";
  }

  // Admin section (super-admin → Super Admin)
  const admin = formatWords(segments[0] || "dashboard");

  // Slug formatting
  const formatted = formatWords(slug);
  const words = formatted.split(" ");

  // Extract title + decoratedText
  const title = `${admin} • ${words[0]}`;
  const decoratedText = words.slice(1).join(" ");

  // Subtitle generation
  const subtitle = `Super admin only can ${words.join(" ").toLowerCase()}`;

  return {
    title,
    decoratedText,
    subtitle,
  };
};

export default getSuperAdminPageTitle;
