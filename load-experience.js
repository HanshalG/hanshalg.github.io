document.addEventListener('DOMContentLoaded', async function() {
    let experienceData;
    try {
        const response = await fetch('experience-data.json');
        experienceData = await response.json();
        console.log('Data:', experienceData);
        populateProjects(experienceData.projects);
        populateEducation(experienceData.education);
    } catch (error) {
        console.error('Error loading or populating experience data:', error);
        document.body.innerHTML += `<p>Error loading or populating experience data: ${error.message}</p>`;
    }
});

function populateProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }
    projectsContainer.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const projectHTML = `
            <div class="experience-item">
                <img class="company-icon" src="${project.icon}" alt="${project.name} Icon">
                <div class="experience-details">
                    <h3>${project.name}</h3>
                    <p><em>${project.position}</em> | ${project.date}</p>
                    <p>${project.description}</p>
                </div>
            </div>
        `;
        projectsContainer.insertAdjacentHTML('beforeend', projectHTML);
    });
}

function populateEducation(education) {
    const educationContainer = document.getElementById('education-container');
    if (!educationContainer) {
        console.error('Education container not found');
        return;
    }
    educationContainer.innerHTML = ''; // Clear existing content

    education.forEach(edu => {
        const educationHTML = `
            <div class="experience-item">
                <img class="education-icon" src="${edu.icon}" alt="${edu.name} Icon">
                <div class="experience-details">
                    <h3>${edu.name}</h3>
                    <p><em>${edu.degree}</em> | ${edu.date}</p>
                    <p>${edu.description}</p>
                </div>
            </div>
        `;
        educationContainer.insertAdjacentHTML('beforeend', educationHTML);
    });
}