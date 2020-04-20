import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function LastSearch({ lastUpdated }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [lastUpdated]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <i>
      <small>Resultados obtenidos hace {seconds} segundos</small>
    </i>
  )
}

LastSearch.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date)
}

LastSearch.defaultProps = {
  lastUpdated: null
}

export default LastSearch
