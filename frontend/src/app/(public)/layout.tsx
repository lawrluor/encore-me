import React from 'react';

import { TopNav } from '@/components/TopNav';

const Public = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <header>
        <TopNav authenticated={false} border={false} />
      </header>

      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

export default Public;