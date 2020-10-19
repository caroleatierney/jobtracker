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
        updateJobCompany:event.target.placeholder
      })
    }
    changeUpdateJobPosition = (event) => {
      this.setState({
        updateJobPosition:event.target.placeholder
      })
    }
    changeUpdateJobApplication_link = (event) => {
      this.setState({
        updateJobApplication_link:event.target.placeholder
      })
    }
    changeUpdateJobResources_link = (event) => {
      this.setState({
        updateJobResources_link:event.target.placeholder
      })
    }
    changeUpdateJobNotes = (event) => {
      this.setState({
        updateJobNotes:event.target.placeholder
      })
    }
    changeUpdateJobInterest_level = (event) => {
      this.setState({
        updateJobInterest_level:event.target.placeholder
      })
    }
    changeUpdateJobPhoneScreen = (event) => {
      this.setState({
        updateJobPhoneScreen:event.target.placeholder
      })
    }
    changeUpdateJobInterviews = (event) => {
      this.setState({
        updateJobInterviews:event.target.placeholder
      })
    }
  // ================== delete =================
  deleteJob = (event) => {
    axios.delete('/jobs/' + event.target.placeholder).then(
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
      newJobCompany:event.target.placeholder
    })
  }
  changeNewJobPosition = (event) => {
    this.setState({
      newJobPosition:event.target.placeholder
    })
  }
  changeNewJobApplication_link = (event) => {
    this.setState({
      newJobApplication_link:event.target.placeholder
    })
  }
  changeNewJobResources_link = (event) => {
    this.setState({
      newJobResources_link:event.target.placeholder
    })
  }
  changeNewJobNotes = (event) => {
    this.setState({
      newJobNotes:event.target.placeholder
    })
  }
  changeNewJobInterest_level = (event) => {
    this.setState({
      newJobInterest_level:event.target.placeholder
    })
  }
  changeNewJobPhoneScreen = (event) => {
    this.setState({
      newJobPhoneScreen:event.target.placeholder
    })
  }
  changeNewJobInterviews = (event) => {
    this.setState({
      newJobInterviews:event.target.placeholder
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
    <h2>Your Jobs</h2>
    <ul>
    {this.state.jobs.map(job => {return (
            <li key={job.id} className="joblist">
            <h4 className="position">{job.position} at {job.company}</h4>
            <p className="added">Added: {(new Date(job.add_date)).toDateString()} </p>
              <h6 className="link clearfix"><a href={job.application_link} target="_blank"> Application Link  <i className="fas fa-external-link-alt"></i></a></h6>
              <h6 className="link clearfix"><a href={job.resources_link} target="_blank"> Submitted Docs  <i className="fas fa-external-link-alt"></i></a></h6>
              <p className="field">Notes:</p>
              <p className="notes"> {job.notes}</p>
                <p className="field">Interest Level: {job.interest_level}</p>
             <p className="dates">Phone Sreen: {(new Date(job.phone_screen)).toDateString()}</p>
             <p className="dates">In Person: {(new Date(job.interviews)).toDateString()}</p>
            <details>
            <summary>Update Info</summary>
            <form className="update-form" id={job.id} onSubmit={this.updateJob}>
              <input onKeyUp={this.changeUpdateJobCompany} type="text" placeholder={job.company} /><br/>
              <input onKeyUp={this.changeUpdateJobPosition}  type="text" placeholder={job.position} /><br/>
              <input onKeyUp={this.changeUpdateJobApplication_link} type="text" placeholder={job.application_link} /><br/>
              <input onKeyUp={this.changeUpdateJobResources_link} type="text" placeholder={job.resources_link} /><br/>
              <input onKeyUp={this.changeUpdateJobNotes} type="text" placeholder={job.notes} /><br/>
              <input onKeyUp={this.changeUpdateJobInterest_level} type="number" /><br/>
              <input onKeyUp={this.changeUpdateJobPhoneScreen} type="date" /><br/>
              <input onKeyUp={this.changeUpdateJobInterviews} type="date" /><br/>
              <input className="button do-it" type="submit" placeholder="Update Job" />
              <button className="button delete right" placeholder={job.id} onClick={this.deleteJob}>
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
        <input onKeyUp={this.changeUpdateJobNotes} type="text" placeholder="Add Some Notes" /><br/>
        <input onKeyUp={this.changeNewJobInterest_level} type="number" placeholder="interest level" /><br/>
        <input onKeyUp={this.changeNewJobPhoneScreen} type="date" placeholder="mm/dd/yy" /><br/>
        <input onKeyUp={this.changeNewJobInterviews} type="date" placeholder="mm/dd/yy" /><br/>
        <input type="submit" placeholder="Create Job"/>
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
