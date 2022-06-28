import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTicket,
  closedTicket,
  reset,
} from "../../features/tickets/ticketSlice";
import {
  getNotes,
  createNote,
  reset as noteReset,
} from "../../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus, FaWindowClose } from "react-icons/fa";

// components
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import NoteItem from "../../components/NoteItem";

// Modal Styling
const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  // State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );
  const {
    notes,
    isLoading: isLoadingNote,
    isError: isErrorNote,
    message: messageNote,
  } = useSelector((state) => state.notes);
  //   Get the id to fetch
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ticketID = params.id;

  //   Functions
  const onTicketClosed = (e) => {
    dispatch(closedTicket(ticketID));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNote({
        noteText,
        ticketID,
      })
    );
    closeModal();
    setNoteText("");
  };
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
    if (isErrorNote) {
      toast.error(messageNote);
    }
    dispatch(getNotes(ticketID));
    // eslint-disable-next-line
    dispatch(getTicket(ticketID));
  }, [ticketID, message, isError, isErrorNote, messageNote, dispatch]);

  if (isLoading || isLoadingNote) {
    return <Spinner></Spinner>;
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets"></BackButton>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr></hr>
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus></FaPlus>Add Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          <FaWindowClose></FaWindowClose>
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notes.length ? (
        notes.map((note) => <NoteItem key={note._id} note={note}></NoteItem>)
      ) : (
        <div>No notes to display</div>
      )}

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClosed}>
          Closed
        </button>
      )}
    </div>
  );
}

export default Ticket;
