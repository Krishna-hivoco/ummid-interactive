import { useSearchParams } from "react-router-dom";
import Interaction from "./Interaction";
import IOSInteraction from "./IOSInteraction";

const PlateformWisePages = () => {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform");
  return (
    <div>
      <Interaction platform={platform} />
    </div>
  );
};

export default PlateformWisePages;
