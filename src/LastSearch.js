import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LastSearch extends Component {
  static getDerivedStateFromProps (props, state) {
    if (
      props.lastUpdated &&
      props.lastUpdated.getTime() !== state.lastUpdated.getTime()
    ) {
      return {
        lastUpdated: props.lastUpdated,
        seconds: 0
      }
    }
    return null
  }

  constructor (props) {
    super(props)
    this.state = {
      seconds: 0,
      lastUpdated: props.lastUpdated || new Date()
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    this.intervalHandle = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalHandle)
  }

  tick () {
    this.setState(state => ({ seconds: state.seconds + 1 }))
  }

  render () {
    return (
      <i>
        <small>Resultados obtenidos hace {this.state.seconds} segundos</small>
      </i>
    )
  }
}

LastSearch.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date)
}

LastSearch.defaultProps = {
  lastUpdated: null
}

export default LastSearch
