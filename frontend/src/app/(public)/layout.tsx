import React from 'react';

import { TopNav } from '@/components/TopNav';

const Public = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <TopNav authenticated={false} border={false} />
      </header>

      {children}
    </>
  )
}

export default Public;