import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import "./playButton.scss";

const PlayButton = ({ className, ...otherProps }) => {
  return (
    <IconButton
      classes={{ root: `small-play-button apple-light-blur ${className}` }}
      disableRipple
      {...otherProps}
    >
      <FontAwesomeIcon icon={faPlay} />
    </IconButton>
  );
};

export default PlayButton;
