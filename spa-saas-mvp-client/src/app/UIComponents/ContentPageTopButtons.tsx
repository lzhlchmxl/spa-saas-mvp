import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

export default function ContentPageTopButtons({
  backButtonTargetLocation,
  hideEditDeleteButtons,
  editCallback,
  deleteCallback,
} 
: 
{
  backButtonTargetLocation?: string,
  hideEditDeleteButtons?: boolean,
  editCallback: () => void,
  deleteCallback: () => void,
}) {

  const navigate = useNavigate();
  return (
    <div 
        className="mt-contentPageTopMargin flex justify-between items-center w-full"
      >
      <FontAwesomeIcon onClick={() => { backButtonTargetLocation ? navigate(backButtonTargetLocation) : navigate(-1)}} className="hover:cursor-pointer text-textsIcons" icon={faChevronLeft} />
      {!hideEditDeleteButtons &&
      <div className="flex">
        <IconButton icon={faPenToSquare} actionCallback={editCallback} />
        <div className="ml-5">
          <IconButton icon={faTrashCan} actionCallback={deleteCallback} />
        </div>
      </div>
      }
    </div>
  )
}