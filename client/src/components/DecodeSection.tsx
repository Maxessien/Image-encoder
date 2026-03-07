import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const DecodeSection = () => {
  const [formInfo, setFormInfo] = useState<{
    image: FileList | [];
  }>({ image: [] });
  const [displayText, setDisplayText] = useState({
    decoded: "",
    copyText: "Copy to Clipboard",
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const validateFormInfo = (): boolean => {
    // Decoding only needs one uploaded image.
    const imagePresent =
      formInfo.image.length > 0 && formInfo.image?.[0] instanceof File;

    return imagePresent;
  };

  const { isPending, mutateAsync } = useMutation<{text: string}>({
    mutationFn: async () => {
      const formValid = validateFormInfo();
      if (!formValid) throw new Error("Invalid form data");
      const formData = new FormData();
      formData.append("image", formInfo.image?.[0]);
      const res = await axios.post<{text: string}>("/decode", formData);
      return res.data;
    },
    onSuccess: (data) => {
      setDisplayText((state) => ({ ...state, decoded: data.text }));
      toast.success("Image Decoded");
    },
    onError: () => {
      toast.error("Decoding Failed");
    },
  });

  return (
    <section className="space-y-3 w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <h2 className="text-lg text-(--black-light) font-medium">
          Decode Message
        </h2>
        <button
          onClick={() => imageInputRef.current?.click()}
          className="w-full max-w-80 px-4 py-1.5 hover:bg-(--white-dark) text-base text-(--black) rounded-md border-2 border-(--black-light) font-medium"
        >
          Select Encoded Image...
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

      <button
        onClick={() => mutateAsync()}
        disabled={isPending || !validateFormInfo()}
        className="text-base text-(--white) disabled:opacity-65 w-full max-w-80 px-3 py-2 rounded-md bg-(--blue) mx-auto font-medium"
      >
        Decode Message
      </button>

      <p className="text-lg text-(--black-light) font-medium w-full max-w-100 text-left">
        Hidden Message:
      </p>

      <div className="min-h-10 px-3 w-full max-w-100 rounded-md bg-(--white-dark) border-2 border-(--black-light)">
        <p className="text-base text-(--black-light) font-medium">
          {displayText.decoded}
        </p>
      </div>
      <button
        onClick={async () => {
          const clip = window.navigator.clipboard;
          clip.writeText(displayText.decoded);
          setDisplayText((state) => ({ ...state, copyText: "Copied" }));
          // Revert button text after a short confirmation window.
          setTimeout(() =>
            setDisplayText((state) => ({
              ...state,
              copyText: "Copy to Clipboard",
            })), 2000
          );
        }}
        disabled={!(displayText.decoded.length > 0)}
        className="text-base text-(--black) disabled:opacity-65 w-full max-w-80 px-3 py-2 rounded-md bg-(--white-dark) mx-auto font-medium"
      >
        {displayText.copyText}
      </button>
    </section>
  );
};

export default DecodeSection;
