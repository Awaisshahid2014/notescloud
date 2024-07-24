import React from 'react'

const Popup = ({
  modalRef,
  modalCloseRef,
  hanldeClickAction,
  onChange,
  note,
}) => {
  return (
    <>
      <button
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        ref={modalRef}
      >
        Launch demo modal
      </button>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Modal title
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {/* <form onSubmit={() => hanldeClickAction(e, id)}> */}
              <div className='mb-3'>
                <label htmlFor='etitle' className='form-label'>
                  Title
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='etitle'
                  name='etitle'
                  aria-describedby='titleHelp'
                  onChange={onChange}
                  value={note.etitle}
                  required
                />
                <div id='titleHelp' className='form-text'>
                  We'll never share your title with anyone else.
                </div>
              </div>
              <div className='mb-3'>
                <label htmlFor='edescription' className='form-label'>
                  Description
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='edescription'
                  name='edescription'
                  onChange={onChange}
                  value={note.edescription}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='etag' className='form-label'>
                  Tag
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='etag'
                  name='etag'
                  onChange={onChange}
                  value={note.etag}
                  required
                />
              </div>
              {/* </form> */}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                ref={modalCloseRef}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={e => hanldeClickAction(e, note)}
              >
                Update Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
