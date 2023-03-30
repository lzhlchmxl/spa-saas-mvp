import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton({
  icon,
  actionCallback,
}
:
{
  icon: IconDefinition,
  actionCallback: () => void,
}) {

  return (
    <div 
        className="hover:cursor-pointer w-fit"
        onClick={actionCallback}
      >
        <FontAwesomeIcon className="text-textsIcons" icon={icon} />
    </div>
  )

}