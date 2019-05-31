import React from 'react'
import PropTypes from 'prop-types'

function SearchForm ({ onSubmit, submitting, stop, onStopChange, buttonText }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Conoce cuando llega tu transantiago:</legend>
        <label htmlFor='stop'>{'🚏 Paradero'}</label>
        <input
          id='stop'
          type='text'
          placeholder='Código paradero'
          value={stop}
          onChange={onStopChange}
        />
        <button disabled={submitting} type='submit'>
          {submitting ? 'Buscando...' : buttonText}
        </button>
      </fieldset>
    </form>
  )
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onStopChange: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  stop: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
}

export default SearchForm
