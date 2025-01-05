"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);

  const user = {
    primaryEmailAddress: { emailAddress: "user@example.com" },
  };

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open,setOpen]=useState(false);

  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const onUpload = async () => {
    setLoading(true);

    try {
      if (!file) {
        alert("Please select a file to upload.");
        setLoading(false);
        return;
      }

      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();

      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId });
      const fileNameToSave = fileName || file.name || "Untitled File";

      const resp = await addFileEntry({
        fileId,
        storageId,
        fileName: fileNameToSave,
        fileUrl,
        createdBy: user.primaryEmailAddress.emailAddress,
      });

      console.log("File successfully uploaded:", resp);

      const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
      if (ApiResp?.data?.Result) {
        console.log("Processed PDF content:", ApiResp.data.Result);

        const embeddedDocumentResponse = await embeddDocument({
          splitText: ApiResp.data.Result,
          fileId: fileId,
        });

        console.log("Document embedded successfully:", embeddedDocumentResponse);
      } else {
        console.error("Unexpected API response:", ApiResp.data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={()=>setOpen(true)}className='w-full flex gap-2 mt-5 '>+Upload PDF File</Button>
        </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-5">Select a file to upload</h2>
              <div className="gap-2 p-3 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={onFileSelect}
                />
              </div>
              <div className="mt-3">
                <label>File Name *</label>
                <Input
                  className="mt-2"
                  placeholder="File Name"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onUpload} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;



// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useAction, useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Loader2Icon } from "lucide-react";
// import uuid4 from "uuid4";

// function UploadPdfDialog({ children }) {
//   const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
//   const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
//   const getFileUrl = useMutation(api.fileStorage.getFileUrl);
//   const embeddDocument=useAction(api.myAction.ingest);

//   const user = {
//     primaryEmailAddress: { emailAddress: "user@example.com" },
//   };

//   const [file, setFile] = useState();
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState("");

//   const onFileSelect = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const onUpload = async () => {
//     setLoading(true);

//     try {
//       if (!file) {
//         alert("Please select a file to upload.");
//         setLoading(false);
//         return;
//       }

//       const postUrl = await generateUploadUrl();

//       const result = await fetch(postUrl, {
//         method: "POST",
//         headers: { "Content-Type": file.type },
//         body: file,
//       });

//       const { storageId } = await result.json();

//       const fileId = uuid4();
//       const fileUrl = await getFileUrl({ storageId });
//       const fileNameToSave = fileName || file.name || "Untitled File";

//       const resp = await addFileEntry({
//         fileId,
//         storageId,
//         fileName: fileNameToSave,
//         fileUrl,
//         createdBy: user.primaryEmailAddress.emailAddress,
//       });

//       console.log("File successfully uploaded:", resp);

//       const ApiResp = await axios.get("/api/pdf-loader");
//       if (ApiResp?.data?.Result) {
//         console.log("Processed PDF content:", ApiResp.data.Result);
//         const embeddDocument= embeddDocument({
//           splitText: ApiResp.data.Result,
//           fileId:'123'
//         })
//       } else {
//         console.error("Unexpected API response:", 'ApiResp.data', embeddDocument);
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Upload PDF File</DialogTitle>
//           <DialogDescription asChild>
//             <div>
//               <h2 className="mt-5">Select a file to upload</h2>
//               <div className="gap-2 p-3 rounded-md border">
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   onChange={onFileSelect}
//                 />
//               </div>
//               <div className="mt-3">
//                 <label>File Name *</label>
//                 <Input
//                   className="mt-2"
//                   placeholder="File Name"
//                   onChange={(e) => setFileName(e.target.value)}
//                 />
//               </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter className="sm:justify-end">
//           <DialogClose asChild>
//             <Button type="button" variant="secondary">
//               Close
//             </Button>
//           </DialogClose>
//           <Button onClick={onUpload} disabled={loading}>
//             {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default UploadPdfDialog;