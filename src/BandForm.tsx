/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

/**
 * notes: I did take some extra time to implement some tailwind css
 * I hadn't used it much before and things were looking pretty ugly
 * so I went back after my alloted time and cleaned up the styling
 *
 * I also didn't spend much time on the validation. It's very basic
 * and admittedly not very good. No regex or anything like that.
 * I'm sure there are libraries that do a bang-up job. Especially on
 * the credit card info. I just wanted to show that I was checking
 * "stuff" as you type and on submit.
 *  */
export interface Ticket {
  ticketName: string;
  numSale: number;
  ticketCost: number;
}

export interface TicketInfo {
  type: string;
  name: string;
  description: string;
  cost: number;
}

interface BandFormProps {
  bandName: string;
  ticketTypes: TicketInfo[];
  selectedBandId: string;
}

const BandForm = ({ bandName, ticketTypes, selectedBandId }: BandFormProps) => {
  const [ticketArray, setTicketArray] = useState<Ticket[]>(() => {
    const tArray: Ticket[] = [];
    for (let i = 0; i < ticketTypes.length; ++i) {
      const tic = {
        ticketName: ticketTypes[i].name,
        numSale: 0,
        ticketCost: ticketTypes[i].cost,
      };
      tArray.push(tic);
    }
    return tArray;
  });
  const [totalSale, setTotalSale] = useState(0);
  const [ticketSale, setTicketSale] = useState({
    firstName: "",
    lastName: "",
    address: "",
    credit: "",
    expiration: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    credit: "",
    expiration: "",
    cvv: "",
    totalSale: "",
  });

  useEffect(() => {
    setTicketArray(cleanTicketArray());
    setTicketSale({
      firstName: "",
      lastName: "",
      address: "",
      credit: "",
      expiration: "",
      cvv: "",
    });
    setTotalSale(0);
  }, [selectedBandId]);

  useEffect(() => {
    setTotalSale(getTotalSales());
  }, [ticketArray]);

  function formatDollars(cents: number) {
    const dollars = (cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return dollars;
  }

  function cleanTicketArray() {
    const tArray: Ticket[] = [];
    for (let i = 0; i < ticketTypes.length; ++i) {
      const tic = {
        ticketName: ticketTypes[i].name,
        numSale: 0,
        ticketCost: ticketTypes[i].cost,
      };
      tArray.push(tic);
    }
    return tArray;
  }

  function getTotalSales() {
    let total = 0;
    for (let i = 0; i < ticketArray.length; ++i) {
      total += ticketArray[i].ticketCost * ticketArray[i].numSale;
    }
    if (total > 0) {
      if (errors.totalSale !== "") {
        updateError("totalSale", "");
      }
    }

    return total;
  }

  function updateError(name: string, error: string) {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: error,
      };
    });
  }

  function handleChange(event: { target: { name: any; value: any } }) {
    const { name, value } = event.target;

    // do some form validation
    let errorMsg = "";

    switch (name) {
      case "firstName":
        errorMsg = value.length < 1 ? "You must enter a first name" : "";
        break;
      case "lastName":
        errorMsg = value.length < 1 ? "You must enter a last name" : "";
        break;
      case "address":
        errorMsg = value.length < 1 ? "You must enter an address" : "";
        break;
      case "credit":
        errorMsg =
          value.length !== 16 ? "You must enter a valid credit card" : "";
        break;
      case "expiration":
        errorMsg =
          value.length !== 4 ? "You must enter a valid expiration date" : "";
        break;
      case "cvv":
        errorMsg = value.length !== 3 ? "You must enter a valid cvv" : "";
        break;
      default:
        break;
    }

    updateError(name, errorMsg);

    setTicketSale((prevTicketSale) => {
      return {
        ...prevTicketSale,
        [name]: value,
      };
    });

    // update total
    setTotalSale(getTotalSales());

    // update ticket sales
    setTicketArray((prevTicketArray) => {
      const newArray = [];
      for (let i = 0; i < prevTicketArray.length; ++i) {
        if (prevTicketArray[i].ticketName === name) {
          newArray.push({ ...prevTicketArray[i], numSale: value });
        } else {
          newArray.push(prevTicketArray[i]);
        }
      }

      return newArray;
    });
  }

  const validateForm = (
    errors: { [s: string]: unknown } | ArrayLike<unknown>
  ) => {
    let valid = true;
    Object.values(errors).forEach(
      (val: any) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  function submitForm(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (validateForm(errors)) {
      // now check for empty fields
      let errorMsg = "";
      let name = "";
      // I'm sure there's a better way to do this with object keys or something
      // but I ran out of time
      if (totalSale === 0) {
        name = "totalSale";
        errorMsg = "You must select at least one ticket to purchase";
      } else if (ticketSale.firstName.length < 1) {
        name = "firstName";
        errorMsg = "You must enter a first name";
      } else if (ticketSale.lastName.length < 1) {
        name = "lastName";
        errorMsg = "You must enter a last name";
      } else if (ticketSale.address.length < 1) {
        name = "address";
        errorMsg = "You must enter an address";
      } else if (ticketSale.credit.length !== 16) {
        name = "credit";
        errorMsg = "You must enter a valid credit card";
      } else if (ticketSale.expiration.length !== 4) {
        name = "expiration";
        errorMsg = "You must enter a valid expiration date";
      } else if (ticketSale.cvv.length !== 3) {
        name = "cvv";
        errorMsg = "You must enter a valid cvv";
      }
      if (errorMsg !== "") {
        updateError(name, errorMsg);
      } else {
        alert("success!");
        // should also sanitize the fields before submitting
      }
    }
  }

  const ticketInfo = ticketTypes.map((ticket) => {
    const indexOfTicket = ticketArray.findIndex(
      (x) => ticket.name === x.ticketName
    );

    return (
      <div
        className="flex content-start border-b-1 bg-slate-400 border-solid "
        key={ticket.name}
      >
        <div className="pb-5 mr-20 pl-10 w-3/4 pt-5">
          <h2 className="font-bold text-xl pb-2 uppercase">{ticket.name}</h2>
          <p className="pb-2">{ticket.description}</p>
          <p className="text-2xl ticket-dollars">
            {formatDollars(ticket.cost)}
          </p>
        </div>
        <div className="pr-5">
          <input
            className="text-xl pl-2 pt-1 pb-1 mt-10"
            id={ticket.name}
            type="number"
            min="0"
            max="999"
            step="1"
            name={ticket.name}
            value={
              ticketArray[indexOfTicket]
                ? ticketArray[indexOfTicket].numSale
                : 0
            }
            onChange={handleChange}
          ></input>
        </div>
      </div>
    );
  });

  return (
    <div className="text-left">
      <h2 className="font-bold text-3xl">{bandName} Tickets</h2>
      <form>
        <div>{ticketInfo}</div>
        <div className="total-container">
          <p className="uppercase pt-5">Total</p>
          <p className="pt-5">{formatDollars(totalSale)}</p>
        </div>
        {errors.totalSale.length > 0 && (
          <p className="pb-2 w-full text-red-600">{errors.totalSale}</p>
        )}
        <div className="pb-2">
          <div className="flex flex-cols w-full gap-2 pb-2">
            <input
              className="text-lg pt-2 pb-2 w-2/4 pl-5"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              name="firstName"
              value={ticketSale.firstName}
              required
            />
            <input
              className="text-lg pt-2 pb-2 w-2/4 pl-5"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              name="lastName"
              value={ticketSale.lastName}
              required
            />
          </div>
          <div className="flex flex-cols w-full gap-2 pb-2">
            {errors.firstName.length > 0 ? (
              <p className="pb-2 w-2/4 text-red-600">{errors.firstName}</p>
            ) : (
              <div className="w-2/4"></div>
            )}
            {errors.lastName.length > 0 && (
              <p className="pb-2 w-2/4 text-red-600 object-right">
                {errors.lastName}
              </p>
            )}
          </div>
          <div className="flex flex-cols w-full">
            <input
              className="text-lg pt-2 pb-2 w-full pl-5"
              type="text"
              placeholder="Address"
              onChange={handleChange}
              name="address"
              value={ticketSale.address}
              required
            />
          </div>
          <div className="flex flex-cols w-full pb-2 text-red-600">
            {errors.address.length > 0 && (
              <p className="text-red-600">{errors.address}</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="pb-2 text-lg font-bold">Payment Details</h3>
          <div className="flex flex-cols w-full pb-2">
            <input
              className="text-lg pt-2 pb-2 w-full pl-5"
              type="text"
              placeholder="0000 0000 0000 0000"
              onChange={handleChange}
              name="credit"
              value={ticketSale.credit}
              required
            />
          </div>
          <div className="flex flex-cols w-full pb-2 text-red-600">
            {errors.credit.length > 0 && (
              <p className="text-red-600">{errors.credit}</p>
            )}
          </div>
          <div className="flex flex-cols w-full gap-2 pb-2">
            <input
              className="text-lg pt-2 pb-2 w-2/4 pl-5"
              type="text"
              placeholder="MMYY"
              onChange={handleChange}
              name="expiration"
              value={ticketSale.expiration}
              required
            />
            <input
              className="text-lg pt-2 pb-2 w-2/4 pl-5"
              type="text"
              name="cvv"
              placeholder="CVV"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-cols w-full gap-2 pb-5">
            {errors.expiration.length > 0 ? (
              <p className="pb-2 w-2/4 text-red-600">{errors.expiration}</p>
            ) : (
              <div className="w-2/4"></div>
            )}
            {errors.cvv.length > 0 && (
              <p className="pb-2 w-2/4 text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>
        <input
          className="bg-slate-400 p-3 rounded cursor-pointer hover:bg-slate-500"
          type="submit"
          onClick={submitForm}
        />
      </form>
    </div>
  );
};

export default BandForm;
