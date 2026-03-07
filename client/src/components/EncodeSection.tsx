import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const EncodeSection = () => {
  const [formInfo, setFormInfo] = useState<{
    image: FileList | [];
    text: string;
  }>({ image: [], text: "" });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const validateFormInfo = (): boolean => {
    // Require both a real file and a non-empty message before encoding.
    const imagePresent =
      formInfo.image.length > 0 && formInfo.image?.[0] instanceof File;
    const textValid = formInfo.text?.trim()?.length > 0;

    return imagePresent && textValid;
  };

  const { isPending, mutateAsync } = useMutation<ArrayBuffer>({
    mutationFn: async () => {
      const formValid = validateFormInfo();
      if (!formValid) throw new Error("Invalid form data");
      const formData = new FormData();
      formData.append("image", formInfo.image?.[0]);
      formData.append("text", formInfo.text);
      const res = await axios.post<ArrayBuffer>("/encode", formData, {
        responseType: "arraybuffer",
      });
      return res.data;
    },
    onSuccess: (data: ArrayBuffer) => {
      // Trigger a client-side download of the encoded image bytes.
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([data], { type: "image/png" }));
      link.download = "encoded " + formInfo.image?.[0].name;
      link.click();
      toast.success("Download started");
    },
    onError: () => {
      toast.error("Download Failed");
    },
  });

  return (
    <section className="space-y-3 w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <h2 className="text-lg text-(--black-light) font-medium">
          Encode Message
        </h2>
        <button
          onClick={() => imageInputRef?.current?.click()}
          className="w-full hover:bg-(--white-dark) max-w-80 px-4 py-1.5 text-base text-(--black) rounded-md border-2 border-(--black-light) font-medium"
        >
          Select Image...
        </button>
        <input
          ref={imageInputRef}
          onChange={({ target: { files } }) => {
            setFormInfo((state) => ({ ...state, image: files ?? [] }));
          }}
          className="hidden"
          type="file"
        />
        <div className="w-full aspect-video max-w-100 border-2 border-(--black-light) rounded-md overflow-hidden">
          <img
            src={
              formInfo.image?.length > 0 && formInfo.image instanceof FileList
                ? URL.createObjectURL(formInfo.image?.[0])
                : ""
            }
            className="object-cover w-full h-full object-center"
            alt={
              formInfo.image?.length > 0 && formInfo.image instanceof FileList
                ? formInfo.image?.[0].name
                : "image"
            }
          />
        </div>
      </div>
      <div className="space-y-2 w-full max-w-120">
        <p className="text-lg text-(--black-light) font-medium">
          Message To Encode:
        </p>
        <textarea
          onChange={({ target: { value } }) =>
            setFormInfo((state) => ({ ...state, text: value }))
          }
          value={formInfo.text}
          placeholder="Enter your secret message here..."
          name="encode_text"
          id="encode_text_id"
          className="w-full h-25 border-2 border-(--black-light) text-base font-medium text-(--black) px-3 py-2 bg-gray-50 placeholder:text-gray-600 rounded-md"
        ></textarea>
        <p className="text-base text-(--black-light) font-medium">
          You can hide up to 1500 characters
        </p>
      </div>
      <button
        disabled={isPending || !validateFormInfo()}
        onClick={() => mutateAsync()}
        className="text-base text-(--white) disabled:opacity-65 w-full max-w-80 px-3 py-2 rounded-md bg-(--blue) mx-auto font-medium"
      >
        Encode & Save
      </button>
    </section>
  );
};

export default EncodeSection;
