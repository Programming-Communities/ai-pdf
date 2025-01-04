import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const pdfUrl="https://giant-dodo-170.convex.cloud/api/storage/5787a5c7-343d-483f-be17-33f40721459d"
export async function GET(req) {

    // Load the PDF file
    const response = await fetch(pdfUrl);
    const data=await response.blob();
    const loader=new WebPDFLoader(data);
    const docs=await loader.load();

    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent=pdfTextContent+doc.pageContent;
    })

    //.2 Split the text into sentences / 
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });
      const output = await splitter.createDocuments([pdfTextContent]);

      let splitterList = [];
      output.forEach((doc) => {
        splitterList.push(doc.pageContent);
      });

  return NextResponse.json({ Result: splitterList });
}
