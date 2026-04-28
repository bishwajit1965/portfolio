import { FaDatabase } from "react-icons/fa";

const EmptyState = ({
  title = "No data found",
  subtitle = "Nothing available right now.",
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-center space-y-4">
      <FaDatabase size={40} />

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-sm text-slate-500 admin-dark:text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;

// Usage
{
  /* <EmptyState
  title="No System Preferences Found"
  subtitle="Start by adding your first system preference."
/> */
}
