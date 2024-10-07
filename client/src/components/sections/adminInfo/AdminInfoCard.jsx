import OnlineStatus from "../../onlineStatus/OnlineStatus";

const AdminInfoCard = ({ adminInfo }) => {
  const { name, title, imageUrl } = adminInfo;
  return (
    <div className="border border-slate-400 dark:border-slate-700 rounded-md shadow-sm py-2 space-y-1">
      <div className="flex justify-center">
        <img
          src={imageUrl ? imageUrl : ""}
          alt={name}
          className="rounded-full shadow-lg object-scale-down border-4 border-base-500 w-52"
        />
      </div>
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <h2 className="text-1xl font-bold text-center">{title}</h2>
      <div className="flex justify-center">
        <OnlineStatus />
      </div>
    </div>
  );
};

export default AdminInfoCard;
