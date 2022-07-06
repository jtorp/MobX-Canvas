import React, { useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../model/tools/Brush';
import { useParams } from "react-router-dom"
import { Modal, Button, Form } from "react-bootstrap";

const Canvas = observer(() => {
  const usernameRef = useRef()
  const canvasRef = useRef();
  const params = useParams()
  const [modal, setModal] = useState(true)

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    canvasState.setSessionId(params.id)
    toolState.setTool(new Brush(canvasRef.current, params.id))
  }, [params.id])

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value)
    setModal(false)
  }

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }
  return (
   //TODO add modal before elem
    <React.Fragment>
      <Modal
        className="modal"
        show={modal} onHide={() => { setModal(false) }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><h1> Canvas</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  className='p-2'>
            <Form.Group
             className="mb-5 mt-5" >
              <Form.Control
                ref={usernameRef}
                type="name"
                placeholder="Choose your art name"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="light"
            onClick={() =>
              connectHandler()}
            className="ready-btn">Continue </Button>
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