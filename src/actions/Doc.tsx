import Link from "next/link";
import { Donate } from "../util/PayPal";

function Doc() {
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div>
        <h1 className="text-center font-bold text-xl">
          Welcome to Glb Editor :)
        </h1>
        <h2 className="text-center text-lg font-bold">
          Your casual model editor.
        </h2>
        <p>
          Upload a &apos;.glb&apos; file to start editing — if you don&apos;t
          have one, a demo model loads automatically so you can try it out.
        </p>
        <p>
          Once your model is loaded, the icons in the menu become available: the
          first icon has the lighting options; the next opens a material
          selector with all the model&apos;s textures, applied to whichever
          material is selected; the third lets you change the background color
          (not saved); and the last lets you export your modified model.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span>
            Did you enjoy Fast 3D Editor? Consider donating a small amount to
            help the project:{" "}
          </span>
          <Donate />
        </div>
        <div className="flex items-end gap-1 justify-end">
          <span className="text-[8px]">made by •</span>
          <Link
            className="text-foreground/80 text-[12px] hover:underline"
            target="_blank"
            href="https://linktr.ee/discodevl"
          >
            @discodevl
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Doc;
