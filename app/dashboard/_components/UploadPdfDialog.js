"use client";
import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Loader2Icon } from 'lucide-react';

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    setLoading(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div className=''>
              <h2 className='mt-5'>Select a file to Upload </h2>
              <div className=' gap-2 p-3 rounded-md border'>
                <input
                  type="file"
                  accept='application/pdf'
                  onChange={(event) => OnFileSelect(event)}
                />
              </div>
              <div className='mt-3'>
                <label>File Name *</label>
                <Input className='mt-2' placeholder="File Name" />
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
          <Button onClick={OnUpload}>
            {loading ? <Loader2Icon className='animate-spin' /> : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;


// "use client";
// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Button } from '@/components/ui/button'
// import { useMutation } from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { Loader2Icon } from 'lucide-react'
  
// function UploadPdfDialog({children}) 
//     {

//     const generateUploadUrl=useMutation(api.fileStorage.generateUploadUrl);
//     const [file,setFile]=useState();
//     const [loading,setLoading]=useState(true);
//     const OnFileSelect=(event)=>{

//         setFile(event.target.files[0]);
//     }

//     const OnUpload=async()=>{
//         setLoading(true);


//   return (
//     <Dialog>
//   <DialogTrigger asChild>
//     {children}
//   </DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Upload PDF File</DialogTitle>
//       <DialogDescription asChild>
//         <div className=''>
//         <h2 className='mt-5'>Select a file to Upload </h2>
//             <div className=' gap-2 p-3 rounded-md border'>
                
//                 <input type="file" accept='application/pdf'
//                 onChange={(event)=>OnFileSelect(event)} />
//             </div>
//             <div className='mt-3'>
//                 <label >File Name *</label>
//             <Input className='mt-2' placeholder="File Name" />

//             </div>
            
//         </div>
//       </DialogDescription>
//     </DialogHeader>
//     <DialogFooter className="sm:justify-end">
//           <DialogClose asChild>
//             <Button type="button" variant="secondary">
//               Close
//             </Button>
//           </DialogClose>
//           <Button onClick={OnUpload}>
//             {loading?
//              <Loader2Icon className='animate-spin'/>:'Upload'
//              }
//             </Button>
//         </DialogFooter>
//   </DialogContent>
// </Dialog>

//   )
// }

// export default UploadPdfDialog