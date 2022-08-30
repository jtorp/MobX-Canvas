import React, { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../model/tools/Brush';
import { useParams } from "react-router-dom"
import { Modal, Button, Form } from "react-bootstrap";
import Lottie from "lottie-react";
import canvasAnimation from "../assets/lotties/mylottie.json"
import { gsap } from "gsap";
const Canvas = observer(() => {
  const usernameRef = useRef()

  const canvasRef = useRef();
  const params = useParams()
  const [modal, setModal] = useState(true)


  //animations
  const title = useRef();
  const readyBtn = useRef();
const m = useRef()

  useEffect(() => {
 
    canvasState.setCanvas(canvasRef.current)
    canvasState.setSessionId(params.id)
    toolState.setTool(new Brush(canvasRef.current, params.id))

  }, [params.id])


useEffect(()=>{
gsap.to([title.current, usernameRef.current, readyBtn.current], { 
  opacity:1,
   scale:1,
   duration:1,
   stagger:.2,
   ease: "back.out" })
         

}, [])

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value)
    setModal(false)
    gsap.to(canvasRef.current,{
      duration:2,
      opacity: 1,
      ease: "slow",
    },"+=1.5")
     }

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }
  return (
  
    <React.Fragment>
      <Modal
      s
      ref={m}
        className="modal"
        show={modal} onHide={() => { setModal(false) }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><h1
           ref={title}> Canvas</h1>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
          <Form  className='p-2'>
            
            <Form.Group
             className="mb-5 mt-5" >
                  

              <Form.Control
                ref={usernameRef}
                type="name"
                placeholder="name"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          
          <Button 
           ref={readyBtn}
          variant="light"
          onClick={() =>
              connectHandler()}
              className="ready-btn">Continue </Button>
                <Lottie 
               
                className="lottie" animationData={canvasAnimation} loop={true} />
        </Modal.Footer>
      </Modal>
      <div className='canvas' >
        <canvas ref={canvasRef}
          width={1280}
          height={720}
          onMouseDown={() => mouseDownHandler()}>
          </canvas>
      </div>
    </React.Fragment>
  )
});

export default Canvas 