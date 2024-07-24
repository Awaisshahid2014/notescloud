import React, { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

const NoteItem = props => {
  const { updateNote, note } = props
  const { _id, title, user, description, tag, date } = note
  const contextData = useContext(noteContext)
  const { handleDelete } = contextData

  return (
    <div className='col-md-3'>
      <div
        className='card my-3'
        style={{ height: '100px', overflow: 'hidden' }}
      >
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center w-100 py-2'>
            <div className='text-truncate'>
              <h5 className='card-title'>{title}</h5>
            </div>
            <div className=''>
              <i
                className='fa-solid fa-trash-can mx-2'
                style={{ cursor: 'pointer' }}
                onClick={() => handleDelete(_id)}
              ></i>
              <i
                className='fa-solid fa-pen-to-square mx-2'
                style={{ cursor: 'pointer' }}
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>
          <p className='card-text text-truncate'>{description}</p>
          {/* <button className="btn btn-primary w-100">Go somewhere</button> */}
        </div>
      </div>
    </div>
  )
}

export default NoteItem
