export const generateSeatsFor3x1 = () => {
  const rows = 10; // Define number of rows
  const seats = [];

  for (let i = 0; i < rows; i++) {
    const rowLabel = String.fromCharCode(65 + i); // A, B, C, etc.
    seats.push([
      { seatNumber: `${rowLabel}1`, status: "available" }, // 3 seats on one side
      { seatNumber: `${rowLabel}2`, status: "available" },
      { seatNumber: `${rowLabel}3`, status: "available" },
      { seatNumber: `${rowLabel}4`, status: "available" }, // 1 seat on the other side
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
      { seatNumber: `${rowLabel}1`, status: "available" }, // 2 seats on one side
      { seatNumber: `${rowLabel}2`, status: "available" },
      { seatNumber: `${rowLabel}3`, status: "available" }, // 1 seat on the other side
    ]);
  }

  return seats;
};
