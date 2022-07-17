import { Dropzone } from "dropzone.js";

Dropzone.autoDiscover = true;
export function DropzoneSound() {
  let myDropzone = new Dropzone("#dropzone_mp3");
  myDropzone.on("addedfile", (file) => {
    console.log("filename: " + file.name);
  });
}
