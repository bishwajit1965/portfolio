const JourneyMilestonesCard = ({ milestone }) => {
  const { title, description } = milestone;
  return (
    <div className="lg:space-y-2 border border-slate-600 shadow-md sm:border-slate-700 rounded-md p-2">
      <h1 className="text-white justify-center text-2xl font-bold w-full">
        Milestone: {title}
      </h1>
      <p className="max-w-7xl">
        <span className="font-bold">Description:</span> {description}
      </p>
    </div>
  );
};

export default JourneyMilestonesCard;
