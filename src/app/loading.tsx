import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <Loader className="animate-spin rounded-full h-16 w-16 " />
    </div>


  )
}
