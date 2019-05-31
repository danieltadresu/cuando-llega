import React, { Component } from 'react'
import { fetchNextArrivals } from './utils'
import LastSearch from './LastSearch'
import ArrivalsResult from './ArrivalsResult'
import NotFound from './NotFound'
import SearchForm from './SearchForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stop: '',
      arrivals: [],
      submitting: false,
      submittedOnce: false,
      error: false,
      lastUpdated: null
    }
    this.handleStopChange = this.handleStopChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleStopChange (event) {
    this.setState({ stop: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ submitting: true }, () => {
      fetchNextArrivals(this.state.stop)
        .then(arrivals =>
          this.setState({
            arrivals,
            submitting: false,
            submittedOnce: true,
            error: false,
            lastUpdated: new Date()
          })
        )
        .catch(() =>
          this.setState({ submitting: false, submittedOnce: true, error: true })
        )
    })
  }

  render () {
    const {
      submitting,
      submittedOnce,
      error,
      lastUpdated,
      arrivals,
      stop
    } = this.state
    return (
      <section>
        <article>
          <h1 style={{ marginTop: '18px' }}>{'🚌 Cuándo llega'}</h1>
          <SearchForm
            stop={stop}
            submitting={submitting}
            onSubmit={this.handleSubmit}
            onStopChange={this.handleStopChange}
            buttonText={submittedOnce ? 'Actualizar' : '🔎 buscar'}
          />
          {error && <NotFound stop={stop} />}
          <section id='results'>
            {arrivals.length > 0 && <ArrivalsResult arrivals={arrivals} />}
          </section>
          {submittedOnce && <LastSearch lastUpdated={lastUpdated} />}
        </article>
      </section>
    )
  }
}

export default App
