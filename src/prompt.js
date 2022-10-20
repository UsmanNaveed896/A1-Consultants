// import { useState, useEffect } from 'react'
// import Cookie from 'react-cookies'

// const Navigation =(message="Are You Sure You Want To leave") =>{

//     const [isDirty,setIsDirty]=useState(false)
//     useEffect(()=>{
//         window.addEventListener('beforeunload', message ,isDirty )
//         window.addEventListener('unload' , handleEndPage)
//         return ()=>{
//             window.removeEventListener('beforeunload' , message ,isDirty)
//             window.removeEventListener('unload' , handleEndPage)
//         }
//     },[isDirty])

//     const routerPrompt = <Prompt when={isDirty} message={message} />
//     const handleEndPage=()=>{
//         Cookie.remove("token", { maxAge: 15000, path: "/" });
//     }
//     return(
//         [routerPrompt,setIsDirty(true),setIsDirty(false)]
//     )
// }
// export default Navigation
