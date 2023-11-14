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

    // Clear all input values for education
    setAddTextEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });

    // Clear all input values for experiences
    setAddTextExperiences({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });

    // Close all sections
    setPersonalDetailOpen(false);
    setEducationOpen(false);
    setExperienceOpen(false);
  };

  const handleSaveEducation = () => {
    // Create a new education entry
    const newEducationEntry = {
      school: addTextEducation.school,
      degree: addTextEducation.degree,
      startDate: addTextEducation.startDate,
      endDate: addTextEducation.endDate,
      location: addTextEducation.location,
    };

    // Update the state or save the entry to an array
    // For example, you can use the useState hook to store an array of education entries
    // Update the state with the new entry
    // setEducationEntries([...educationEntries, newEducationEntry]);

    setAddTextEducation([...addTextEducation, newEducationEntry]);

    // After saving, reset the form inputs
    setAddTextEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });

    // Close the education input form
    toggleAddingEducation();
    ToggleShowEducationHeader();
  };

  const handleEditEducation = (educationEntry) => {
    // Set the state with the values of the selected education entry
    setAddTextEducation({
      school: educationEntry.school,
      degree: educationEntry.degree,
      startDate: educationEntry.startDate,
      endDate: educationEntry.endDate,
      location: educationEntry.location,
    });

    // Open the education input form for editing
    toggleAddingEducation();
    ToggleShowEducationHeader();
  };

  return (
    <div className="container">
      <div className="formfill">
        <div className="clear">
          <button
            onClick={() => {
              handleClearClick();
              showExperiencesHeader ? ToggleShowEducationHeader() : "";
              showEducationHeader ? ToggleShowExperiencesHeader() : "";
              addingEducation ? toggleAddingEducation() : "";
              addingExperience ? toggleAddingExperience() : "";
            }}
          >
            Clear Resume
          </button>
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
              type="text"
              value={addText.fullname}
              placeholder="Enter full name"
              onChange={(event) =>
                setAddText({ ...addText, fullname: event.target.value })
              }
            />
            <label>Email</label>
            <input
              type="text"
              value={addText.email}
              placeholder="Enter email"
              onChange={(event) =>
                setAddText({ ...addText, email: event.target.value })
              }
            />
            <label>Phone number</label>
            <input
              type="text"
              value={addText.phoneNumber}
              placeholder="Enter phone number"
              onChange={(event) =>
                setAddText({ ...addText, phoneNumber: event.target.value })
              }
            />
            <label>Address</label>
            <input
              type="text"
              value={addText.address}
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
                    type="text"
                    value={addTextEducation.school}
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
                    type="text"
                    value={addTextEducation.degree}
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
                    type="text"
                    value={addTextEducation.startDate}
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
                    type="text"
                    value={addTextEducation.endDate}
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
                    type="text"
                    value={addTextEducation.location}
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
                    <button
                      className="save"
                      onClick={
                        addingEducation
                          ? handleSaveEducation
                          : handleEditEducation
                      }
                    >
                      {addingEducation ? "Save" : "Edit"}
                    </button>
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
                !educationOpen ? toggleEducation() : "";
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
                    type="text"
                    value={addTextExperiences.company}
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
                    type="text"
                    value={addTextExperiences.position}
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
                    type="text"
                    value={addTextExperiences.startDate}
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
                    type="text"
                    value={addTextExperiences.endDate}
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
                    type="text"
                    value={addTextExperiences.location}
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
                    type="text"
                    value={addTextExperiences.description}
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
                        ToggleShowExperiencesHeader();
                        toggleExperience();
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
                !experienceOpen ? toggleExperience() : "";
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
