// export const generateSeatsFor3x1 = () => {
//   const rows = 10; // Define number of rows
//   const seats = [];

//   for (let i = 0; i < rows; i++) {
//     const rowLabel = String.fromCharCode(65 + i); // A, B, C, etc.
//     seats.push([
//       {
//         seatNumber: `${rowLabel}1`,
//         status: "available",
//         isBooked: false,
//         reserved: false,
//         reservedBy: null,
//         reservationExpiresAt: null,
//       },
//       {
//         seatNumber: `${rowLabel}2`,
//         status: "available",
//         isBooked: false,
//         reserved: false,
//         reservedBy: null,
//         reservationExpiresAt: null,
//       },
//       {
//         seatNumber: `${rowLabel}3`,
//         status: "available",
//         isBooked: false,
//         reserved: false,
//         reservedBy: null,
//         reservationExpiresAt: null,
//       },
//       {
//         seatNumber: `${rowLabel}4`,
//         status: "available",
//         isBooked: false,
//         reserved: false,
//         reservedBy: null,
//         reservationExpiresAt: null,
//       },
//     ]);
//   }

//   return seats;
// };

export const generateSeatsFor3x2 = () => {
    const rows = 10; // Define the number of rows
    const seats = [];

    for (let i = 0; i < rows; i++) {
        const rowLabel = String.fromCharCode(65 + i); // A, B, C, etc.
        seats.push([
            // Three seats on one side of the aisle
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
            // Two seats on the other side of the aisle
            {
                seatNumber: `${rowLabel}4`,
                status: "available",
                isBooked: false,
                reserved: false,
                reservedBy: null,
                reservationExpiresAt: null,
            },
            {
                seatNumber: `${rowLabel}5`,
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
export const generateSeatsFor2x2 = () => {
    const rows = 12; // 12 rows for a total of 48 seats (2x2 layout)
    const seats = [];

    for (let i = 0; i < rows; i++) {
        const rowLabel = String.fromCharCode(65 + i); // A, B, C, etc.
        seats.push([
            // Two seats on one side of the aisle
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
            // Two seats on the other side of the aisle
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
    const rows = 13; // 13 rows for a total of 39 seats (2x1 layout)
    const seats = [];

    for (let i = 0; i < rows; i++) {
        const rowLabel = String.fromCharCode(65 + i); // A, B, C, etc.
        seats.push([
            // Two seats on one side of the aisle
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
            // One seat on the other side of the aisle
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
