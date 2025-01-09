const { ObjectId } = require("mongodb");
const PDFDocument = require("pdfkit");
const path = require("path"); // For resolving file paths

const {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} = require("../models/noticeModel");

async function addNotice(req, res) {
  try {
    const newNotice = req.body;
    const result = await createNotice(newNotice);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in creating notice." });
  }
}

async function listNotice(req, res) {
  try {
    const notices = await getAllNotices();
    res.status(200).json(notices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in fetching all notices." });
  }
}

async function getSingleNotice(req, res) {
  try {
    const noticeId = req.params.id;
    const notice = await getNoticeById(noticeId);
    if (!notice) res.status(404).json({ message: "Notice not found." });
    res.status(200).json(notice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in fetching notice." });
  }
}

async function editNotice(req, res) {
  try {
    const noticeId = req.params.id;

    // Validate noticeId
    if (!ObjectId.isValid(noticeId)) {
      return res.status(400).json({ message: "Invalid notice ID." });
    }

    // Exclude _id from the updatedNotice object
    const { _id, ...updatedNotice } = req.body;

    // Validate req.body
    if (!updatedNotice.title || !updatedNotice.content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const result = await updateNotice(noticeId, updatedNotice);

    // Check result and send appropriate response
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Notice not found." });
    }

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes were made." });
    }

    res.status(200).json({ message: "Notice updated successfully." });
  } catch (error) {
    console.error("Error updating notice:", error.message);
    res
      .status(500)
      .json({ message: "Error in updating notice.", error: error.message });
  }
}

async function removeNotice(req, res) {
  try {
    const noticeId = req.params.id;
    const result = await deleteNotice(noticeId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting notice." });
  }
}

// Generate and download PDF
async function generateNoticePdf(req, res) {
  try {
    const noticeId = req.params.id;
    const notice = await getNoticeById(noticeId);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=notice-${noticeId}.pdf`
    );

    doc.pipe(res);
    // Add logo
    const logoPath = path.join(
      __dirname,
      "../../client/public/assets/favicon/webDevProF.png"
    ); // Adjust path as needed

    const logoLeftMargin = 72 * 1.1; // 1.2 inches
    doc.image(logoPath, logoLeftMargin, 45, { width: 80 }); // Position (x, y) and size (width)

    // Adjust the Y-coordinate for the title to prevent overlap
    const logoHeight = 100; // The height of the logo (in pixels)
    doc.moveTo(150, 40 + logoHeight + 20); // Adjust Y position after the logo (20px padding)

    // Add address next to the logo
    // Calculate center position for the address
    const pageWidth = doc.page.width; // Get the page width
    const addressText = "WebDevProF\n123 Developer Lane\nTech City, TC 45678";
    const addressFontSize = 16;

    doc.fontSize(addressFontSize); // Set the font size for the address
    const addressTextWidth = doc.widthOfString(addressText); // Measure text width

    const addressX = (pageWidth - addressTextWidth) / 2; // Center the address horizontally
    const addressY = 60; // Vertical position for the address

    // Draw the address at the calculated position
    doc.text(addressText, addressX, addressY, { align: "center" });
    doc.moveDown(4);

    // Draw a horizontal line below the logo and address
    const lineY = addressY + 70; // Position for the line (adjust as needed)
    doc
      .moveTo(60, lineY)
      .lineTo(pageWidth - 50, lineY)
      .stroke();

    // Move down to start the title below the logo and address
    doc.moveTo(50, 170);
    doc.moveDown();

    // Set the left margin for title and content
    const leftMargin = 72 * 1.3; // Approx. 1.3 inches
    const topMarginAfterHeader = 170; // Y-coordinate for the title start

    // Add notice details to the PDF
    doc
      .fontSize(18)
      .text(`Notice Title: ${notice.title}`, leftMargin, topMarginAfterHeader, {
        underline: true,
      });
    doc.moveDown(2);
    doc
      .fontSize(14)
      .text(notice.content, leftMargin, undefined, { align: "justify" });
    doc.moveDown();
    doc.fontSize(12).text(`Status: ${notice.status}`);
    doc.moveDown();
    doc
      .fontSize(12)
      .text(`Created At: ${new Date(notice.createdAt).toLocaleString()}`);

    // Add page number to the footer
    const addPageNumbers = (pdfDoc) => {
      const pageCount = pdfDoc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        pdfDoc.switchToPage(i);
        pdfDoc
          .fontSize(10)
          .text(`Page ${i + 1} of ${pageCount}`, 50, pdfDoc.page.height - 50, {
            align: "center",
          });
      }
    };

    // End the document and add page numbers
    doc.on("end", () => addPageNumbers(doc));
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error.message);
    res.status(500).json({ message: "Error generating PDF" });
  }
}

module.exports = {
  addNotice,
  listNotice,
  getSingleNotice,
  editNotice,
  removeNotice,
  generateNoticePdf,
};
