export default function Button({ disabled, value, onSmash, color }) {
  return (
    <button
      disabled={disabled}
      onClick={onSmash}
      className={`
            poppins-regular 
            text-sm 
            py-1 
            px-3 
            rounded-md      
            shadow-sm
            transform
            transition-all
            delay-75
            duration-150
            ease-linear
            hover:cursor-pointer
            ${color}
        `}
    >
      {value}
    </button>
  );
}
