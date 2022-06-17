import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCode, faComment } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const CoinLinks = (props) => {
  return (
    <div className="w-full gap-1 flex flex-wrap mt-4 items-center justify-center">
      {props.coinData.site && (
        <Button href={props.coinData.site}>
          <FontAwesomeIcon className="mr-1" icon={faLink} />
          {props.coinData.name.toLowerCase()}.com
        </Button>
      )}
      {props.coinData.sourceCode && (
        <Button href={props.coinData.sourceCode}>
          <FontAwesomeIcon className="mr-1" icon={faCode} />
          Source code
        </Button>
      )}
      {props.coinData.chat && (
        <Button href={props.coinData.chat}>
          <FontAwesomeIcon className="mr-1" icon={faComment} />
          Chat
        </Button>
      )}
      {props.coinData.twitter && (
        <Button href={`http://twitter.com/${props.coinData.twitter}`}>
          <FontAwesomeIcon className="mr-1" icon={faTwitter} />@
          {props.coinData.twitter}
        </Button>
      )}
      {props.coinData.announcement && (
        <Button href={props.coinData.announcement}>medium.com</Button>
      )}
    </div>
  );
};
export default CoinLinks;
