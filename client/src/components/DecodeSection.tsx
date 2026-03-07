

const DecodeSection = () => {
  return (
    <section className="space-y-3 w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <h2 className="text-lg text-(--black-light) font-medium">
          Decode Message
        </h2>
        <button className="w-full max-w-80 px-4 py-1.5 hover:bg-(--white-dark) text-base text-(--black) rounded-md border-2 border-(--black-light) font-medium">
          Select Encoded Image...
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
      
      <button className="text-base text-(--white) w-full max-w-80 px-3 py-2 rounded-md bg-(--blue) mx-auto font-medium">Decode Message</button>

      <p className="text-lg text-(--black-light) font-medium w-full max-w-100 text-left">Hidden Message:</p>

      <div className="min-h-10 px-3 w-full max-w-100 rounded-md bg-(--white-dark) border-2 border-(--black-light)">
        <p className="text-base text-(--black-light) font-medium"></p>
      </div>
      <button className="text-base text-(--black) w-full max-w-80 px-3 py-2 rounded-md bg-(--white-dark) mx-auto font-medium">Copy to Clipboard</button>
    </section>
  )
}

export default DecodeSection