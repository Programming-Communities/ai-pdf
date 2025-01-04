import React from 'react'
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
  
function UploadPdfDialog({children}) {
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
                
                <input type="file" accept='application/pdf' />
            </div>
            <div className='mt-3'>
                <label >File Name *</label>
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
          <Button>Upload</Button>
        </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default UploadPdfDialog

  
