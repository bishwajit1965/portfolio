const formatWords = (text) =>
  text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getPageTitle = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);

  // Get last meaningful part
  let slug = segments.pop();

  // Remove ID-like values (optional safety)
  if (/^[a-f0-9]{24}$/.test(slug)) {
    slug = segments.pop() || "dashboard";
  }

  // Slug formatting
  const formatted = formatWords(slug);
  const words = formatted.split(" ");
  // Extract title + decoratedText
  const title = `${words[0]}`;
  const decoratedText = words.slice(1).join(" ");

  // Subtitle generation
  const subtitle = `${words.join(" ").toLowerCase()}`;
  return {
    title,
    decoratedText,
    subtitle,
  };
};

export default getPageTitle;
