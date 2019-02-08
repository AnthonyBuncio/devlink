import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import {createProfile} from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    this.props.createProfile(profileData, this.props.history)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {errors, displaySocialInputs} = this.state;

    let socialInputs;

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
          />
          <InputGroup 
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
          />
          <InputGroup 
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
          />
          <InputGroup 
            placeholder="Youtube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
          />
          <InputGroup 
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
          />
        </div>
      )
    }

    const options = [
      {label: '* Select status', value: 0},
      {label: 'Front End Developer', value: 'Front End Developer'},
      {label: 'Back End Developer', value: 'Back End Developer'},
      {label: 'Full Stack Developer', value: 'Full Stack Developer'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Student', value: 'Student'},
      {label: 'Teacher/Instructor', value: 'Teacher/Instructor'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Other', value: 'Other'}
    ];
    
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create profile</h1>
              <p className="lead text-center">Let's get some information</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="* Username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL"
                />
                <SelectListGroup 
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of your professional status"
                />
                <TextFieldGroup 
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Can be your own company or one you work for"
                />
                <TextFieldGroup 
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Show off your personal site"
                />
                <TextFieldGroup 
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City & state suggested (eg. Houston, TX)"
                />
                <TextFieldGroup 
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML, CSS, Javascript, Python)"
                />
                <TextFieldGroup 
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want to display your latest repos"
                />
                <TextAreaFieldGroup 
                  placeholder="Short bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button 
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    type="button"
                    className="btn btn-light">
                    Add Social Network Links
                  </button>
                  <span className="text-muted ml-2">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter (CreateProfile));
