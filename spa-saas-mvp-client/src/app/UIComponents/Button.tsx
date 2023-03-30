export default function Button(
  {
    actionType,
    actionText,
    actionHandler,
  }
  :
  {
    actionType: "primary" | "secondary" | "tertiary" | "danger",
    actionText: string,
    actionHandler: () => void,
  }
) {

  const buttonTypeClassNames = () => {
    switch(actionType) {
      case "primary":
        return "bg-textsIcons text-backgrounds border-borders hover:bg-backgrounds hover:text-textsIcons";
      case "secondary":
        return "text-textsIcons hover:bg-backgrounds";
      case "tertiary":
        return "";
      case "danger":
        return "border-danger text-danger hover:bg-danger hover:text-white";
      default:
        throw new Error("Unknown button actionType");
    }
  }

  return (
    <button 
      className={buttonTypeClassNames() + ` font-semibold border-2 rounded-md p-1 m-1 px-3 shadow-md transition-all`}
      onClick={ actionHandler }
    >
      {actionText}
    </button>
  )
}