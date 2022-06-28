import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../../features/tickets/ticketSlice";
import { toast } from "react-toastify";

// components
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import TicketItem from "../../components/TicketItem";

function Tickets() {
  // State
  const { tickets, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  //   UseEffect
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTickets());
  }, [dispatch, message, isError]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <BackButton url="/"></BackButton>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket}></TicketItem>
        ))}
      </div>
    </>
  );
}

export default Tickets;
