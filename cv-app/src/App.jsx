import { useState } from "react";
import "./App.scss";
import buttonImageDown from "./assets/chevron-down.svg";
import buttonImageUp from "./assets/chevron-up.svg";
import email from "./assets/email.svg";
import phone from "./assets/phone.svg";
import address from "./assets/map-marker.svg";

function App() {
  const [personalDetailsOpen, setPersonalDetailOpen] = useState(true);
  const [educationOpen, setEducationOpen] = useState(true);
  const [experienceOpen, setExperienceOpen] = useState(true);
  const [addingExperience, setAddingExperience] = useState(false);
  const [addingEducation, setAddingEducation] = useState(false);
  const [showEducationHeader, setShowEducationHeader] = useState(false);
  const [showExperiencesHeader, setShowExperiencesHeader] = useState(false);

  const [addText, setAddText] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [addTextEducation, setAddTextEducation] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const [addTextExperiences, setAddTextExperiences] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const togglePersonalDetail = () => {
    setPersonalDetailOpen(!personalDetailsOpen);
  };

  const toggleEducation = () => {
    setEducationOpen(!educationOpen);
  };

  const toggleExperience = () => {
    setExperienceOpen(!experienceOpen);
  };

  const toggleAddingExperience = () => {
    setAddingExperience(!addingExperience);
  };

  const toggleAddingEducation = () => {
    setAddingEducation(!addingEducation);
  };

  const ToggleShowEducationHeader = () => {
    setShowEducationHeader(!showEducationHeader);
  };

  const ToggleShowExperiencesHeader = () => {
    setShowExperiencesHeader(!showExperiencesHeader);
  };

  const handleClearClick = () => {
    // Clear all input values
    setAddText({
      fullname: "",
      email: "",
      phoneNumber: "",
      address: "",
    });

    setAddTextEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });

    setAddTextExperiences({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
  };

  return (
    <div className="container">
      <div className="formfill">
        <div className="clear">
          <button onClick={handleClearClick}>Clear Resume</button>
        </div>
        {/* Personal details tab */}
        <div className="personalDetails">
          <div className="titleContainer">
            <h1 className="title">Personal Details</h1>
            <button className="close">
              <img
                src={personalDetailsOpen ? buttonImageDown : buttonImageUp}
                alt=""
                className={`img-btn ${personalDetailsOpen ? "open" : "closed"}`}
                onClick={togglePersonalDetail}
              />
            </button>
          </div>
          <div className={`inputs ${personalDetailsOpen ? "open" : "closed"}`}>
            <label>Full name</label>
            <input
              placeholder="Enter full name"
              onChange={(event) =>
                setAddText({ ...addText, fullname: event.target.value })
              }
            />
            <label>Email</label>
            <input
              placeholder="Enter email"
              onChange={(event) =>
                setAddText({ ...addText, email: event.target.value })
              }
            />
            <label>Phone number</label>
            <input
              placeholder="Enter phone number"
              onChange={(event) =>
                setAddText({ ...addText, phoneNumber: event.target.value })
              }
            />
            <label>Address</label>
            <input
              placeholder="Enter address"
              className="last"
              onChange={(event) =>
                setAddText({ ...addText, address: event.target.value })
              }
            />
          </div>
        </div>

        {/* Education tab */}
        <div className="education">
          <div className="titleContainer">
            <h1 className="title">Education</h1>
            <button className="close">
              <img
                src={educationOpen ? buttonImageDown : buttonImageUp}
                alt=""
                className={`img-btn ${educationOpen ? "open" : "closed"}`}
                onClick={toggleEducation}
              />
            </button>
          </div>
          {addingEducation ? (
            <div className={`inputs ${educationOpen ? "open" : "closed"}`}>
              {
                <>
                  <label>School</label>
                  <input
                    placeholder="Enter school / university"
                    onChange={(event) =>
                      setAddTextEducation({
                        ...addTextEducation,
                        school: event.target.value,
                      })
                    }
                  />
                  <label>Degree</label>
                  <input
                    placeholder="Enter degree / field of study"
                    onChange={(event) =>
                      setAddTextEducation({
                        ...addTextEducation,
                        degree: event.target.value,
                      })
                    }
                  />
                  <label>Start Date</label>
                  <input
                    placeholder="Enter start date"
                    onChange={(event) =>
                      setAddTextEducation({
                        ...addTextEducation,
                        startDate: event.target.value,
                      })
                    }
                  />
                  <label>End Date</label>
                  <input
                    placeholder="Enter end date"
                    onChange={(event) =>
                      setAddTextEducation({
                        ...addTextEducation,
                        endDate: event.target.value,
                      })
                    }
                  />
                  <label>Location</label>
                  <input
                    placeholder="Enter location"
                    className="last"
                    onChange={(event) =>
                      setAddTextEducation({
                        ...addTextEducation,
                        location: event.target.value,
                      })
                    }
                  />
                  <div className="buttons">
                    <button
                      className="closeAdd"
                      onClick={() => {
                        toggleAddingEducation();
                        ToggleShowEducationHeader();
                      }}
                    >
                      Close
                    </button>
                    <button className="save">Save</button>
                    <button className="delete" onClick={toggleAddingEducation}>
                      Delete
                    </button>
                  </div>
                </>
              }
            </div>
          ) : (
            <button
              className="addExperience"
              onClick={() => {
                toggleAddingEducation();
                ToggleShowEducationHeader();
              }}
            >
              + Education
            </button>
          )}
        </div>

        {/* Experience tab */}
        <div className="experience">
          <div className="titleContainer">
            <h1 className="title">Experience</h1>
            <button className="close">
              <img
                src={experienceOpen ? buttonImageDown : buttonImageUp}
                alt=""
                className={`img-btn ${experienceOpen ? "open" : "closed"}`}
                onClick={toggleExperience}
              />
            </button>
          </div>
          {addingExperience ? (
            <div className={`inputs ${experienceOpen ? "open" : "closed"}`}>
              {
                <>
                  <label>Company name</label>
                  <input
                    placeholder="Enter company name"
                    onChange={(event) =>
                      setAddTextExperiences({
                        ...addTextExperiences,
                        company: event.target.value,
                      })
                    }
                  />
                  <label>Position Title</label>
                  <input
                    placeholder="Enter position title"
                    onChange={(event) =>
                      setAddTextExperiences({
                        ...addTextExperiences,
                        position: event.target.value,
                      })
                    }
                  />
                  <label>Start Date</label>
                  <input
                    placeholder="Enter start date"
                    onChange={(event) =>
                      setAddTextExperiences({
                        ...addTextExperiences,
                        startDate: event.target.value,
                      })
                    }
                  />
                  <label>End Date</label>
                  <input
                    placeholder="Enter end date"
                    onChange={(event) =>
                      setAddTextExperiences({
                        ...addTextExperiences,
                        endDate: event.target.value,
                      })
                    }
                  />
                  <label>Location</label>
                  <input
                    placeholder="Enter location"
                    onChange={(event) =>
                      setAddTextExperiences({
                        ...addTextExperiences,
                        location: event.target.value,
                      })
                    }
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Enter description..."
                    className="last"
                    onChange={(event) =>
                      setAddTextExperiences({
                        ...addTextExperiences,
                        description: event.target.value,
                      })
                    }
                  />
                  <div className="buttons">
                    <button
                      className="closeAdd"
                      onClick={() => {
                        toggleAddingExperience();
                        ToggleShowExperiencesHeader();
                      }}
                    >
                      Close
                    </button>
                    <button className="save">Save</button>
                    <button
                      className="delete"
                      onClick={() => {
                        toggleAddingExperience();
                        ToggleShowExperiencesHeader();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              }
            </div>
          ) : (
            <button
              className="addExperience"
              onClick={() => {
                toggleAddingExperience();
                ToggleShowExperiencesHeader();
              }}
            >
              + Experience
            </button>
          )}
        </div>
      </div>

      {/* Main form */}
      <main className="main">
        <header className="header">
          <h1>{addText.fullname}</h1>
          <div className="others">
            <div className="email">
              {addText.email && <img src={email} alt="" className="emailImg" />}
              <p>{addText.email}</p>
            </div>
            <div className="phoneNumber">
              {addText.phoneNumber && (
                <img src={phone} alt="" className="phoneImg" />
              )}
              <p>{addText.phoneNumber}</p>
            </div>
            <div className="address">
              {addText.address && (
                <img src={address} alt="" className="addressImg" />
              )}
              <p>{addText.address}</p>
            </div>
          </div>
        </header>
        <div className="education">
          {showEducationHeader && <header>Education</header>}
          <div className="grid">
            <p>
              <p>
                {addTextEducation.startDate}{" "}
                {addTextEducation.endDate && `- ${addTextEducation.endDate}`}
              </p>
            </p>
            <p className="school">{addTextEducation.school}</p>
            <p>{addTextEducation.location}</p>
            <p>{addTextEducation.degree}</p>
          </div>
        </div>
        <div className="experiences">
          {showExperiencesHeader && <header>Professional Experiences</header>}
          <div className="grid">
            <p>
              <p>
                {addTextExperiences.startDate}{" "}
                {addTextExperiences.endDate &&
                  `- ${addTextExperiences.endDate}`}
              </p>
            </p>
            <p className="school">{addTextExperiences.company}</p>
            <p>{addTextExperiences.location}</p>
            <p>{addTextExperiences.position}</p>
            <p className="description">{addTextExperiences.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
