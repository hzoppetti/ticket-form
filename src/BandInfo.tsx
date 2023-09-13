// import parse from "html-react-parser";
interface BandProps {
  bandId: string;
  bandName: string;
  eventDate: Date;
  eventAddress: string;
  imageUrl: string;
  selectedBandId: string;
}

const BandInfo = ({
  bandId,
  bandName,
  eventDate,
  eventAddress,
  imageUrl,
  selectedBandId,
}: BandProps) => {
  // I commented this out because of the html inside -
  // I tried to use a library to insert this but it was causing errors and I didn't want
  // to spend a lot of time on it
  //const desc = parse(band.description_blurb);
  return (
    <>
      {selectedBandId === bandId && (
        <img
          src={imageUrl}
          className="pb-3"
          alt={`band image for ${bandName}`}
        ></img>
      )}
      <h2 className="text-2xl font-bold">{bandName}</h2>
      <div className="flex flex-cols gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <p className="pb-0">{eventDate.toDateString()}</p>
      </div>
      <div className="flex flex-cols gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        <p className="pb-0">{eventAddress}</p>
      </div>
      {/* {selectedBandId === band.id && <>{desc}</>} */}
    </>
  );
};

export default BandInfo;
