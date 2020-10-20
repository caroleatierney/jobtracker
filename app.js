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
      <details className="track">
        <summary className="track">Track a Job</summary>
        <div className="row">
          <form className="col s12 add-job" onSubmit={this.createJob}>
            <div className="row">
              <div className="input-field col s5">
                <input onKeyUp={this.changeNewJobCompany} type="text" /><br />
                <label htmlFor="company">Company Name</label>
              </div>
              <div className="input-field col s5">
                <input onKeyUp={this.changeNewJobPosition} type="text" /><br />
                <label htmlFor="position">Position Title</label>
              </div>
              <div className="input-field col s2">
                <input onKeyUp={this.changeNewJobInterest_level} type="number" min="0" max="10" /><br />
                <label htmlFor="notes">Interest Level 1-10</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onKeyUp={this.changeNewJobApplication_link} type="text" /><br />
                <label htmlFor="application">Link to Application</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onKeyUp={this.changeNewJobResources_link} type="text" /><br />
                <label htmlFor="docs">Link to Submitted Docs</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input onKeyUp={this.changeNewJobNotes} type="text" /><br />
                <label htmlFor="notes">Notes</label>
              </div>
            </div>
            <div className="row">
              <div className=" col s6">
                <label htmlFor="phone">Phone Screen Date</label>
                <input onKeyUp={this.changeNewJobPhoneScreen} type="date" /><br />
              </div>
              <div className=" col s6">
                <label htmlFor="interviews">In person Date</label>
                <input onKeyUp={this.changeNewJobInterviews} type="date" /><br />
              </div>
            </div>
            <input className="post-btn" type="submit" value="Tack Job" />
          </form>
        </div>
      </details>
      <h2 className="your-jobs">Your Jobs</h2>
      <ul>
        {this.state.jobs.map(job => {return (
        <li key={job.id} className="joblist">
          <h4 className="position">{job.position} at {job.company}</h4>
          <p className="added">Added: {(new Date(job.add_date)).toDateString()} </p>
          <br />
          <br />
          <h6 className="link clearfix"><a href={job.application_link} target="_blank" className="link"> Application Link &nbsp;<i className="fas fa-external-link-alt"></i>&nbsp;&nbsp;</a>
            <a href={job.resources_link} target="_blank" className="link"> Submitted Docs&nbsp; <i className="fas fa-external-link-alt"></i></a></h6>
          <br />
          <p className="field">Notes:</p>
          <p className="notes"> {job.notes}</p>
          <p className="field">Interest Level: {job.interest_level}</p>
          <div className="interviews">
          <p className="field left">  <i className="fas fa-phone-square-alt"></i>&nbsp; Phone Sreen: {(new Date(job.phone_screen)).toDateString()}</p>
          <p className="field right"><i className="fas fa-handshake"></i> &nbsp; In Person: {(new Date(job.interviews)).toDateString()}</p><br /> <br />
          </div>
          <details>
            <summary>Edit Post</summary>
            <form className="update-form" id={job.id} onSubmit={this.updateJob}>
              <input onKeyUp={this.changeUpdateJobCompany} type="text" placeholder={job.company} /><br />
              <input onKeyUp={this.changeUpdateJobPosition} type="text" placeholder={job.position} /><br />
              <input onKeyUp={this.changeUpdateJobApplication_link} type="text" placeholder={job.application_link} /><br />
              <input onKeyUp={this.changeUpdateJobResources_link} type="text" placeholder={job.resources_link} /><br />
              <input onKeyUp={this.changeUpdateJobNotes} type="text" placeholder={job.notes} /><br />
              <input onKeyUp={this.changeUpdateJobInterest_level} type="number" placeholder="interest level" /><br />
              <input onKeyUp={this.changeUpdateJobPhoneScreen} type="date" /><br />
              <input onKeyUp={this.changeUpdateJobInterviews} type="date" /><br />
              <input className="button do-it" type="submit" value="Update Job" />
              <button className="button delete right" value={job.id} onClick={this.deleteJob}>
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
      </div>
      )
      }
      }

// ======= render to DOM Main ============

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
);
