import { useState } from "react";

import "./App.css";
import BandForm, { TicketInfo } from "./BandForm";

import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";
import BandInfo from "./BandInfo";

function App() {
  const bands = [skaBand, kpopBand, punkBand];

  /**
   * keep track of which band is selected - i'd like to make this rise to the top
   * this is just the band id to make sure when it changes to clear out the form
   *  */
  const [selectedBandId, setSelectedBandId] = useState("");

  // this is the band form
  const [bandInfo, setBandInfo] = useState(<></>);

  function openTicketForm(
    bandId: string,
    bandName: string,
    bandTicketTypes: TicketInfo[]
  ) {
    // create the band form and set the band info
    setSelectedBandId(bandId);

    setBandInfo(
      <BandForm
        bandId={bandId}
        bandName={bandName}
        ticketTypes={bandTicketTypes}
        selectedBandId={selectedBandId}
      ></BandForm>
    );
  }

  const bandList = bands.map((band) => {
    const eventDate = new Date(band.date);

    return (
      <div
        className="flex flex-col m-3 p-5 w-96 border rounded border-solid border-slate-500"
        key={band.id}
        onClick={() => openTicketForm(band.id, band.name, band.ticketTypes)}
      >
        <BandInfo
          key={band.id}
          bandId={band.id}
          bandName={band.name}
          eventDate={eventDate}
          eventAddress={band.location}
          imageUrl={band.imgUrl}
          selectedBandId={selectedBandId}
        />
      </div>
    );
  });

  return (
    <>
      <h2 className="text-4xl pb-10">Select a band for ticketing</h2>
      <div className="flex">
        <div className="flex flex-col pr-10">{bandList}</div>
        <div className="flex max-w-2xl">{bandInfo}</div>
      </div>
    </>
  );
}

export default App;
