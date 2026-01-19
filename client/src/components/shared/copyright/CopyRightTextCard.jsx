const CopyRightTextCard = ({ copyrightData }) => {
  const { copyrightText } = copyrightData;
  return (
    <div className="flex items-center">
      <p className="text-sm">{copyrightText}</p>
    </div>
  );
};

export default CopyRightTextCard;
