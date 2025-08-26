let htmlFileCounter = 1; // Keep track of additional HTML files for unique IDs
let cssFileCounter = 1;  // Keep track of additional CSS files
let jsFileCounter = 1;   // Keep track of additional JavaScript files

// Function to add a new HTML file editor section
function addHtmlFile() {
    const additionalHtmlFilesContainer = document.getElementById('additionalHtmlFiles');

    const newHtmlCard = document.createElement('div');
    newHtmlCard.className = 'glass-card overflow-hidden';
    newHtmlCard.setAttribute('data-file-type', 'html'); // Added file type attribute
    newHtmlCard.setAttribute('data-id', `htmlFile${htmlFileCounter}`);

    newHtmlCard.innerHTML = `
        <div class="card-header card-html flex justify-between items-center">
            <span>
                <i class="fab fa-html5 text-2xl mr-2"></i>
                HTML File <span class="file-number">${htmlFileCounter}</span>
            </span>
            <button onclick="removeFile(this)" class="text-white text-lg hover:text-red-300 focus:outline-none">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="p-6">
            <input 
                type="text" 
                class="html-file-name-input" 
                placeholder="e.g., about.html" 
                value="file${htmlFileCounter}.html"
            >
            <textarea 
                class="code-textarea html-editor" 
            ></textarea>
        </div>
    `;
    additionalHtmlFilesContainer.appendChild(newHtmlCard);
    applyInteractiveEffects(newHtmlCard.querySelector('.code-textarea'));
    htmlFileCounter++;
}

// Function to add a new CSS file editor section
function addCssFile() {
    const additionalCssFilesContainer = document.getElementById('additionalCssFiles');

    const newCssCard = document.createElement('div');
    newCssCard.className = 'glass-card overflow-hidden';
    newCssCard.setAttribute('data-file-type', 'css'); // Added file type attribute
    newCssCard.setAttribute('data-id', `cssFile${cssFileCounter}`);

    newCssCard.innerHTML = `
        <div class="card-header card-css flex justify-between items-center">
            <span>
                <i class="fab fa-css3-alt text-2xl mr-2"></i>
                CSS File <span class="file-number">${cssFileCounter}</span>
            </span>
            <button onclick="removeFile(this)" class="text-white text-lg hover:text-red-300 focus:outline-none">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="p-6">
            <input 
                type="text" 
                class="css-file-name-input" 
                placeholder="e.g., component.css" 
                value="style${cssFileCounter}.css"
            >
            <textarea 
                class="code-textarea css-editor" 
            ></textarea>
        </div>
    `;
    additionalCssFilesContainer.appendChild(newCssCard);
    applyInteractiveEffects(newCssCard.querySelector('.code-textarea'));
    cssFileCounter++;
}

// Function to add a new JavaScript file editor section
function addJsFile() {
    const additionalJsFilesContainer = document.getElementById('additionalJsFiles');

    const newJsCard = document.createElement('div');
    newJsCard.className = 'glass-card overflow-hidden';
    newJsCard.setAttribute('data-file-type', 'js'); // Added file type attribute
    newJsCard.setAttribute('data-id', `jsFile${jsFileCounter}`);

    newJsCard.innerHTML = `
        <div class="card-header card-js flex justify-between items-center">
            <span>
                <i class="fab fa-js-square text-2xl mr-2"></i>
                JS File <span class="file-number">${jsFileCounter}</span>
            </span>
            <button onclick="removeFile(this)" class="text-white text-lg hover:text-red-300 focus:outline-none">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="p-6">
            <input 
                type="text" 
                class="js-file-name-input" 
                placeholder="e.g., utils.js" 
                value="script${jsFileCounter}.js"
            >
            <textarea 
                class="code-textarea js-editor" 
            ></textarea>
        </div>
    `;
    additionalJsFilesContainer.appendChild(newJsCard);
    applyInteractiveEffects(newJsCard.querySelector('.code-textarea'));
    jsFileCounter++;
}

// Helper function to apply interactive effects to textareas
function applyInteractiveEffects(textarea) {
    if (textarea) {
        textarea.addEventListener('focus', function() {
            this.closest('.glass-card').style.transform = 'scale(1.02)';
        });
        textarea.addEventListener('blur', function() {
            this.closest('.glass-card').style.transform = 'scale(1)';
        });
    }
}


// Function to remove a file editor section (HTML, CSS, or JS)
function removeFile(button) {
    const cardToRemove = button.closest('.glass-card');
    if (cardToRemove) {
        cardToRemove.remove();
    }
}


// Function to generate and download the project
function generateProject() {
    const mainHtmlCode = document.getElementById('htmlCode').value || '';
    const cssCode = document.getElementById('cssCode').value || '';
    const jsCode = document.getElementById('jsCode').value || '';
    
    let folderName = document.getElementById('folderNameInput').value.trim();

    if (!folderName) {
        folderName = 'web-project';
    }

    document.getElementById('loadingAnimation').style.display = 'block';

    const zip = new JSZip();
    const projectFolder = zip.folder(folderName);

    let htmlFilesWithContent = [];
    let hasCssContent = false;
    let hasJsContent = false;
    
    // Add main HTML file if it has content
    if (mainHtmlCode) {
        projectFolder.file('index.html', mainHtmlCode);
        htmlFilesWithContent.push({ name: 'index.html', content: mainHtmlCode });
    }
    
    // Add main CSS file if it has content
    if (cssCode) {
        projectFolder.file('style.css', cssCode);
        hasCssContent = true;
    }
    
    // Add main JS file if it has content
    if (jsCode) {
        projectFolder.file('script.js', jsCode);
        hasJsContent = true;
    }

    // Process additional HTML files
    document.querySelectorAll('#additionalHtmlFiles .glass-card').forEach(card => {
        const fileNameInput = card.querySelector('.html-file-name-input');
        const contentTextarea = card.querySelector('.code-textarea');
        let fileName = fileNameInput.value.trim();
        const fileContent = contentTextarea.value || '';

        if (fileContent) {
            if (!fileName) {
                fileName = `untitled_html_${Date.now()}.html`;
            }
            if (!fileName.toLowerCase().endsWith('.html')) {
                fileName += '.html';
            }
            projectFolder.file(fileName, fileContent);
            htmlFilesWithContent.push({ name: fileName, content: fileContent });
        }
    });

    // Process additional CSS files
    document.querySelectorAll('#additionalCssFiles .glass-card').forEach(card => {
        const fileNameInput = card.querySelector('.css-file-name-input');
        const contentTextarea = card.querySelector('.code-textarea');
        let fileName = fileNameInput.value.trim();
        const fileContent = contentTextarea.value || '';

        if (fileContent) {
            if (!fileName) {
                fileName = `untitled_css_${Date.now()}.css`;
            }
            if (!fileName.toLowerCase().endsWith('.css')) {
                fileName += '.css';
            }
            projectFolder.file(fileName, fileContent);
            hasCssContent = true;
        }
    });

    // Process additional JavaScript files
    document.querySelectorAll('#additionalJsFiles .glass-card').forEach(card => {
        const fileNameInput = card.querySelector('.js-file-name-input');
        const contentTextarea = card.querySelector('.code-textarea');
        let fileName = fileNameInput.value.trim();
        const fileContent = contentTextarea.value || '';

        if (fileContent) {
            if (!fileName) {
                fileName = `untitled_js_${Date.now()}.js`;
            }
            if (!fileName.toLowerCase().endsWith('.js')) {
                fileName += '.js';
            }
            projectFolder.file(fileName, fileContent);
            hasJsContent = true;
        }
    });


    // Check if any files were added to the project folder
    if (Object.keys(projectFolder.files).length === 0) {
        document.getElementById('loadingAnimation').style.display = 'none';
        alert('कोई फ़ाइल जेनरेट नहीं की गई। कृपया कम से कम एक एडिटर में कोड दर्ज करें।');
        return;
    }

    // New logic: If only one HTML file with content, and no CSS/JS content, download directly
    if (htmlFilesWithContent.length === 1 && !hasCssContent && !hasJsContent) {
        const singleHtmlFile = htmlFilesWithContent[0];
        const blob = new Blob([singleHtmlFile.content], { type: 'text/html' });
        document.getElementById('loadingAnimation').style.display = 'none';
        
        const successMsg = document.getElementById('successMessage');
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);

        saveAs(blob, singleHtmlFile.name);
        return; // Exit function after direct download
    }


    // Otherwise, generate and download the ZIP file asynchronously
    zip.generateAsync({type: 'blob'}).then(function(content) {
        document.getElementById('loadingAnimation').style.display = 'none';
        
        const successMsg = document.getElementById('successMessage');
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
        
        saveAs(content, `${folderName}.zip`);
    }).catch(function(error) {
        document.getElementById('loadingAnimation').style.display = 'none';
        console.error('Error generating project:', error);
        alert('Error generating project. Please try again.');
    });
}

// Add interactive effects once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply interactive effects to the initial main textareas
    document.querySelectorAll('.code-textarea').forEach(textarea => {
        applyInteractiveEffects(textarea);
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
