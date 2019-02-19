import React from 'react'
import PropTypes from 'prop-types'
import { urlForStop } from './utils'

function NotFound ({ stop }) {
  return (
    <p>
      {'😞 No lo encontramos... Puedes intentar'}{' '}
      <a href={urlForStop(stop)}>aquí</a>
    </p>
  )
}

NotFound.propTypes = {
  stop: PropTypes.string.isRequired
}

export default NotFound
