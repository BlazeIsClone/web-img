"use client";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import { download } from "./actions/download";

registerPlugin(FilePondPluginImagePreview);

export default function Home() {
  return (
    <main className="p-6">
      <section>
        <h1 className="text-xl mb-5">Image Optimizer</h1>
      </section>
      <section>
        <form action={download}>
          <div className="max-w-6xl">
            <FilePond
              allowMultiple={true}
              maxFiles={99}
              server="/api"
              name="files[]"
              credits={false}
            />
          </div>
          <button
            className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
            type="submit"
          >
            Download All
          </button>
        </form>
      </section>
    </main>
  );
}
