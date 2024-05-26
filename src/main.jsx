import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { useState } from 'react'
import { info } from './data.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Form></Form>
  </React.StrictMode>
)

function Form() {

  return (
    <>
      <div className='form'>
        <h1>Application Form</h1>
        <General></General>
        <Education></Education>
        <Experience></Experience>
      </div>
    </>
  )
}

function InputField({ fieldName, fieldType='text', fieldText, values, setValues, submitted, section, id }) {
  const [value, setValue] = useState('');

  function handleInputChange(e) {
    setValue(e.target.value);

    if (section == 'general') {
      setValues({...values, [fieldName]: e.target.value})
    } else if (section == 'education') {
      setValues(values.map(education => {
        if (education.id == id) {
          return {...education, [fieldName]: e.target.value};
        } else {
          return education;
        }
      }))
    } else if (section == 'experience') {
      setValues(values.map(experience => {
        if (experience.id == id) {
          return {...experience, [fieldName]: e.target.value};
        } else {
          return experience;
        }
      }))
    }
  }

  return (
    <>
      <span>
        <label htmlFor={fieldName}>{fieldText}</label>
        {submitted == true ? <p>{value}</p> : <input onChange={handleInputChange} value={value} type={fieldType} id={fieldName} required/>}
      </span>
    </>
  )
}

function General() {
  const [generalList, setGeneralList] = useState({...info.general});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleEdit(e) {
    e.preventDefault();
    setSubmitted(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>General</legend>

          <InputField fieldName={'firstName'} fieldText={'First name: '} values={generalList} setValues={setGeneralList} section={'general'} submitted={submitted}></InputField>
          <InputField fieldName={'lastName'} fieldText={'Last name: '} values={generalList} setValues={setGeneralList} section={'general'} submitted={submitted}></InputField>
          <InputField fieldName={'phoneNumber'} fieldText={'Phone number: '} values={generalList} setValues={setGeneralList} section={'general'} submitted={submitted}></InputField>
          <InputField fieldName={'email'} fieldText={'Email: '} values={generalList} setValues={setGeneralList} section={'general'} submitted={submitted}></InputField>
        {submitted && <button onClick={handleEdit}>Edit</button>}
        <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  )
}

function Education() {
  const [educationList, setEducationList] = useState(info.education);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleEdit(e) {
    e.preventDefault();
    setSubmitted(false);
  }

  function handleRemove(e) {
    e.preventDefault();
    if (educationList.length > 1) {
      setEducationList(educationList.filter(education => {
        return education.id != parseInt(e.target.id);
      }))
    }
  }

  function handleAddEducation(e) {
    e.preventDefault();
    setEducationList([...educationList, {
      id: educationList.length,
      schoolName: '',
      titleOfStudy: '',
      graduationDate: '',
    }]);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Education</legend>
          {/*
            Refer to the educationList from imported data and render a block of
            inputFields component for each object in educationList list.
          */}
          {educationList.map(education => {
            return (
              <>
                <div className='fields' key={education.id}>
                  <span>
                    School {educationList.indexOf(education) + 1}:
                    {!submitted && <button onClick={handleRemove} id={education.id}>Remove</button>}
                  </span>
                  <InputField fieldName={'schoolName'} fieldText={'School name: '} values={educationList} setValues={setEducationList} submitted={submitted} id={education.id} section={'education'}></InputField>
                  <InputField fieldName={'titleOfStudy'} fieldText={'Title of study: '} values={educationList} setValues={setEducationList} submitted={submitted} id={education.id} section={'education'}></InputField>
                  <InputField fieldName={'graduationDate'} fieldText={'Graduation date: '} fieldType={'date'} values={educationList} setValues={setEducationList} submitted={submitted} id={education.id} section={'education'}></InputField>
                </div>
              </>
            )
          })
          }
          <div className='buttons'>
            {submitted && <button onClick={handleEdit}>Edit</button>}
            {!submitted && <button onClick={handleAddEducation}>Add education</button>}
            {!submitted && <button type='submit'>Submit</button>}
          </div>
        </fieldset>
      </form>
    </>
  )
}

function Experience() {
  const [experienceList, setExperienceList] = useState(info.experience);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleAddExperience(e) {
    e.preventDefault();
    setExperienceList([...experienceList, {
      id: experienceList.length,
      companyName: '',
      positionTitle: '',
      responsibilities: '',
      dateStart: '',
      dateEnd: '',
    }])
  }

  function handleRemove(e) {
    e.preventDefault();
    if (experienceList.length > 1) {
      setExperienceList(experienceList.filter(experience => {
        return experience.id != parseInt(e.target.id);
      }))
    }
  }

  function handleEdit(e) {
    e.preventDefault();
    setSubmitted(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Experience</legend>
          {experienceList.map(experience => {
            return (
              <>
                <div className="fields" key={experience.id}>
                  <span>
                    Experience {experienceList.indexOf(experience) + 1}:
                    {!submitted && <button onClick={handleRemove} id={experience.id}>Remove</button>}
                  </span>
                  <InputField fieldName={'companyName'} fieldText={'Company name: '} values={experienceList} setValues={setExperienceList} submitted={submitted} section={'experience'} id={experience.id}></InputField>
                  <InputField fieldName={'positionTitle'} fieldText={'Position title: '} values={experienceList} setValues={setExperienceList} submitted={submitted} section={'experience'} id={experience.id}></InputField>
                </div>
              </>
            )
          })
          }
          <div className='buttons'>
            {submitted && <button onClick={handleEdit}>Edit</button>}
            {!submitted && <button onClick={handleAddExperience}>Add experience</button>}
            {!submitted && <button type='submit'>Submit</button>}
          </div>
        </fieldset>
      </form>
    </>
  )
}