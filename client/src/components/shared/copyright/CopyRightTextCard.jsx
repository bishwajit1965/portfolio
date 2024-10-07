const CopyRightTextCard = ({ copyrightData }) => {
  const { copyrightText } = copyrightData;
  return (
    <div>
      <p>{copyrightText}</p>
    </div>
  );
};

export default CopyRightTextCard;
