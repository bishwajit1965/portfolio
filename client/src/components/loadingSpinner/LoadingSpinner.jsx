const LoadingSpinner = ({ size = "large", color = "primary" }) => {
  const spinnerSize =
    size === "small"
      ? "loading-sm"
      : size === "large"
      ? "loading-lg"
      : "loading-md";
  const spinnerColor = `text-${color}`;

  return (
    <div className={`flex justify-center items-center p-4`}>
      <span
        className={`loading loading-ring ${spinnerSize} ${spinnerColor}`}
      ></span>
    </div>
  );
};

export default LoadingSpinner;
