import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const TrendingHead = () => {
  return (
    <div className="flex items-center mb-4">
      <FontAwesomeIcon className="text-green-700" icon={faArrowTrendUp} />
      <p className="ml-4 font-bold">Trending</p>
      <FontAwesomeIcon className="ml-12 text-blue-500" icon={faAngleRight} />
    </div>
  );
};
export default TrendingHead;
