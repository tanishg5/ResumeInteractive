import React, { useState } from "react";
import { resumeData } from "./ResumeC";
import "../../ResumeStyle.css";
import { useNavigate } from "react-router-dom";
function Resume() {
  const [expanded, setExpanded] = useState({
    1: false,
    2: false,
    3: false,
  });

  const [search, setSearch] = useState('');
   
  const filterexp = resumeData.experiences.filter(exp => {
    if (!search.trim()) return true;
    
    const searchLower = search.toLowerCase();
    const searchText = (
      exp.role +
      exp.company +
      exp.tech
    ).toLowerCase();
    
    return searchText.includes(searchLower);
  });
    
  const toggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDownload = () => {
    window.print();
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="resume">
      <div className="resume-header-section">
        <div>
          <h1>{resumeData.name}</h1>
          <p className="title">{resumeData.title}</p>
          <p className="location">{resumeData.location}</p>
        </div>
        <button className="download-btn" onClick={handleDownload}>
          Download Resume
        </button>
        <button className="download-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Summary</h2>
      <p>{resumeData.summary}</p>
      
      <div className="search-container">
        <input 
          className="search-input"
          onChange={(e) => setSearch(e.target.value)} 
          type="text" 
          placeholder="Search roles, companies, or skills..." 
          value={search}
        />
        {search && (
          <button className="clear-search" onClick={() => setSearch('')}>
            Clear
          </button>
        )}
      </div>

      <h2>Experience</h2>
      {filterexp.length > 0 ? (
        <div className="timeline">
          {filterexp.map((exp, index) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-header" onClick={() => toggle(exp.id)}>
                <div>
                  <h3>{exp.role} - {exp.company}</h3>
                  <p className="date">{exp.start} - {exp.end} | {exp.location}</p>
                </div>
                <p><strong>Technologies:</strong> {exp.tech.join(", ")}</p>
                <span className="expand-icon">{expanded[exp.id] ? '-' : '+'}</span>
              </div>
              {expanded[exp.id] && (
                <div className="timeline-details">
                  <ul>
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No experiences found matching "{search}"</p>
      )}

      <h2>Education</h2>
      {resumeData.education.map((edu, index) => (
        <div key={index} className="education">
          <h3>{edu.degree}</h3>
          <p>
            {edu.school} | {edu.period}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Resume;
