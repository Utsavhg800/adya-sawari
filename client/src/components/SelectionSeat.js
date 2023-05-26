import React from "react";
import { Row, Col } from "antd";
import "../resources/BusSeat.css"

function SelectionSeat({ selectedSeats, setSelectedSeats, bus }) {
  const capacity = bus.capacity;
  let seatImage ="http://localhost:3000/seat.png"

  const selectOrUnselectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="mx-5">
      <div className="bus-container">
        <Row gutter={[10, 10]}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatClass = ''
            if(selectedSeats.includes(seat+1))
            {
                seatClass = 'selected-seat'
            }else if (bus.bookedSeats.includes(seat+1))
            {
                seatClass = 'booked-seat'
            }
            return (
              <Col span={12}>
                <div
                  className={`seat ${seatClass}`}
                  onClick={() => selectOrUnselectSeats(seat + 1)}
                >
                  <img src={seatImage} width="50" alt=""/>
                   {seat + 1}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SelectionSeat;