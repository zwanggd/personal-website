function viewReport(reportPath) {
    // Create a new window or iframe to display the PDF
    const viewer = window.open(reportPath, '_blank');
    
    // If popup is blocked, provide a fallback
    if (viewer === null) {
        alert('Please allow popups to view the report');
    }
}

function viewGoogleDoc(fileId) {
    // Show loading animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);

    // Create the Google Drive viewer URL
    const viewerUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    
    // Open in a new tab
    const viewer = window.open(viewerUrl, '_blank');
    
    // Remove loading animation after a short delay
    setTimeout(() => {
        loading.remove();
    }, 1000);
}

// Add this at the end of the file
document.getElementById('searchReports')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const reports = document.querySelectorAll('.report-card');
    
    reports.forEach(report => {
        const title = report.querySelector('h3').textContent.toLowerCase();
        const description = report.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            report.style.display = 'flex';
        } else {
            report.style.display = 'none';
        }
    });
});

// Add this at the end of the file
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

document.getElementById('backToTop')?.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create mouse effect elements
    const mouseEffect = document.createElement('div');
    mouseEffect.className = 'mouse-effect';
    document.body.appendChild(mouseEffect);
    
    // Create mouse trails
    const trails = Array.from({ length: 5 }, (_, i) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.opacity = (1 - i * 0.2).toString();
        document.body.appendChild(trail);
        return trail;
    });
    
    let mouseX = 0;
    let mouseY = 0;
    let trailPositions = trails.map(() => ({ x: 0, y: 0 }));
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update main cursor
        mouseEffect.style.left = `${mouseX}px`;
        mouseEffect.style.top = `${mouseY}px`;
        
        // Update trail positions with delay
        updateTrailPositions();
    });
    
    function updateTrailPositions() {
        trails.forEach((trail, index) => {
            setTimeout(() => {
                const prevPosition = index === 0 ? { x: mouseX, y: mouseY } : trailPositions[index - 1];
                trailPositions[index] = {
                    x: prevPosition.x,
                    y: prevPosition.y
                };
                trail.style.left = `${trailPositions[index].x}px`;
                trail.style.top = `${trailPositions[index].y}px`;
            }, index * 50);
        });
    }
    
    // Add hover effect for interactive elements
    document.querySelectorAll('a, button, .report-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            mouseEffect.style.width = '40px';
            mouseEffect.style.height = '40px';
            mouseEffect.style.borderColor = '#0056b3';
        });
        
        element.addEventListener('mouseleave', () => {
            mouseEffect.style.width = '20px';
            mouseEffect.style.height = '20px';
            mouseEffect.style.borderColor = '#007bff';
        });
    });
});

// Add parallax effect for profile picture
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
    document.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = profilePic.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const deltaX = (e.clientX - centerX) / 30;
        const deltaY = (e.clientY - centerY) / 30;
        
        profilePic.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
}

// Animate skill bars on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevels = entry.target.querySelectorAll('.skill-level');
            skillLevels.forEach(level => {
                const width = level.getAttribute('data-width') || level.style.width;
                level.style.setProperty('--skill-percent', width);
                level.classList.add('animate');
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
} 