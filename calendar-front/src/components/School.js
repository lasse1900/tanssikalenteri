import React from 'react'
import { connect } from 'react-redux'
import Comments from './CommentSchool'
import { removeSchool } from '../reducers/schoolReducer'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const School = ({ school, notify, removeSchool }) => {
  const history = useHistory()

  if (school === undefined) return null

  const remove = async () => {
    if (window.confirm(`remove school ${school.title}? by ${school.author}`)) {
      await removeSchool(school)
      notify(`school '${school.title}' removed succesfully`, false)
      history.push('/schools')
    }
  }

  return (
    <div>
      <div className='toggle' >
        {school.title}
        <br />
        <a href={school.url} target="_blank" rel="noopener noreferrer">{school.url} </a><br></br>
        <br /> <Button className="ui basic tiny button" onClick={remove}>remove</Button>
      </div>
      <Comments school={school} />
    </div>
  )
}

School.propTypes = {
  notify: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    schools: state.schools,
    users: state.users
  }
}

const mapDispatchToProps = {
  removeSchool: removeSchool
}

const ConnectedSchool = connect(mapStateToProps, mapDispatchToProps)(School)

export default ConnectedSchool