import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const EncodeSection = () => {
  const [formInfo, setFormInfo] = useState<{
    image: FileList | [];
    text: string;
  }>({ image: [], text: "" });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [maxMessageLength, setMaxMessageLength] = useState(
    formInfo.image?.[0].size - 88 > 0 ? formInfo.image?.[0].size - 88 : 0,
  );

  useEffect(() => {
    const setM = () => {
      setMaxMessageLength(
        formInfo.image?.[0].size - 88 > 0 ? formInfo.image?.[0].size - 88 : 0,
      );
    };
    setM();
  }, [formInfo]);
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
    <section className="w-full flex flex-col">
      <h2 className="text-[18px] text-(--black-light) font-medium text-center py-4 pb-4 sm:text-[18px] md:text-[20px] lg:text-[30px]">
        Encode Message
      </h2>

      <div className="sm:flex-row md:flex gap-4 px-6 ">
        <div className="flex flex-col gap-3 flex-1 items-center">
          <button
            onClick={() => imageInputRef?.current?.click()}
            className="w-full max-w-80 px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-base text-white rounded-md font-medium"
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
        </div>
        <div className="flex-1">
          <p className="sm:text-lg text-(--black-light) font-medium w-full max-w-100 text-left pt-1 pb-4">
            Message To Encode:
          </p>
          <textarea
            onChange={({ target: { value } }) => {
              if (formInfo.text.length >= maxMessageLength) return;
              setFormInfo((state) => ({ ...state, text: value }));
            }}
            value={formInfo.text}
            placeholder="Enter your secret message here..."
            name="encode_text"
            id="encode_text_id"
            className="h-52 w-full resize-none border-2 border-[#ddd] outline-none text-base font-medium text-(--black) px-3 py-2 bg-gray-50 placeholder:text-gray-600 rounded-md]"
          ></textarea>
        </div>
      </div>

      <div className="mt-5 text-center px-6">
        <p className="text-base text-(--black-light) font-medium">
          You can hide up to {maxMessageLength} characters
        </p>
        <button
          disabled={isPending || !validateFormInfo()}
          onClick={() => mutateAsync()}
          className="text-base text-(--white) disabled:opacity-65 w-full max-w-80 px-3 py-2 rounded-md bg-teal-500 mx-auto font-medium"
        >
          Encode & Save
        </button>
      </div>
    </section>
  );
};

export default EncodeSection;
