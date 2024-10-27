export const generateSeatsFor3x1 = () => {
  const rows = 10; // Define number of rows
  const seats = [];

  for (let i = 0; i < rows; i++) {
    const rowLabel = String.fromCharCode(65 + i); // A, B, C, etc.
    seats.push([
      {
        seatNumber: `${rowLabel}1`,
        status: "available",
        isBooked: false,
        reserved: false,
        reservedBy: null,
        reservationExpiresAt: null,
      },
      {
        seatNumber: `${rowLabel}2`,
        status: "available",
        isBooked: false,
        reserved: false,
        reservedBy: null,
        reservationExpiresAt: null,
      },
      {
        seatNumber: `${rowLabel}3`,
        status: "available",
        isBooked: false,
        reserved: false,
        reservedBy: null,
        reservationExpiresAt: null,
      },
      {
        seatNumber: `${rowLabel}4`,
        status: "available",
        isBooked: false,
        reserved: false,
        reservedBy: null,
        reservationExpiresAt: null,
      },
    ]);
  }

  return seats;
};

export const generateSeatsFor2x1 = () => {
  const rows = 10; // Define number of rows
  const seats = [];

  for (let i = 0; i < rows; i++) {
    const rowLabel = String.fromCharCode(65 + i); // A, B, C, etc.
    seats.push([
      {
        seatNumber: `${rowLabel}1`,
        status: "available",
        isBooked: false,
        reserved: false,
        reservedBy: null,
        reservationExpiresAt: null,
      },
      {
        seatNumber: `${rowLabel}2`,
        status: "available",
        isBooked: false,
        reserved: false,
        reservedBy: null,
        reservationExpiresAt: null,
      },
      {
        seatNumber: `${rowLabel}3`,
        status: "available",
        isBooked: false,
        reserved: false,
        reservedBy: null,
        reservationExpiresAt: null,
      },
    ]);
  }

  return seats;
};
