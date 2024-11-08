export const getCategoryNames = (categoryIds, categories) => {
  if (!Array.isArray(categoryIds) || !categories.length) return "No categories";
  return categoryIds
    .map((id) => categories.find((cat) => cat.value === id)?.label || "Unknown")
    .join(", ");
};

export const getTagNames = (tagIds, tags) => {
  if (!Array.isArray(tagIds) || !tags.length) return "No tags";
  return tagIds
    .map((id) => tags.find((tag) => tag.value === id)?.label || "Unknown")
    .join(", ");
};
