import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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
    onError: (err) => {
      if ((err as AxiosError<{message: string}>).response?.data?.message === "Unrecognised encoding")
        toast.error("No message has been encoded into this image");
      else toast.error("Decoding Failed");
    },
  });

  return (
    <section className="w-full">
        <h2 className="text-[18px] text-(--black-light) font-medium text-center py-4 pb-4 sm:text-[18px] md:text-[20px] lg:text-[30px]">
          Decode Message
        </h2>
        <div className="sm:flex-row md:flex gap-4 px-6 ">
          <div className="flex flex-col gap-3 items-center flex-1">
            <button
              onClick={() => imageInputRef.current?.click()}
              className="w-full max-w-80 px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-base text-white rounded-md font-medium"
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
            <div className="w-full h-52 border-2 border-[#ddd] border-dashed rounded-md overflow-hidden">
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

            <button
              onClick={() => mutateAsync()}
              disabled={isPending || !validateFormInfo()}
              className="text-base text-(--white) disabled:opacity-65 w-full max-w-80 px-3 py-2 rounded-md bg-teal-500 mx-auto font-medium"
            >
              Decode Message
            </button>
          </div>

          <div className="md:flex-1 flex flex-col gap-3">
            <p className="mt-5 sm:m-0 text-lg  text-(--black-light) font-medium w-full max-w-100 text-left py-1">
              Hidden Message:
            </p>

            <div className="h-52 px-3 w-full rounded-md border-2 border-[#ddd]">
              <textarea readOnly value={displayText.decoded} className="text-base w-full h-full resize-none outline-none text-(--black-light) font-medium">
              </textarea>
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
          </div>
        </div>

    </section>
  );
};

export default DecodeSection;
