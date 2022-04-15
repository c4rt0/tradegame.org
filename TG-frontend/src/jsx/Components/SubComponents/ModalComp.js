import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
const ModalComp = (props) => {

  return (
    <Rodal customStyles={{borderRadius : "20px", overflow: "auto"}} visible={props.open} onClose={props.close} animation={"slideDown"} width={props.width} height={props.height}>
      {props.children}
    </Rodal>
  )
}

export default ModalComp