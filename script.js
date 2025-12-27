const portfolioData = {
            skills: {
                programming: ["Java", "Python", "C", "Data Structures", "OOP"],
                tools: ["AWS Cloud", "Linux", "Generative AI", "Flask", "MySQL", "Git"]
            },
            achievements: [
                { title: "SPRINTATHON 25", subtitle: "24-Hour Intern Winner", org: "iQmath", icon: "🏆" },
                { title: "Eureka 2.0 NEXUS", subtitle: "2nd Place - Pitching Challenge", org: "IIT Bombay E-Cell", icon: "🥈" },
                { title: "Makeathon 1.0", subtitle: "Active Participant", org: "Internal Hackathon", icon: "🚀" }
            ],
            // This array simulates reading the filenames from your /assets/certificates folder
            // To add a new cert, just add the file to your folder and add an entry here.
            certificates: [
                { filename: "certi1.jpg", title: "AWS Cloud Practitioner (Cloud Quest)", issuer: "AWS Educate" },
                { filename: "certi2.jpg", title: "Emerging Talent Community Member", issuer: "AWS Educate" },
                { filename: "certi3.jpg", title: "Generative AI Foundations", issuer: "AWS Academy" },
                { filename: "certi4.jpg", title: "Cloud Foundations", issuer: "AWS Academy" },
                { filename: "certi5.jpg", title: "OOP using Python", issuer: "Penn University" },
                { filename: "certi6.jpg", title: "Data Structures & Algorithms", issuer: "Infosys Springboard" },
                { filename: "certi7.jpg", title: "Python for Data Science", issuer: "NPTEL" },
                { filename: "certi8.jpg", title: "Linux Unhatched", issuer: "Cisco NetAcad" },
                { filename: "certi9.jpg", title: "Machine Learning Foundations", issuer: "AWS Educate" },
                { filename: "certi10.jpg", title: "Getting Started with Security", issuer: "AWS Educate" },
                { filename: "certi11.jpg", title: "Getting Started with Serverless", issuer: "AWS Educate" },
                { filename: "certi12.jpg", title: "Introduction to Generative AI", issuer: "AWS Educate" },
                { filename: "certi13.jpg", title: "Cloud Computing 101", issuer: "AWS Educate" },
                { filename: "certi14.jpg", title: "Getting Started with Networking", issuer: "AWS Educate" },
                { filename: "certi15.jpg", title: "Getting Started with Compute", issuer: "AWS Educate" },
                { filename: "certi16.jpg", title: "Getting Started with Databases", issuer: "AWS Educate" },
                { filename: "certi17.jpg", title: "Getting Started with Storage", issuer: "AWS Educate" },
                { filename: "certi18.jpg", title: "Getting Started with Cloud OPS", issuer: "AWS Educate" },
                { filename: "certi19.jpg", title: "Introduction to Cyber Security", issuer: "INFOSYS" },
                { filename: "certi20.jpg", title: "The Science of Well-Being", issuer: "YALE" }
            ]
        };

        /* * 2. RENDERING FUNCTIONS 
         */
        
        // Render Skills
        const renderSkills = () => {
            const progContainer = document.getElementById('skills-programming');
            const toolContainer = document.getElementById('skills-tools');
            
            portfolioData.skills.programming.forEach(skill => {
                progContainer.innerHTML += `<span class="tag">${skill}</span>`;
            });
            portfolioData.skills.tools.forEach(skill => {
                toolContainer.innerHTML += `<span class="tag" style="border-color: var(--accent-gold); color: var(--accent-gold);">${skill}</span>`;
            });
        };

        // Render Achievements
        const renderAchievements = () => {
            const container = document.getElementById('achievements-grid');
            portfolioData.achievements.forEach(ach => {
                const card = `
                    <div class="card">
                        <div style="display: flex; justify-content: space-between;">
                            <h3 style="font-size: 1rem;">${ach.title}</h3>
                            <span>${ach.icon}</span>
                        </div>
                        <p class="text-teal" style="font-size: 0.85rem;">${ach.org}</p>
                        <p class="text-muted" style="margin-top: 0.5rem; font-size: 0.9rem;">${ach.subtitle}</p>
                    </div>
                `;
                container.innerHTML += card;
            });
        };

        // Render Certificates (File-System Simulation)
        const renderCertificates = () => {
            const container = document.getElementById('cert-grid');
            
            portfolioData.certificates.forEach((cert, index) => {
                // We create a card that references the 'filename'. 
                // In a real scenario, this src would be valid. 
                // Fallback added for demo purposes if files are missing.
                const card = document.createElement('div');
                card.className = 'card';
                card.style.cursor = 'pointer';
                card.innerHTML = `
                    <div style="height: 6px; width: 40px; background: var(--accent-teal); margin-bottom: 1rem; border-radius: 4px;"></div>
                    <h3>${cert.title}</h3>
                    <p class="card-meta">${cert.issuer}</p>
                    <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.8rem; color: var(--text-muted);">ID: CRED-${1000 + index}</span>
                        <span class="text-teal" style="font-size: 0.8rem;">View &rarr;</span>
                    </div>
                `;
                
                // Add click listener for Modal
                card.addEventListener('click', () => openModal(cert));
                container.appendChild(card);
            });
        };

        /* * 3. INTERACTIVITY (Modal & Animations) 
         */
        
        // Modal Logic
        const modal = document.getElementById('certModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalIssuer = document.getElementById('modalIssuer');
        const closeModal = document.querySelector('.close-modal');

        function openModal(certData) {
            // Path construction
            const path = `assets/certificates/${certData.filename}`;
            modalImg.src = path;
            
            // If image fails to load (because files aren't physically there yet), show a placeholder
            modalImg.onerror = function() {
                this.src = 'https://via.placeholder.com/800x600/1E293B/F8FAFC?text=Certificate+File+Not+Found';
            }
            
            modalTitle.textContent = certData.title;
            modalIssuer.textContent = certData.issuer;
            modal.classList.add('active');
        }

        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') modal.classList.remove('active');
        });

        // Intersection Observer for Scroll Animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Theme Toggle
        const themeBtn = document.getElementById('themeToggle');
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });


        /* * 4. INITIALIZATION 
         */
        window.addEventListener('DOMContentLoaded', () => {
            renderSkills();
            renderAchievements();
            renderCertificates();
            
            // Simple typing effect for tagline (Bonus)
            const tagline = document.getElementById('dynamicTagline');
            const text = tagline.textContent;
            tagline.textContent = '';
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    tagline.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30);
                }
            };
            setTimeout(typeWriter, 500);
        });