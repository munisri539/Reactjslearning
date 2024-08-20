import React from 'react'

 function FParent() {
  return (
    <div>
      <FChild passdata={"This is a parent data of functional component"}></FChild>
    </div>
  )
}

function FChild(props){
    return(
        <div>
            <h1>{props.passdata}</h1>
        </div>
    )
}
export default FParent;