import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicMap = (props) => {

  const Map = dynamic(
      ()=> import('@/components/map'), {ssr:false}
  )

  return (
    <Map data={props.data}/>
  )
}

export default DynamicMap