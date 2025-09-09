
interface noElements {
    IconElement: any;
    message: string;
}

const NoElements = ({IconElement, message}: noElements) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 mt-30">
        <IconElement className="h-18 w-18 text-[#00b0c3]"/>
        <p className="text-[#737373]">{message}</p>
    </div>
  )
}

export default NoElements