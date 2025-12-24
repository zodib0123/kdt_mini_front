
const BTStyle = {
  blue : {
    base : "bg-orange-500",
    hover : "hover:bg-blue-900",
  },
  orange : {
    base : "bg-orange-500",
    hover : "hover:bg-orange-900",
  },
  lime : {
    base : "bg-lime-500",
    hover : "hover:bg-lime-900",
  }, 
  yellow : {
    base : "bg-yellow-500",
    hover : "hover:bg-yellow-900"
  },
} as const;

type BTColor = keyof typeof BTStyle;
// type BTColor = 'blue' | 'orange' | 'lime';

interface TailButtonProps {
  color: BTColor,
  caption : string,
  onHandle : () => void,
}

export default function TailButton({color, caption, onHandle} : TailButtonProps) {
  const btstyle = BTStyle[color] ;

  return (
    <button className={`${btstyle.base} text-white rounded
                        ${btstyle.hover} hover:font-bold 
                        cursor-pointer
                        px-2 py-1`}
            onClick={onHandle}>
      {caption}
    </button>
  )
}
