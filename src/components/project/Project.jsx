import React, { useState } from 'react';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import './Project.css';

const Project = () => {
  // Mock Data
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', manager: 'David Chen', startDate: '2023-10-01', endDate: '2023-12-15', status: 'In Progress', progress: 65 },
    { id: 2, name: 'Mobile App Development', manager: 'Sarah Jenkins', startDate: '2023-11-01', endDate: '2024-02-28', status: 'Not Started', progress: 0 },
    { id: 3, name: 'Q4 Marketing Campaign', manager: 'Michael Ross', startDate: '2023-09-15', endDate: '2023-11-30', status: 'Completed', progress: 100 },
    { id: 4, name: 'Internal HR Portal', manager: 'Emily White', startDate: '2023-10-20', endDate: '2024-01-10', status: 'In Progress', progress: 30 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleAddNew = () => {
    setCurrentProject(null);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const handleSave = (projectData) => {
    if (currentProject) {
      setProjects(projects.map(proj => 
        proj.id === currentProject.id ? { ...projectData, id: currentProject.id } : proj
      ));
    } else {
      const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      setProjects([...projects, { ...projectData, id: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(proj => proj.id !== id));
    }
  };

  return (
    <div className="project-container">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Project Management</h2>
          <p className="text-muted mb-0">Track and manage all ongoing and upcoming projects.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4" onClick={handleAddNew}>
          <i className="bi bi-plus-lg me-2"></i> New Project
        </button>
      </div>

      {/* Project List */}
      <ProjectList 
        projects={projects} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Add/Edit Form Modal */}
      <ProjectForm 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        project={currentProject} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Project;