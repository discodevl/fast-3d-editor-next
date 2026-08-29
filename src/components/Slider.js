function formatValue(value, step) {
  const decimals = (String(step).split(".")[1] || "").length;
  return Number(value).toFixed(decimals);
}

function Slider({ id, title, onChange, value, min, max, step }) {
  return (
    <div className="flex flex-col mb-5">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[13px] text-muted">{title}</span>
        <span className="text-xs text-accent bg-accent/12 border border-accent/35 rounded py-0.5 px-2 min-w-8 text-center">
          {formatValue(value, step)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="appearance-none w-full h-0.5 m-0 bg-track rounded-sm outline-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition [&::-webkit-slider-thumb]:duration-100 [&::-webkit-slider-thumb]:ease-in-out
          [&::-webkit-slider-thumb:hover]:scale-[1.15] [&::-webkit-slider-thumb:active]:scale-[1.15]
          [&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(232,164,92,0.45)]
          [&::-moz-range-track]:h-0.5 [&::-moz-range-track]:bg-track [&::-moz-range-track]:rounded-sm
          [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition [&::-moz-range-thumb]:duration-100 [&::-moz-range-thumb]:ease-in-out
          [&::-moz-range-thumb:hover]:scale-[1.15] [&::-moz-range-thumb:active]:scale-[1.15]
          [&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(232,164,92,0.45)]"
      />
    </div>
  );
}

export default Slider;
