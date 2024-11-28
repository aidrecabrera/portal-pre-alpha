export const fetchPaymentChannels = {
  cashierInfo: {
    hours: "Weekdays from 8:00 AM to 5:00 PM",
    guidelines: [
      "Wear your face mask & face shield upon entry",
      "Always observe social distancing",
    ],
  },
  channels: [
    {
      type: "bank",
      name: "Metrobank",
      accountName: "COR JESU COLLEGE, INC.",
      accountNumber: "129-3-12949214-8",
      instructions: [],
    },
    {
      type: "bank",
      name: "BDO Unibank",
      accountName: "COR JESU COLLEGE, INC.",
      accountNumber: "0051-10117498",
      instructions: [],
    },
    {
      type: "online",
      name: "GCash",
      accountName: "RA*A KA****A R.",
      accountNumber: "0912 552 7084",
      instructions: [
        "Take a screenshot of the transaction",
        "Fill out the form below",
        "Attach the screenshot as proof of payment",
      ],
    },
    {
      type: "online",
      name: "Landbank",
      accountName: "COR JESU COLLEGE, INC.",
      accountNumber: "0332-0058-12",
      instructions: [
        "Go to the Landbank Portal and select Cor Jesu College Inc. in the Merchant's Page",
        "Select Transaction Type (Tuition Fees)",
        "Fill out transaction details and review provided information",
        "Select LANDBANK or Bancnet as the payment mode",
        "View/Print Payment Confirmation",
        "Send a copy of the payment confirmation to CJC-Finance Office via Messenger with the student's name, ID number, course/grade, and year level",
      ],
    },
    {
      type: "remittance",
      name: "Palawan Pawnshop",
      accountName: "COR JESU COLLEGE, INC.",
      accountNumber: "",
      instructions: [
        "Receiver: COR JESU COLLEGE, INC.",
        "Sender: Student complete name, course upon enrollment, and amount",
        "Example: JUAN DELA CRUZ, BSED-4, P2,500.00",
        "Send a photo of the deposit slip to CJC-Finance Office via Messenger for verification",
      ],
    },
  ],
};
