const express = require("express");
const cors = require("cors");
const { getBrowser } = require("./browser/getBrowser");
const { uploadToImgBB } = require("./utils/upload");
const { screenshotEmail } = require("./browser/screenshot");

const app = express();

app.use(
  cors({
    origin: "https://osupporto-help.zendesk.com/",
  })
);

app.get("/automation", async (req, res) => {
  try {
    const browser = await getBrowser();
    const url = `https://app.iterable.com/triggered/viewSentEmail?messageId=${req.query.messageId}&recipient=${req.query.recipient}`;

    const screenshot = await screenshotEmail(
      browser,
      url,
      req.query.messageType
    );
    const uploaded = await uploadToImgBB(screenshot);

    if (!uploaded || !uploaded.data || !uploaded.data.url_viewer) {
      throw new Error("Invalid response from uploadToImgBB");
    }

    res.status(200).json({ urlViewer: uploaded.data.url_viewer });
  } catch (error) {
    console.error(error);
    console.error(Date.now(), error?.response?.data?.error);
    const errorMessage = error.message || "Something went wrong";
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(3000, () => console.log("Listening on port 3000"));
