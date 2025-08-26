    // Function to generate and download the project
    function generateProject() {
        // Get HTML, CSS, and JavaScript code from textareas
        // If a textarea is empty, use its placeholder text
        const htmlCode = document.getElementById('htmlCode').value || document.getElementById('htmlCode').placeholder;
        const cssCode = document.getElementById('cssCode').value || document.getElementById('cssCode').placeholder;
        const jsCode = document.getElementById('jsCode').value || document.getElementById('jsCode').placeholder;
        
        // Get the folder name from the input field and trim any extra spaces
        let folderName = document.getElementById('folderNameInput').value.trim();

        // If the folder name is empty, use 'web-project' as the default name
        if (!folderName) {
            folderName = 'web-project';
        }

        // Show the loading animation
        document.getElementById('loadingAnimation').style.display = 'block';

        // Create a new JSZip object
        const zip = new JSZip();
        
        // Create a project folder with the name provided by the user
        const projectFolder = zip.folder(folderName);
        
        // Add the files to the project folder
        projectFolder.file('index.html', htmlCode);
        projectFolder.file('style.css', cssCode);
        projectFolder.file('script.js', jsCode);

        // Generate and download the ZIP file asynchronously
        zip.generateAsync({type: 'blob'}).then(function(content) {
            // Hide the loading animation
            document.getElementById('loadingAnimation').style.display = 'none';
            
            // Show the success message
            const successMsg = document.getElementById('successMessage');
            successMsg.style.display = 'block';
            // Hide the success message after 3 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
            
            // Download the ZIP file with the user-provided folder name
            saveAs(content, `${folderName}.zip`);
        }).catch(function(error) {
            // Hide the loading animation if an error occurs
            document.getElementById('loadingAnimation').style.display = 'none';
            console.error('Error generating project:', error);
            alert('Error generating project. Please try again.');
        });
    }

    // Add interactive effects once the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Add a glow effect to textareas on focus
        const textareas = document.querySelectorAll('.code-textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('focus', function() {
                this.parentElement.parentElement.style.transform = 'scale(1.02)';
            });
            
            textarea.addEventListener('blur', function() {
                this.parentElement.parentElement.style.transform = 'scale(1)';
            });
        });

        // Add a press effect to the generate button
        const btn = document.querySelector('.generate-btn');
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });

    // Keyboard shortcut for generating the project (Ctrl+Enter)
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            generateProject();
        }
    });
