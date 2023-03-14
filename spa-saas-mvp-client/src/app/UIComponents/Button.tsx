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
        return "bg-black hover:bg-gray-700 text-white";
      case "secondary":
        return "text-blue-900 hover:bg-gray-100 hover:text-black border-gray-700";
      case "tertiary":
        return "";
      case "danger":
        return "border-red-500 text-red-500 hover:bg-red-500 hover:text-white";
      default:
        throw new Error("Unknown button actionType");
    }
  }

  return (
    <button 
      className={buttonTypeClassNames() + ` font-semibold border-2 rounded-md p-1 mt-5 px-3 shadow-md transition-all`}
      onClick={ actionHandler }
    >
      {actionText}
    </button>
  )
}