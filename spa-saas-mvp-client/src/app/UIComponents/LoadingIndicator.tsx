import spinner from "../../assets/spinner.svg"

function LoadingIndicator() {

  return (
    <div className="flex h-screen w-full bg-backgrounds justify-center items-center">
      <img 
        className=""
        src={spinner} 
        alt='spinner loading indicator' 
      />
    </div>
  )
}

export default LoadingIndicator;