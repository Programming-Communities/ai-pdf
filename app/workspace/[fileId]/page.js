'use client';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditior from '../_components/TextEditior';

function Workspace() {
  const { fileId } = useParams();

  if (!fileId) {
    return <div>Loading...</div>;
  }

  // Fetch file information using Convex query
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId,
  });

  useEffect(() => {
    if (fileInfo && fileInfo.length > 0) {
      console.log(fileInfo);
    } else {
      console.log('File info is not available yet.');
    }
  }, [fileInfo]);

  return (
    <div>
      <WorkspaceHeader />
      <div className='grid grid-cols-2 gap-5'>
        <div>
          {/* Text Editor */}
          <TextEditior />
        </div>
        <div>
          {/* PDF Viewer */}
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;



// 'use client'
// import { useParams } from 'next/navigation';
// import React, { useEffect } from 'react'
// import WorkspaceHeader from '../_components/WorkspaceHeader';
// import PdfViewer from '../_components/PdfViewer';
// import { useQueries, useQuery } from 'convex/react';
// import { api } from '@/convex/_generated/api';

// function Workspace() {
//     const {fileId} = useParams();
//     const fileInfo=useQuery(api.fileStorage.GetFileRecord,{
//         fileId:fileId
//     })
    
//     useEffect(() => {
//         console.log(fileInfo[0]);
//     },[fileInfo]);

//   return (
//     <div>
//       <WorkspaceHeader />
//       <div>
//         <div>
//             {/* Text Editor*/}
//         </div>
//         <div>
//                 {/*pdf viewer*/}
//                 <PdfViewer  />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Workspace

