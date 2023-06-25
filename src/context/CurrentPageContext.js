 // Create a context
 import React, { createContext, useState } from 'react';

 export const CurrentPageContext = createContext();

 // Create a provider to manage the state
 export const CurrentPageProvider = ({ children }) => {
   const [currentPage, setCurrentPage] = useState(1);

   return (
     <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
       {children}
     </CurrentPageContext.Provider>
   );
 };