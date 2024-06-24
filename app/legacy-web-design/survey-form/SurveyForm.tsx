import styled from 'styled-components';

const StyledDiv = styled.div`

  #survey-form {
    height: 100vh;
    font-family: Helvetica;
    background-color: #cdd1d1;
    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  label, input, select, textarea {
    display: block;
    margin-bottom: 5px;
  }

  fieldset {
    width: 100%;
    padding: 10px;
  }

  textarea {
    resize: none;
    padding: 4px;
  }

  input, textarea, select {
    width: 100%
  }

  .radio-input, .checkbox-input {
    width: unset;
    display: unset;
    margin-right: 7px;
  }

  label[className="radio"], label[className="check"] {
    margin: unset;
  }

  input {
    padding: 2px;
  }

  fieldset {
    background-color: white;
  }

  form {
    width: 80%;
    max-width: 600px;
  }

  #title {
    margin: 20px;
  }

  #description {
    margin-bottom: 10px;
  }
  
`;

export default function SurveyForm() {
  return(
    <StyledDiv>
      <UnstyledSurveyForm />
    </StyledDiv>
  );
}

function UnstyledSurveyForm() {
  return (
    <div id="survey-form">
      <h1 id="title">freeCodeCamp Survey Form</h1>
      <p id="description">Thank you for taking the time to help us improve the platform.</p>
      <form id="form">
        <fieldset>
          <label id="name-label" htmlFor="name">
            Name
            <input id="name" className="text-input" type="text" placeholder="Enter your name" required />
          </label>
          <label id="email-label" htmlFor="email">
            Email
            <input id="email" className="email-input" type="email" placeholder="Enter your email" required />
          </label>
          <label id="number-label" htmlFor="number">
            Age (optional)
            <input id="number" className="number-input" type="number" placeholder="Enter your age" min="0" max="120" />
          </label>
          <label htmlFor="dropdown">
            Which option best describes your current role?
            <select id="dropdown" className="dropdown-input">
              <option value="">Select current role</option>
              <option value="1">Student</option>
              <option value="2">Full Time Job</option>
              <option value="3">Full Time Learner</option>
              <option value="4">Prefer not to say</option>
              <option value="5">Other</option>
            </select>
          </label>
          <label>Would you recommend freeCodeCamp to a friend?</label>
          <label className="radio" htmlFor="definitely">
            <input id="definitely" value="definitely" className="radio-input" type="radio" name="recommend" />Definitely
          </label>
          <label className="radio" htmlFor="maybe">
            <input id="maybe" value="maybe" className="radio-input" type="radio" name="recommend" />Maybe
          </label>
          <label className="radio" htmlFor="not-sure">
            <input id="not-sure" value="not-sure" className="radio-input" type="radio" name="recommend" />Not Sure
          </label>
        </fieldset>
        <fieldset>
          <label>
            What is your favorite feature of freeCodeCamp?
            <select id="feature" className="dropdown-input">
              <option value="">Select an option</option>
              <option value="1">Challenges</option>
              <option value="2">Projects</option>
              <option value="3">Community</option>
              <option value="4">Open Source</option>
            </select>
          </label>
          <label>What would you like to see improved? (Check all that apply)</label>
          <label className="check" htmlFor="fep">
            <input id="fep" value="fep" className="checkbox-input" type="checkbox" />Front-end Projects
          </label>
          <label className="check" htmlFor="bep">
            <input id="bep" value="bep" className="checkbox-input" type="checkbox" />Back-end Projects
          </label>
          <label className="check" htmlFor="dv">
            <input id="dv" value="dv" className="checkbox-input" type="checkbox" />Data Visualization
          </label>
          <label className="check" htmlFor="ch">
            <input id="ch" value="ch" className="checkbox-input" type="checkbox" />Challenges
          </label>
          <label className="check" htmlFor="osc">
            <input id="osc" value="osc" className="checkbox-input" type="checkbox" />Open Source Community
          </label>
          <label className="check" htmlFor="ghr">
            <input id="ghr" value="ghr" className="checkbox-input" type="checkbox" />Gitter help rooms
          </label>
          <label className="check" htmlFor="vid">
            <input id="vid" value="vid" className="checkbox-input" type="checkbox" />Videos
          </label>
          <label className="check" htmlFor="cm">
            <input id="cm" value="cm" className="checkbox-input" type="checkbox" />City Meetups
          </label>
          <label className="check" htmlFor="wiki">
            <input id="wiki" value="wiki" className="checkbox-input" type="checkbox" />Wiki
          </label>
          <label className="check" htmlFor="forum">
            <input id="forum" value="forum" className="checkbox-input" type="checkbox" />Forum
          </label>
          <label className="check" htmlFor="ac">
            <input id="ac" value="ac" className="checkbox-input" type="checkbox" />Additional Courses
          </label>
        </fieldset>
        <fieldset>
          <label>Any comments or suggestions?</label>
          <textarea rows={4} placeholder="Enter your comment here..." />
        </fieldset>
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}