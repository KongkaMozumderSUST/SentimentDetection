// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import async from "async";
import { fs } from "fs";
import { https } from "https";
import { createReadStream } from "fs";
import util from "util";
import { path } from "path";

const sleep = util.promisify(setTimeout);
export default function handler(req, res) {
  if (req.method == "POST") {
    console.log("yo from server", req.body);

    const key = process.env.KEY1;
    const endpoint = process.env.ENDPOINT;
    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
      endpoint
    );
    let text = "";
    function computerVision() {
      console.log("yo1");
      async.series(
        [
          async function () {
            const printedTextSampleURL = req.body.url;

            const printedResult = await readTextFromURL(
              computerVisionClient,
              printedTextSampleURL
            );
             printRecText(printedResult);

            async function readTextFromURL(client, url) {
              console.log("yo2");
              let result = await client.read(url);
              let operation = result.operationLocation.split("/").slice(-1)[0];

              while (result.status !== "succeeded") {
                await sleep(1000);
                result = await client.getReadResult(operation);
              }
              return result.analyzeResult.readResults;
            }

             function printRecText(readResults) {
              console.log("yo3");
              for (const page in readResults) {
                if (readResults.length > 1) {
                  console.log(`==== Page: ${page}`);
                }
                const result = readResults[page];
                if (result.lines.length) {
                  for (const line of result.lines) {
                    text += "\n";
                    text += line.words.map((w) => w.text).join(" ");
                  }
                } else {
                  console.log("No recognized text.");
                }
              }
            }
          },
          function () {
            return new Promise((resolve) => {
              console.log("yo4");
              res.status(201).json({ text: text });
              console.log("yo5");
              resolve();
            });
          },
        ],
        (err) => {
          throw err;
        }
      );
    }
    computerVision();
  }
}
