import SvgBack from "./SvgBack";

function TextureSelector({
  id,
  title,
  fileHandler,
  revertTexture,
  actualTexture,
}) {
  function toggleInput() {
    document.getElementById(id).click();
  }

  return (
    <div className="mt-2.5 flex flex-col gap-1.5">
      <div className="flex items-center gap-4">
        {actualTexture ? (
          <img
            className="w-12 h-12 rounded-xl border border-black mr-2 cursor-pointer hover:border-white"
            alt=""
            src={actualTexture || "/alert-triangle.svg"}
            onClick={toggleInput}
          />
        ) : (
          <div
            className="flex items-center justify-center rounded-lg border border-dashed border-app-border w-[52px] h-[52px] text-app-border cursor-pointer"
            onClick={toggleInput}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ width: "28px", height: "28px" }}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        )}
        <div className="h-1/2 cursor-pointer" onClick={revertTexture}>
          <SvgBack />
        </div>
      </div>

      <input
        id={id}
        style={{ display: "none" }}
        type="file"
        accept="image/png, image/gif, image/jpeg,image/jpg"
        onChange={fileHandler}
      />
    </div>
  );
}

export default TextureSelector;
