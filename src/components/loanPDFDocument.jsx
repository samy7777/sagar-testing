export const generateLoanPDF = ({
    data,
    totalAmount,
    filters,
    stateName = "",
    cityName = "",
    regionName = "",
  }) => {
    const {
      fromDate = "",
      toDate = "",
      isActive = "All",
      isDefaulted = "All",
    } = filters;
  
    const loanRows = data.map((loan) => [
      loan.user?.name || "—",
      loan.loanType?.label || "—",
      `₹${loan.amount?.toFixed(2)}`,
      `₹${loan.pendingAmount?.toFixed(2)}`,
      loan.isClosed ? "Closed" : loan.isDefaulted ? "Defaulted" : "Active",
      new Date(loan.startDate).toLocaleDateString(),
    ]);
  
    const docDefinition = {
      pageOrientation: "landscape",
      content: [
        { text: "📄 Loan Report", style: "header" },
        {
          columns: [
            { text: `State: ${stateName}`, style: "filter" },
            { text: `City: ${cityName}`, style: "filter" },
            { text: `Region: ${regionName}`, style: "filter" },
            { text: `Status: ${isActive}`, style: "filter" },
            { text: `Defaulter: ${isDefaulted}`, style: "filter" },
            { text: `From: ${fromDate}`, style: "filter" },
            { text: `To: ${toDate}`, style: "filter" },
          ],
        },
        { text: "\n" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*"],
            body: [
              [
                { text: "User", bold: true },
                { text: "Loan Type", bold: true },
                { text: "Amount", bold: true },
                { text: "Pending", bold: true },
                { text: "Status", bold: true },
                { text: "Start Date", bold: true },
              ],
              ...loanRows,
              [
                { text: "Total", colSpan: 2, bold: true },
                {},
                { text: `₹${totalAmount?.amount?.toFixed(2) || 0}`, bold: true },
                {
                  text: `₹${totalAmount?.pendingAmount?.toFixed(2) || 0}`,
                  bold: true,
                },
                {},
                {},
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          marginBottom: 10,
        },
        filter: {
          fontSize: 9,
          marginBottom: 4,
        },
      },
    };
  
    pdfMake.createPdf(docDefinition).download("loan-report.pdf");
  };
  