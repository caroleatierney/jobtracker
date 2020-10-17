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
    changeUpdateJobContact = (event) => {
      this.setState({
        updateJobContact:event.target.value
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
        contact:this.state.updateJobContact,
        notes:this.state.updateJobNotes,
        interest_level:this.state.updateJobInterest_level,
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
  changeNewJobContact = (event) => {
    this.setState({
      newJobContact:event.target.value
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
          contact:this.state.newJobContact,
          notes:this.state.newJobNotes,
          interest_level:this.state.newJobInterest_level,
          interviews:this.state.newJobInterviews
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
    return <div>
      <h2>Create Job</h2>
      <form onSubmit={this.createJob}>
        <input onKeyUp={this.changeNewJobCompany} type="text" placeholder="company" /><br/>
        <input onKeyUp={this.changeNewJobPosition} type="text" placeholder="position" /><br/>
        <input onKeyUp={this.changeNewJobApplication_link} type="text" placeholder="application link" /><br/>
        <input onKeyUp={this.changeNewJobResources_link} type="text" placeholder="resources link" /><br/>
        <input onKeyUp={this.changeNewJobContact} type="text" placeholder="contact" /><br/>
        <input onKeyUp={this.changeNewJobNotes} type="text" placeholder="notes" /><br/>
        <input onKeyUp={this.changeNewJobInterest_level} type="number" placeholder="interest level" /><br/>
        <input onKeyUp={this.changeNewJobInterviews} type="text" placeholder="interviews" /><br/>
        <input type="submit" value="Create Job"/>
      </form>

      <h2>List of Jobs</h2>
      <ul>
      {
        this.state.jobs.map(
          (job) => {
            return <li>
              {job.company}: {job.position}: {job.application_link}: {job.resources_link}: {job.contact}: {job.notes}: {job.interest_level}: {job.interviews}
              <button value={job.id} onClick={this.deleteJob}>
                  Delete
              </button>
              <form id={job.id} onSubmit={this.updateJob}>
                <input onKeyUp={this.changeUpdateJobCompany} type="text" placeholder="company" /><br/>
                <input onKeyUp={this.changeUpdateJobPosition} type="text" placeholder="position" /><br/>
                <input onKeyUp={this.changeUpdateJobApplication_link} type="text" placeholder="application link" /><br/>
                <input onKeyUp={this.changeUpdateJobResources_link} type="text" placeholder="sources link" /><br/>
                <input onKeyUp={this.changeUpdateJobContact} type="text" placeholder="contact" /><br/>
                <input onKeyUp={this.changeUpdateJobNotes} type="text" placeholder="notes" /><br/>
                <input onKeyUp={this.changeUpdateJobInterest_level} type="number" placeholder="interest level" /><br/>
                <input onKeyUp={this.changeUpdateJobInterviews} type="text" placeholder="interviews" /><br/>

                <input type="submit" value="Update Job" />
              </form>
            </li>
          }
        )
      }
      </ul>
    </div>
  }
}

// ======= render to DOM Main ============

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
);
