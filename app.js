class App extends React.Component {

  state = {
    jobs: []
  }
  componentDidMount = () => {
    this.updateJobs();
  }
  // ============== UPDATE event handlers ===============
    changeUpdateJobCompany = (event) => {
      this.setState({
        updateJobCompany:event.target.value
      })
    }
    changeUpdateJobPosition = (event) => {
      this.setState({
        updateJobPosition:event.target.value
      })
    }
    changeUpdateJobApplication_link = (event) => {
      this.setState({
        updateJobApplication_link:event.target.value
      })
    }
    changeUpdateJobResources_link = (event) => {
      this.setState({
        updateJobResources_link:event.target.value
      })
    }
    changeUpdateJobNotes = (event) => {
      this.setState({
        updateJobNotes:event.target.value
      })
    }
    changeUpdateJobInterest_level = (event) => {
      this.setState({
        updateJobInterest_level:event.target.value
      })
    }
    changeUpdateJobPhoneScreen = (event) => {
      this.setState({
        updateJobPhoneScreen:event.target.value
      })
    }
    changeUpdateJobInterviews = (event) => {
      this.setState({
        updateJobInterviews:event.target.value
      })
    }
  // ================== delete =================
  deleteJob = (event) => {
    axios.delete('/jobs/' + event.target.value).then(
      (response) => {
        this.setState(
          {
            jobs:response.data
          }
        )
      }
    )
  }
  // ================== update =================
  updateJob = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    axios.put(
      '/jobs/'+id,
      {
        company:this.state.updateJobCompany,
        position:this.state.updateJobPosition,
        application_link:this.state.updateJobApplication_link,
        resources_link:this.state.updateJobResources_link,
        notes:this.state.updateJobNotes,
        interest_level:this.state.updateJobInterest_level,
        phone_screen:this.state.updateJobPhoneScreen,
        interviews:this.state.updateJobInterviews
      }
    ).then(
      (response) => {
        this.setState(
        {
          jobs:response.data
        }
      )}
    )
  }
  updateJobs = () => {
    axios.get('/jobs').then(
      (response) => {
        this.setState(
          {
            jobs:response.data
          }
        )
      }
    )
  }
// ================== NEW event handlers =================
  changeNewJobCompany = (event) => {
    this.setState({
      newJobCompany:event.target.value
    })
  }
  changeNewJobPosition = (event) => {
    this.setState({
      newJobPosition:event.target.value
    })
  }
  changeNewJobApplication_link = (event) => {
    this.setState({
      newJobApplication_link:event.target.value
    })
  }
  changeNewJobResources_link = (event) => {
    this.setState({
      newJobResources_link:event.target.value
    })
  }
  changeNewJobNotes = (event) => {
    this.setState({
      newJobNotes:event.target.value
    })
  }
  changeNewJobInterest_level = (event) => {
    this.setState({
      newJobInterest_level:event.target.value
    })
  }
  changeNewJobPhoneScreen = (event) => {
    this.setState({
      newJobPhoneScreen:event.target.value
    })
  }
  changeNewJobInterviews = (event) => {
    this.setState({
      newJobInterviews:event.target.value
    })
  }
// ========= CREATE event handler ==========
  createJob = (event) => {
    event.preventDefault();
    axios.post(
        '/jobs',
        {
          company:this.state.newJobCompany,
          position:this.state.newJobPosition,
          application_link:this.state.newJobApplication_link,
          resources_link:this.state.newJobResources_link,
          notes:this.state.newJobNotes,
          interest_level:this.state.newJobInterest_level,
          phone_screen:this.state.newJobPhoneScreen,
          interviews:this.state.newJobInterviews,
          add_date:this.state.add_date
        }
    ).then(
      // {
      // jobs:response.data
      (response) => {
        this.setState(
          {
            jobs:response.data
          }
        )
      }
    )
  }
  // ================== render =================
  render = () => {
    return ( <div>
    <h2>List of Jobs</h2>
    <ul>
    {this.state.jobs.map(job => {return (
            <li key={job.id} className="joblist">
            <h1 className="position left">{job.position} at {job.company}</h1>
            <p className="right added">Added: {(new Date(job.add_date)).toDateString()} </p>
            <br />
            <br />
              <p><a href={job.application_link} target="_blank" className="link"> Application Link  <i className="fas fa-external-link-alt"></i></a>
              <a href={job.resources_link} target="_blank" className="link"> Submitted Docs  <i className="fas fa-external-link-alt"></i></a></p>
              <br />
              <p className="field">Notes:</p>
              <p className="notes"> {job.notes}</p>
             {job.interest_level}
             <p className="field">Phone Sreen: {(new Date(job.phone_screen)).toDateString()}</p>
             <p className="field">In Person: {(new Date(job.interviews)).toDateString()}</p>
            <details>
            <summary>Edit Post</summary>
            <form className="update-form" id={job.id} onSubmit={this.updateJob}>
              <input onKeyUp={this.changeUpdateJobCompany} type="text" placeholder="company" /><br/>
              <input onKeyUp={this.changeUpdateJobPosition} type="text" placeholder="position" /><br/>
              <input onKeyUp={this.changeUpdateJobApplication_link} type="text" placeholder="application link" /><br/>
              <input onKeyUp={this.changeUpdateJobResources_link} type="text" placeholder="sources link" /><br/>
              <input onKeyUp={this.changeUpdateJobNotes} type="text" placeholder="notes" /><br/>
              <input onKeyUp={this.changeUpdateJobInterest_level} type="number" placeholder="interest level" /><br/>
              <input onKeyUp={this.changeUpdateJobPhoneScreen} type="date" placeholder="mm/dd/yy" /><br/>
              <input onKeyUp={this.changeUpdateJobInterviews} type="date" placeholder="mm/dd/yy" /><br/>
              <input className="button button is-primary is-light left" type="submit" value="Update Job" />
              <button className="button is-danger is-light right" value={job.id} onClick={this.deleteJob}>
                  Delete
              </button>
            </form>
              </details> <br />
          </li>
          )
        }
      )
    }
    </ul>
      <h2>Create Job</h2>
      <form onSubmit={this.createJob}>
        <input onKeyUp={this.changeNewJobCompany} type="text" placeholder="company" /><br/>
        <input onKeyUp={this.changeNewJobPosition} type="text" placeholder="position" /><br/>
        <input onKeyUp={this.changeNewJobApplication_link} type="text" placeholder="application link" /><br/>
        <input onKeyUp={this.changeNewJobResources_link} type="text" placeholder="resources link" /><br/>
        <input onKeyUp={this.changeNewJobNotes} type="text" placeholder="notes" /><br/>
        <input onKeyUp={this.changeNewJobInterest_level} type="number" placeholder="interest level" /><br/>
        <input onKeyUp={this.changeNewJobPhoneScreen} type="date" placeholder="mm/dd/yy" /><br/>
        <input onKeyUp={this.changeNewJobInterviews} type="date" placeholder="mm/dd/yy" /><br/>
        <input type="submit" value="Create Job"/>
      </form>
    </div>
  )
  }
}

// ======= render to DOM Main ============

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
);
