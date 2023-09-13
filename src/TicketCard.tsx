import React from "react";

interface TicketCardProps {
  ticketName: string;
  ticketDescription: string;
  ticketPrice: number;
  totalTickets: () => any;
}

const TicketCard = ({
  ticketName,
  ticketDescription,
  ticketPrice,
  totalTickets,
}: TicketCardProps) => {
  function handleChange() {
    //update ticket array

    totalTickets();
  }

  return (
    <div className="ticket-card-container">
      <div className="ticket-card-info">
        <h2>{ticketName}</h2>
        <p>{ticketDescription}</p>
        <p>{ticketPrice}</p>
      </div>
      <div className="ticket-card-select">
        <input
          className="ticket-card-spinner"
          id={ticketName}
          type="number"
          min="0"
          max="999"
          step="1"
          onChange={() => {
            handleChange();
          }}
        ></input>
      </div>
    </div>
  );
};

export default TicketCard;
