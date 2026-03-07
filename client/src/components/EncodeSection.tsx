const EncodeSection = () => {
  return (
    <section className="space-y-3 w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <h2 className="text-lg text-(--black-light) font-medium">
          Encode Message
        </h2>
        <button className="w-full hover:bg-(--white-dark) max-w-80 px-4 py-1.5 text-base text-(--black) rounded-md border-2 border-(--black-light) font-medium">
          Select Image...
        </button>
        <input className="hidden" type="file" />
        <div className="w-full aspect-video max-w-100 border-2 border-(--black-light) rounded-md overflow-hidden">
          <img
            src=""
            className="object-cover w-full h-full object-center"
            alt=""
          />
        </div>
      </div>
      <div className="space-y-2 w-full max-w-120">
        <p className="text-lg text-(--black-light) font-medium">Message To Encode:</p>
        <textarea
          placeholder="Enter your secret message here..."
          name="encode_text"
          id="encode_text_id"
          className="w-full h-25 border-2 border-(--black-light) text-base font-medium text-(--black) px-3 py-2 bg-gray-50 placeholder:text-gray-600 rounded-md"
        ></textarea>
        <p className="text-base text-(--black-light) font-medium">You can hide up to 1500 characters</p>
      </div>
      <button className="text-base text-(--white) w-full max-w-80 px-3 py-2 rounded-md bg-(--blue) mx-auto font-medium">Encode & Save</button>
    </section>
  );
};

export default EncodeSection;
