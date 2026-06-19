// UI Runway Core Application Logic

// Global state to store user details and shared data across components
const state = {
    selectedState: "FL", // Default state from designs
    separationDate: "2026-06-15", // Default separation date
    weeklyWage: 1500, // Default weekly wage
    severanceType: "weeks", // 'weeks' or 'lump-sum'
    severanceAmount: 12000,
    severanceWeeks: 8,
    q1Wage: 18500, // Default values from roadmap design
    q2Wage: 18500,
    q3Wage: 19200,
    q4Wage: 19200,
    uploads: [],
    disputes: [
        { id: "Case #492-A", type: "Classification Review", date: "Oct 12, 2023", status: "In Progress", progress: 50, explanation: "Awaiting Employer Response" }
    ],
    quizScore: 0,
    currentDisputeLetter: "",
    vault: [
        {
            id: "vault-1",
            name: "Seattle_Tech_Severance.pdf",
            size: "2.8 MB",
            date: "Jun 10, 2026",
            description: "Severance agreement from Seattle, WA. Contains 12 weeks severance terms and separation date of June 30, 2026.",
            text: "Separation Agreement and Release of Claims. Employee: Jane Doe. Employer: Seattle Tech Systems (Seattle, WA). Separation Date: June 30, 2026. The Company agrees to provide severance pay equal to 12 weeks of employee's base salary."
        },
        {
            id: "vault-2",
            name: "Stitch_Tech_W2_2025.pdf",
            size: "1.4 MB",
            date: "Jan 25, 2026",
            description: "Form W-2 Wage and Tax Statement. Shows annual W-2 wages of $88,000 in Washington state.",
            text: "Form W-2 Wage and Tax Statement 2025. Employer: Stitch Tech Systems. Employee: Jane Doe. Box 1 Wages, tips, other comp: $88000. Box 15 State: WA. Q1 wages: $22000. Q2 wages: $22000. Q3 wages: $22000. Q4 wages: $22000."
        },
        {
            id: "vault-3",
            name: "CA_Severance_JaneDoe.pdf",
            size: "2.1 MB",
            date: "Jun 18, 2026",
            description: "California separation agreement. Includes 6 weeks of continuation pay with separation date of August 1, 2026.",
            text: "Separation Agreement and Release. Employee Jane Doe. Employer: California Tech Solutions. State: CA. Separation Date: August 1, 2026. Severance compensation: 6 weeks of continuation pay."
        },
        {
            id: "vault-4",
            name: "TX_Termination_Continuation.pdf",
            size: "1.9 MB",
            date: "May 14, 2026",
            description: "Texas termination letter. Details 8 weeks severance package and separation date of September 15, 2026.",
            text: "Termination Notice. Employer: Texas Enterprise Corp. Employee: Jane Doe. Separation date: September 15, 2026. You will receive severance payment in the form of salary continuation for 8 weeks. Governing law: State of Texas (TX)."
        },
        {
            id: "vault-5",
            name: "1099_NEC_Consulting_Fees.pdf",
            size: "1.2 MB",
            date: "Feb 12, 2026",
            description: "Form 1099-NEC Nonemployee Compensation. Shows $52,000 consulting payments in Florida.",
            text: "Form 1099-NEC Nonemployee Compensation. Payer: Florida Consulting Group. Recipient: Jane Doe. Box 1 Nonemployee compensation: $52000. State: FL."
        }
    ]
};

// Initialize app when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initIntakePortal();
    initRoadmapDashboard();
    initAdvocacyCenter();
    initDisputeLetterEditor();
    initVault();
    
    // Perform initial calculations
    updateCalculations();
});

// 1. Navigation Controller (Tab Switching)
function initNavigation() {
    const navLinks = document.querySelectorAll("nav a, footer nav a");
    const sections = {
        intake: document.getElementById("section-intake"),
        roadmap: document.getElementById("section-roadmap"),
        advocacy: document.getElementById("section-advocacy"),
        editor: document.getElementById("section-editor"),
        settings: document.getElementById("section-settings")
    };

    function showSection(targetId) {
        // Hide all sections
        Object.keys(sections).forEach(key => {
            if (sections[key]) {
                sections[key].classList.add("hidden");
                sections[key].classList.remove("flex", "flex-col");
            }
        });

        // Show target section
        const targetSection = sections[targetId];
        if (targetSection) {
            targetSection.classList.remove("hidden");
            if (targetId === "editor") {
                targetSection.classList.add("flex", "flex-col");
            }
        }

        // Update nav links styling for desktop and mobile
        document.querySelectorAll("nav a, footer nav a").forEach(link => {
            const labelText = link.textContent.trim().toLowerCase();
            const isTarget = labelText.includes(targetId) || 
                             (targetId === "editor" && labelText.includes("advocacy"));
            
            if (isTarget) {
                // Active styles
                link.classList.add("bg-secondary-container", "text-on-secondary-container", "font-bold");
                link.classList.remove("text-on-surface-variant", "hover:bg-surface-variant", "hover:bg-surface-container-high");
            } else {
                // Inactive styles
                link.classList.remove("bg-secondary-container", "text-on-secondary-container", "font-bold");
                link.classList.add("text-on-surface-variant", "hover:bg-surface-variant", "hover:bg-surface-container-high");
            }
        });

        // Trigger updates depending on section
        if (targetId === "roadmap") {
            updateCalculations();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const text = link.textContent.trim().toLowerCase();
            if (text.includes("intake")) showSection("intake");
            else if (text.includes("roadmap")) showSection("roadmap");
            else if (text.includes("advocacy")) showSection("advocacy");
            else if (text.includes("settings")) showSection("settings");
        });
    });

    // Save showSection globally so we can navigate programmatically
    window.navigateToSection = showSection;
}

// 2. Intake Portal Controller
function initIntakePortal() {
    const fileInput = document.getElementById("file-input");
    const dropzone = document.getElementById("dropzone");
    const selectFilesBtn = document.getElementById("select-files-btn");
    const uploadsList = document.getElementById("uploads-list");

    if (selectFilesBtn && fileInput) {
        selectFilesBtn.addEventListener("click", () => fileInput.click());
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            handleUploadedFiles(e.target.files);
        });
    }

    // Drag and Drop
    if (dropzone) {
        ["dragenter", "dragover"].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.add("border-secondary", "bg-surface-container-high");
            }, false);
        });

        ["dragleave", "drop"].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.remove("border-secondary", "bg-surface-container-high");
            }, false);
        });

        dropzone.addEventListener("drop", (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleUploadedFiles(files);
        });
    }

    function handleUploadedFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileId = Date.now() + i;
            
            // Add pending upload item to local state
            const newUpload = {
                id: fileId,
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
                date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "Analyzing",
                type: file.name.split(".").pop().toLowerCase()
            };
            
            state.uploads.unshift(newUpload);
            renderUploads();

            // Check if file is PDF, use PDF.js extraction
            if (newUpload.type === "pdf") {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const arrayBuffer = e.target.result;
                        const text = await extractTextFromPdfBuffer(arrayBuffer);
                        newUpload.text = text;
                        simulateParsing(newUpload);
                    } catch (err) {
                        console.error("PDF.js parsing failed, falling back to name-only", err);
                        newUpload.text = "";
                        simulateParsing(newUpload);
                    }
                };
                reader.readAsArrayBuffer(file);
            } else if (file.type === "text/plain" || newUpload.type === "txt") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newUpload.text = e.target.result;
                    simulateParsing(newUpload);
                };
                reader.readAsText(file);
            } else {
                // Images or other types: Mock OCR after 2 seconds
                setTimeout(() => {
                    newUpload.text = mockOcrTextForFilename(newUpload.name);
                    simulateParsing(newUpload);
                }, 2000);
            }
        }
    }

    window.deleteUpload = function(id) {
        state.uploads = state.uploads.filter(item => item.id !== id);
        renderUploads();
        updateCalculations();
    };

    window.loadSampleDocuments = function() {
        state.uploads = [
            { 
                id: 1, 
                name: "Severance_Agreement_Draft.pdf", 
                size: "2.4 MB", 
                date: "Today, 10:42 AM", 
                status: "Verified", 
                type: "pdf", 
                text: "Separation Agreement and Release. Employee Jane Doe is separating from Stitch Tech Systems in Florida. Separation date is June 15, 2026. The company will pay employee severance of 8 weeks." 
            },
            { 
                id: 2, 
                name: "W2_2023_Final.pdf", 
                size: "1.1 MB", 
                date: "Yesterday", 
                status: "Verified", 
                type: "pdf", 
                text: "W-2 Tax Form. Employer: Stitch Tech Systems. Claimant: Jane Doe. Q1 Wages: $18,500. Q2 Wages: $18,500. Q3 Wages: $19,200. Q4 Wages: $19,200. State: FL." 
            }
        ];
        renderUploads();
        simulateParsing(state.uploads[0]);
        simulateParsing(state.uploads[1]);
        alert("Sample documents loaded! Review calculations in the Financial Roadmap tab.");
    };
}

// PDF Text extraction utility using Mozilla PDF.js
async function extractTextFromPdfBuffer(arrayBuffer) {
    if (typeof pdfjsLib === "undefined") {
        throw new Error("pdfjsLib is not loaded on page");
    }
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    let extractedText = "";
    
    // Parse first 3 pages
    const pagesToParse = Math.min(pdf.numPages, 3);
    for (let pageNum = 1; pageNum <= pagesToParse; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        extractedText += pageText + "\n";
    }
    return extractedText;
}

// Mock OCR helper for images
function mockOcrTextForFilename(filename) {
    const fn = filename.toLowerCase();
    let mockText = "";
    if (fn.includes("severance") || fn.includes("agreement") || fn.includes("termination") || fn.includes("letter")) {
        mockText += "Separation Agreement and General Release. ";
        const weeksMatch = fn.match(/(\d+)\s*wk|(\d+)\s*week/);
        if (weeksMatch) {
            mockText += `Company shall pay Employee severance pay of ${weeksMatch[1] || weeksMatch[2]} weeks. `;
        } else {
            mockText += "Company shall pay Employee severance pay of 8 weeks. ";
        }
        
        // Find state in name
        let foundState = "FL";
        for (const [code, rule] of Object.entries(stateRules)) {
            if (fn.includes(rule.name.toLowerCase()) || fn.includes(code.toLowerCase())) {
                foundState = code;
                break;
            }
        }
        mockText += `This agreement is governed by the laws of the State of ${stateRules[foundState].name}. `;
        
        // Separation date
        mockText += "Employee agrees their Separation Date will be June 15, 2026. ";
    } else if (fn.includes("w2") || fn.includes("tax") || fn.includes("1099")) {
        mockText += "Wage and Tax Statement W-2. Employer Stitch Tech. Employee Jane Doe. Box 1 Wages: $78,000. Box 15 State: FL Florida. ";
    }
    return mockText;
}

// Flexible Date Parser
function parseFlexibleDate(text) {
    // 1. YYYY-MM-DD
    const ymd = text.match(/\b(\d{4})[-/\.](\d{1,2})[-/\.](\d{1,2})\b/);
    if (ymd) {
        return `${ymd[1]}-${String(ymd[2]).padStart(2, '0')}-${String(ymd[3]).padStart(2, '0')}`;
    }

    // 2. MM/DD/YYYY
    const mdy = text.match(/\b(\d{1,2})[-/\.](\d{1,2})[-/\.](\d{2,4})\b/);
    if (mdy) {
        let year = mdy[3];
        if (year.length === 2) year = "20" + year;
        return `${year}-${String(mdy[1]).padStart(2, '0')}-${String(mdy[2]).padStart(2, '0')}`;
    }

    // 3. Word Month names
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const monthsAbbr = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    
    const pattern = new RegExp(`\\b(${months.join('|')}|${monthsAbbr.join('|')})\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})\\b`, 'i');
    const mdyWord = text.match(pattern);
    if (mdyWord) {
        const monthName = mdyWord[1].toLowerCase();
        let monthIdx = months.indexOf(monthName);
        if (monthIdx === -1) monthIdx = monthsAbbr.indexOf(monthName);
        if (monthIdx !== -1) {
            return `${mdyWord[3]}-${String(monthIdx + 1).padStart(2, '0')}-${String(mdyWord[2]).padStart(2, '0')}`;
        }
    }
    return null;
}

// Contextual State Extractor
function extractStateFromContext(text) {
    if (typeof stateRules === "undefined") return null;

    // Pattern 1: State followed by zip code: e.g., WA 98101, FL 33139
    const zipPattern = /\b([A-Z]{2})\s+\d{5}(?:-\d{4})?\b/;
    const zipMatch = text.match(zipPattern);
    if (zipMatch && stateRules[zipMatch[1].toUpperCase()]) {
        return zipMatch[1].toUpperCase();
    }

    // Pattern 2: City, State: e.g., Seattle, WA or Miami, FL
    const cityStatePattern = /\b[a-zA-Z\s]{3,20},\s+([A-Z]{2})\b/;
    const cityStateMatch = text.match(cityStatePattern);
    if (cityStateMatch && stateRules[cityStateMatch[1].toUpperCase()]) {
        return cityStateMatch[1].toUpperCase();
    }

    // Pattern 3: State label: e.g., State: WA or State: FL
    const stateLabelPattern = /\b(?:state|st)\s*:\s*\b([A-Z]{2})\b/i;
    const stateLabelMatch = text.match(stateLabelPattern);
    if (stateLabelMatch && stateRules[stateLabelMatch[1].toUpperCase()]) {
        return stateLabelMatch[1].toUpperCase();
    }

    // Pattern 4: Box 15 W-2 State Box: e.g. Box 15 FL
    const box15Pattern = /\bbox\s*15\s+([A-Z]{2})\b/i;
    const box15Match = text.match(box15Pattern);
    if (box15Match && stateRules[box15Match[1].toUpperCase()]) {
        return box15Match[1].toUpperCase();
    }
    
    return null;
}

// Simulates legal document parsing
function simulateParsing(uploadItem) {
    uploadItem.status = "Verified";
    
    // Keep case-preserved text for state code matching, and lowercased text for general keywords
    const originalText = uploadItem.name + " " + (uploadItem.text || "");
    const textToSearch = originalText.toLowerCase();
    
    let stateMatched = null;
    let severanceWeeks = null;
    let severanceAmount = null;
    let severanceType = null;
    let separationDate = null;

    // Check states (dynamically scan all 50 states)
    // Phase 1: Contextual document extraction (highest accuracy)
    stateMatched = extractStateFromContext(originalText);

    // Phase 2: Search for full state names (case-insensitive)
    if (!stateMatched) {
        for (const [code, rule] of Object.entries(stateRules)) {
            const nameLower = rule.name.toLowerCase();
            if (textToSearch.includes(nameLower)) {
                stateMatched = code;
                break;
            }
        }
    }

    // Phase 3: Search for two-letter codes (case-sensitive), excluding common English acronyms like "ID", "IN", "OR", etc.
    if (!stateMatched) {
        const ambiguousCodes = ["ID", "IN", "OR", "CO", "ME", "LA", "OH", "MD", "PA", "UT", "DE"];
        for (const [code, rule] of Object.entries(stateRules)) {
            if (ambiguousCodes.includes(code)) continue; // skip ambiguous words in raw boundaries
            const codeRegex = new RegExp(`\\b${code}\\b`); // case-sensitive
            if (codeRegex.test(originalText)) {
                stateMatched = code;
                break;
            }
        }
    }

    // Check severance weeks (e.g. "8 weeks of severance", "8 weeks pay", "8 weeks continuation")
    const weeksMatch = textToSearch.match(/\b(\d+)\s*(?:weeks?|months?)\s*(?:of)?\s*(?:severance|salary|pay|continuation|compensation)\b/);
    if (weeksMatch) {
        severanceWeeks = parseInt(weeksMatch[1]);
        if (weeksMatch[0].includes("month")) {
            severanceWeeks = Math.round(severanceWeeks * 4.33);
        }
        severanceType = "weeks";
    } else {
        // Look for dollar lump sum: e.g. "severance pay of $12,000"
        const amtMatch = textToSearch.match(/(?:severance|separation|payment|sum)\s*(?:pay|payment|amount)?\s*(?:of|in the amount of)?\s*\$\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/);
        if (amtMatch) {
            severanceAmount = parseInt(amtMatch[1].replace(/,/g, ''));
            severanceType = "lump-sum";
        }
    }

    // Check separation date (flexible parsing of text or standard dates)
    const dateMatch = textToSearch.match(/(?:separation|termination|effective|end|last)\s*(?:date|day)?\s*(?:is|of|set for|on)?\s*:?\s*([a-zA-Z0-9\/\-\.,\s]+)/);
    if (dateMatch) {
        // Try parsing the captured date substring
        const parsedDate = parseFlexibleDate(dateMatch[1]);
        if (parsedDate) {
            separationDate = parsedDate;
        }
    }

    // Fallback: If no date matched from phrase context, scan the whole document for any valid date
    if (!separationDate) {
        separationDate = parseFlexibleDate(textToSearch);
    }

    // Apply parsed values if found
    let parsedInfoText = "Document verified successfully. No overriding financial variables detected.";
    let detailsList = [];

    if (stateMatched) {
        state.selectedState = stateMatched;
        detailsList.push(`State: ${stateRules[stateMatched].name}`);
        const stateSelect = document.getElementById("roadmap-state");
        if (stateSelect) stateSelect.value = stateMatched;
    }
    if (severanceType === "weeks" && severanceWeeks) {
        state.severanceType = "weeks";
        state.severanceWeeks = severanceWeeks;
        state.severanceAmount = severanceWeeks * state.weeklyWage;
        detailsList.push(`Severance: ${severanceWeeks} weeks ($${state.severanceAmount.toLocaleString()})`);
        
        const sevTypeSelect = document.getElementById("roadmap-sev-type");
        const sevWeeksInput = document.getElementById("roadmap-sev-weeks");
        const sevAmtInput = document.getElementById("roadmap-sev-amount");
        if (sevTypeSelect) sevTypeSelect.value = "weeks";
        if (sevWeeksInput) {
            sevWeeksInput.value = severanceWeeks;
            sevWeeksInput.classList.remove("hidden");
        }
        if (sevAmtInput) {
            sevAmtInput.value = state.severanceAmount;
            const weeksContainer = document.getElementById("sev-weeks-container");
            if (weeksContainer) weeksContainer.classList.remove("hidden");
        }
    } else if (severanceType === "lump-sum" && severanceAmount) {
        state.severanceType = "lump-sum";
        state.severanceAmount = severanceAmount;
        state.severanceWeeks = Math.ceil(severanceAmount / state.weeklyWage);
        detailsList.push(`Severance: Lump Sum $${severanceAmount.toLocaleString()} (~${state.severanceWeeks} weeks)`);
        
        const sevTypeSelect = document.getElementById("roadmap-sev-type");
        const sevWeeksInput = document.getElementById("roadmap-sev-weeks");
        const sevAmtInput = document.getElementById("roadmap-sev-amount");
        if (sevTypeSelect) sevTypeSelect.value = "lump-sum";
        if (sevAmtInput) {
            sevAmtInput.value = severanceAmount;
            sevAmtInput.classList.remove("hidden");
        }
        if (sevWeeksInput) {
            sevWeeksInput.value = state.severanceWeeks;
            const weeksContainer = document.getElementById("sev-weeks-container");
            if (weeksContainer) weeksContainer.classList.add("hidden"); // hide weeks input for lump sum
        }
    }
    if (separationDate) {
        state.separationDate = separationDate;
        detailsList.push(`Separation Date: ${separationDate}`);
        const sepDateInput = document.getElementById("roadmap-sep-date");
        if (sepDateInput) sepDateInput.value = separationDate;
    }

    // Check W-2 / 1099 annual wages to estimate quarterly earnings
    let w2Wage = null;
    let is1099 = false;

    if (textToSearch.includes("w-2") || textToSearch.includes("w2") || textToSearch.includes("wage and tax") || textToSearch.includes("tax statement")) {
        const wageMatch = textToSearch.match(/(?:box\s*1|wages\s*,?\s*tips|wages\s*:\s*)\s*(?:wages)?\s*:?\s*\$\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/i) ||
                          textToSearch.match(/(?:box\s*1)\s*:\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/i) ||
                          textToSearch.match(/wages\s*:\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/i);
        if (wageMatch) {
            w2Wage = parseInt(wageMatch[1].replace(/,/g, ''));
        }
    } else if (textToSearch.includes("1099") || textToSearch.includes("nonemployee compensation") || textToSearch.includes("1099-nec")) {
        is1099 = true;
        const wageMatch = textToSearch.match(/(?:nonemployee\s*compensation|box\s*1|compensation\s*:\s*)\s*:?\s*\$\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/i) ||
                          textToSearch.match(/(?:box\s*1)\s*:\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/i);
        if (wageMatch) {
            w2Wage = parseInt(wageMatch[1].replace(/,/g, ''));
        }
    }

    if (w2Wage) {
        const quarterly = Math.round(w2Wage / 4);
        state.q1Wage = quarterly;
        state.q2Wage = quarterly;
        state.q3Wage = quarterly;
        state.q4Wage = quarterly;
        
        detailsList.push(`${is1099 ? '1099' : 'W-2'} Annual Wages: $${w2Wage.toLocaleString()} (~$${quarterly.toLocaleString()}/qtr)`);
        
        // Pre-fill inputs in UI
        const q1Input = document.getElementById("roadmap-q1");
        const q2Input = document.getElementById("roadmap-q2");
        const q3Input = document.getElementById("roadmap-q3");
        const q4Input = document.getElementById("roadmap-q4");
        
        if (q1Input) q1Input.value = quarterly;
        if (q2Input) q2Input.value = quarterly;
        if (q3Input) q3Input.value = quarterly;
        if (q4Input) q4Input.value = quarterly;
    }

    if (detailsList.length > 0) {
        parsedInfoText = `Identified from document: ${detailsList.join(", ")}. Calculations updated automatically.`;
    }

    renderUploads();
    updateCalculations();

    // Show Translation Preview in Sidebar
    const translationTitle = document.getElementById("translation-title");
    const translationLegalese = document.getElementById("translation-legalese");
    const translationPlainEnglish = document.getElementById("translation-plain-english");

    if (translationTitle && translationLegalese && translationPlainEnglish) {
        translationTitle.innerText = uploadItem.name;
        
        if (uploadItem.name.includes("Severance") || textToSearch.includes("severance")) {
            translationLegalese.innerText = '"...Employee agrees to waive, release, and forever discharge the Company from any and all claims, demands, or causes of action arising out of their employment..."';
            translationPlainEnglish.innerHTML = `
                <strong class="text-primary block mb-1">Severance & Claims Waiver:</strong>
                By signing this, you agree not to sue your employer. However, in <strong>${stateRules[state.selectedState].name}</strong>, this release 
                ${stateRules[state.selectedState].severanceRule.type === 'none' ? 'does NOT affect your right to collect unemployment benefits.' : 'will delay your unemployment benefits by the duration of the severance period.'}
            `;
        } else if (uploadItem.name.includes("W2") || textToSearch.includes("w2") || textToSearch.includes("tax")) {
            translationLegalese.innerText = '"...Box 1: Wages, tips, other compensation. Box 2: Federal income tax withheld. Box 15: State, Employer\'s state ID no..."';
            translationPlainEnglish.innerHTML = `
                <strong class="text-primary block mb-1">Base Period Wage Records:</strong>
                Your W-2 validates that you paid into the state UI trust fund as a W-2 employee. Your earnings are sufficient to pass the base period validation test for <strong>${stateRules[state.selectedState].name}</strong>.
            `;
        } else {
            translationLegalese.innerText = '"...Nature of Separation: The employer and employee have agreed to sever employment relations..."';
            translationPlainEnglish.innerHTML = `
                <strong class="text-primary block mb-1">Layoff Verification:</strong>
                The separation reason appears to be a standard reduction in force. You qualify for benefits as the termination is due to no fault of your own.
            `;
        }
    }
}

function renderUploads() {
    const list = document.getElementById("uploads-list");
    if (!list) return;
    
    list.innerHTML = "";
    state.uploads.forEach(item => {
        const isAnalyzing = item.status === "Analyzing";
        const statusBadge = isAnalyzing
            ? `<span class="bg-[#eff4ff] text-[#091426] px-2 py-1 rounded font-label-sm flex items-center gap-1 border border-[#cbdbf5] animate-pulse">
                <span class="material-symbols-outlined text-[14px] animate-spin">sync</span> Analyzing
               </span>`
            : `<span class="bg-[#dce9ff] text-[#006a61] px-2 py-1 rounded font-label-sm flex items-center gap-1 border border-[#86f2e4]">
                <span class="material-symbols-outlined text-[14px]">check_circle</span> Verified
               </span>`;
               
        const icon = item.type === "pdf" ? "picture_as_pdf" : "description";

        list.innerHTML += `
            <li class="p-4 px-6 flex items-center justify-between hover:bg-surface-variant transition-colors ${!isAnalyzing ? 'bg-[#f8f9ff]' : ''}">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-[#eff4ff] text-primary flex items-center justify-center rounded-lg border border-[#dce9ff]">
                        <span class="material-symbols-outlined">${icon}</span>
                    </div>
                    <div>
                        <p class="font-label-md text-on-surface font-semibold">${item.name}</p>
                        <p class="font-label-sm text-outline text-xs">${item.date} • ${item.size}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    ${statusBadge}
                    <button onclick="deleteUpload(${item.id})" class="text-on-surface-variant hover:text-error p-2">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            </li>
        `;
    });

    // Update Filing Readiness checklist statuses based on uploads
    const checklistAgreement = document.getElementById("chk-severance-agreement");
    const checklistW2 = document.getElementById("chk-w2");

    const hasSeverance = state.uploads.some(u => u.name.toLowerCase().includes("severance") || u.name.toLowerCase().includes("agreement"));
    const hasW2 = state.uploads.some(u => {
        const name = u.name.toLowerCase();
        const text = (u.text || "").toLowerCase();
        return name.includes("w-2") || name.includes("w2") || name.includes("tax") || name.includes("1099") ||
               text.includes("w-2") || text.includes("w2") || text.includes("wage and tax") || text.includes("1099");
    });

    if (checklistAgreement) {
        if (hasSeverance) {
            checklistAgreement.className = "flex items-center justify-between p-3 bg-white border border-outline-variant/50 rounded-lg";
            checklistAgreement.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-[#006a61]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span class="font-body-md text-primary font-medium">Severance Agreement</span>
                </div>
                <span class="font-label-sm text-xs px-2 py-1 bg-[#dce9ff] text-[#006a61] rounded font-semibold">Uploaded</span>
            `;
        } else {
            checklistAgreement.className = "flex items-center justify-between p-3 bg-[#fff8f6] border-[#CBD5E1] border-l-4 border-l-[#ba1a1a] rounded-lg";
            checklistAgreement.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-outline">circle</span>
                    <span class="font-body-md text-primary">Severance Agreement</span>
                </div>
                <button onclick="window.navigateToSection('intake')" class="font-label-sm text-xs px-3 py-1 bg-transparent border border-outline text-primary rounded hover:bg-surface-variant transition-colors font-semibold">Upload</button>
            `;
        }
    }

    if (checklistW2) {
        if (hasW2) {
            checklistW2.className = "flex items-center justify-between p-3 bg-white border border-outline-variant/50 rounded-lg";
            checklistW2.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-[#006a61]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span class="font-body-md text-primary font-medium">W-2 Form (Last Year)</span>
                </div>
                <span class="font-label-sm text-xs px-2 py-1 bg-[#dce9ff] text-[#006a61] rounded font-semibold">Uploaded</span>
            `;
        } else {
            checklistW2.className = "flex items-center justify-between p-3 bg-[#fff8f6] border-[#CBD5E1] border-l-4 border-l-[#ba1a1a] rounded-lg";
            checklistW2.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-[#ba1a1a]">error</span>
                    <span class="font-body-md text-primary font-medium">W-2 Form (Last Year)</span>
                </div>
                <button onclick="window.navigateToSection('intake')" class="font-label-sm text-xs px-3 py-1 bg-transparent border border-outline text-primary rounded hover:bg-surface-variant transition-colors font-semibold">Upload</button>
            `;
        }
    }
}

// 3. Roadmap & Calculations Controller
function initRoadmapDashboard() {
    const stateSelect = document.getElementById("roadmap-state");
    const sepDateInput = document.getElementById("roadmap-sep-date");
    const weeklyWageInput = document.getElementById("roadmap-weekly-wage");
    const sevTypeSelect = document.getElementById("roadmap-sev-type");
    const sevAmountInput = document.getElementById("roadmap-sev-amount");
    const sevWeeksInput = document.getElementById("roadmap-sev-weeks");
    const q1WageInput = document.getElementById("roadmap-q1");
    const q2WageInput = document.getElementById("roadmap-q2");
    const q3WageInput = document.getElementById("roadmap-q3");
    const q4WageInput = document.getElementById("roadmap-q4");

    // Prepopulate fields from initial state
    if (stateSelect) stateSelect.value = state.selectedState;
    if (sepDateInput) sepDateInput.value = state.separationDate;
    if (weeklyWageInput) weeklyWageInput.value = state.weeklyWage;
    if (sevTypeSelect) sevTypeSelect.value = state.severanceType;
    if (sevAmountInput) sevAmountInput.value = state.severanceAmount;
    if (sevWeeksInput) sevWeeksInput.value = state.severanceWeeks;
    if (q1WageInput) q1WageInput.value = state.q1Wage;
    if (q2WageInput) q2WageInput.value = state.q2Wage;
    if (q3WageInput) q3WageInput.value = state.q3Wage;
    if (q4WageInput) q4WageInput.value = state.q4Wage;

    // Set up change listeners
    const inputs = [
        [stateSelect, "selectedState"],
        [sepDateInput, "separationDate"],
        [weeklyWageInput, "weeklyWage", Number],
        [sevTypeSelect, "severanceType"],
        [sevAmountInput, "severanceAmount", Number],
        [sevWeeksInput, "severanceWeeks", Number],
        [q1WageInput, "q1Wage", Number],
        [q2WageInput, "q2Wage", Number],
        [q3WageInput, "q3Wage", Number],
        [q4WageInput, "q4Wage", Number]
    ];

    inputs.forEach(([element, stateKey, parser]) => {
        if (element) {
            element.addEventListener("input", (e) => {
                let val = e.target.value;
                if (parser) val = parser(val);
                state[stateKey] = val;
                
                // If weekly wage changes, update severance amount based on weeks
                if (stateKey === "weeklyWage" && state.severanceType === "weeks") {
                    state.severanceAmount = state.weeklyWage * state.severanceWeeks;
                    if (sevAmountInput) sevAmountInput.value = state.severanceAmount;
                }
                
                // If severance weeks changes, update amount
                if (stateKey === "severanceWeeks" && state.severanceType === "weeks") {
                    state.severanceAmount = state.weeklyWage * state.severanceWeeks;
                    if (sevAmountInput) sevAmountInput.value = state.severanceAmount;
                }

                // Toggle visibility of severance amount/weeks inputs depending on type
                if (stateKey === "severanceType") {
                    const weeksContainer = document.getElementById("sev-weeks-container");
                    if (weeksContainer) {
                        if (val === "weeks") weeksContainer.classList.remove("hidden");
                        else weeksContainer.classList.add("hidden");
                    }
                }

                updateCalculations();
            });
        }
    });

    // Make state indicator badge match selected state
    const indicatorBadge = document.getElementById("state-badge-indicator");
    if (indicatorBadge) {
        indicatorBadge.innerText = stateRules[state.selectedState].name;
    }
}

// Triggers calculations and updates HTML elements
function updateCalculations() {
    const rules = window.rulesEngine;
    if (!rules) return;

    // Update state badge
    const stateBadge = document.getElementById("state-badge-indicator");
    if (stateBadge) stateBadge.innerText = stateRules[state.selectedState].name;

    // 1. Calculate Severance Clock
    const sevClock = rules.calculateSeveranceClock(
        state.selectedState,
        state.separationDate,
        state.severanceAmount,
        state.severanceType,
        state.weeklyWage,
        state.severanceWeeks
    );

    if (sevClock) {
        const clockDate = document.getElementById("clock-date");
        const clockDays = document.getElementById("clock-days");
        const clockWeeks = document.getElementById("clock-weeks");
        const clockStatusText = document.getElementById("clock-status-text");
        const clockStatusCard = document.getElementById("clock-status-card");
        const clockProgress = document.getElementById("clock-progress");
        const clockDateLabels = document.getElementById("clock-date-labels");
        const clockDescription = document.getElementById("clock-description");

        if (clockDate) clockDate.innerText = sevClock.eligibilityDateFormatted;
        if (clockDays) clockDays.innerText = sevClock.delayDays;
        if (clockWeeks) clockWeeks.innerText = sevClock.delayWeeks;
        if (clockDescription) clockDescription.innerText = sevClock.explanation;

        // Visual countdown progress simulation
        const isDelayed = sevClock.delayDays > 0;
        
        if (clockStatusText) {
            clockStatusText.innerText = isDelayed ? "Severance Offset Active" : "Eligible to File";
        }
        if (clockStatusCard) {
            if (isDelayed) {
                clockStatusCard.className = "bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20 text-right w-full md:w-auto";
                clockStatusText.className = "font-headline-sm text-headline-sm text-secondary-fixed flex items-center justify-end gap-2 text-[#86f2e4]";
            } else {
                clockStatusCard.className = "bg-[#86f2e4]/20 rounded-lg p-4 backdrop-blur-sm border border-[#86f2e4]/30 text-right w-full md:w-auto";
                clockStatusText.className = "font-headline-sm text-headline-sm text-white flex items-center justify-end gap-2";
            }
        }

        if (clockProgress) {
            // If delayed, show 30% progress, otherwise 100%
            clockProgress.style.width = isDelayed ? "30%" : "100%";
        }

        if (clockDateLabels) {
            const sepDateObj = new Date(state.separationDate);
            const sepDateFormatted = sepDateObj.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
            clockDateLabels.innerHTML = `
                <span>Separation Date (${sepDateFormatted})</span>
                <span>Filing Eligibility (${sevClock.eligibilityDateFormatted})</span>
            `;
        }
    }

    // 2. Base Period Validator Calculations
    const basePeriod = rules.validateBasePeriod(
        state.selectedState,
        state.q1Wage,
        state.q2Wage,
        state.q3Wage,
        state.q4Wage
    );

    const bpStatusIcon = document.getElementById("bp-status-icon");
    const bpStatusTitle = document.getElementById("bp-status-title");
    const bpStatusDesc = document.getElementById("bp-status-desc");
    const bpStatusBox = document.getElementById("bp-status-box");

    const bpQ1 = document.getElementById("bp-q1");
    const bpQ2 = document.getElementById("bp-q2");
    const bpQ3 = document.getElementById("bp-q3");
    const bpHigh = document.getElementById("bp-high");

    if (bpQ1) bpQ1.innerText = `$${state.q1Wage.toLocaleString()}`;
    if (bpQ2) bpQ2.innerText = `$${state.q2Wage.toLocaleString()}`;
    if (bpQ3) bpQ3.innerText = `$${state.q3Wage.toLocaleString()}`;
    
    const highQuarterVal = Math.max(state.q1Wage, state.q2Wage, state.q3Wage, state.q4Wage);
    if (bpHigh) bpHigh.innerText = `$${highQuarterVal.toLocaleString()}`;

    if (basePeriod) {
        if (bpStatusTitle) bpStatusTitle.innerText = basePeriod.eligible ? "Quarters Qualified" : "Quarters Unqualified";
        if (bpStatusDesc) bpStatusDesc.innerText = basePeriod.reason;
        
        if (bpStatusBox) {
            if (basePeriod.eligible) {
                bpStatusBox.className = "flex items-start gap-4 mb-6 p-4 rounded-lg bg-[#eff4ff] border border-[#cbdbf5]";
                if (bpStatusIcon) {
                    bpStatusIcon.innerText = "check_circle";
                    bpStatusIcon.className = "material-symbols-outlined text-[#006a61] text-3xl mt-1";
                }
            } else {
                bpStatusBox.className = "flex items-start gap-4 mb-6 p-4 rounded-lg bg-error-container/40 border border-error-container";
                if (bpStatusIcon) {
                    bpStatusIcon.innerText = "cancel";
                    bpStatusIcon.className = "material-symbols-outlined text-error text-3xl mt-1";
                }
            }
        }
    }

    // 3. Benefit Estimator Calculations
    const benefitEstimate = rules.calcWba(
        state.selectedState,
        state.q1Wage,
        state.q2Wage,
        state.q3Wage,
        state.q4Wage
    );

    if (benefitEstimate) {
        const estWba = document.getElementById("est-wba");
        const estCalcWba = document.getElementById("est-calc-wba");
        const estBarCalc = document.getElementById("est-bar-calc");
        const estBarEligible = document.getElementById("est-bar-eligible");
        const estActualText = document.getElementById("est-actual-text");
        const estWbaNote = document.getElementById("est-wba-note");
        const capFlag = document.getElementById("cap-flag");

        if (estWba) estWba.innerHTML = `$${benefitEstimate.finalWba}<span class="text-lg text-on-surface-variant font-normal">/wk</span>`;
        if (estCalcWba) estCalcWba.innerText = `$${benefitEstimate.calculated}/wk`;
        if (estActualText) estActualText.innerText = `$${benefitEstimate.finalWba}/wk`;

        // Render progress bars
        // Max range base is calculated benefit.
        const maxRange = Math.max(benefitEstimate.calculated, stateRules[state.selectedState].maxWba, 100);
        const calcPercent = (benefitEstimate.calculated / maxRange) * 100;
        const eligiblePercent = (benefitEstimate.finalWba / maxRange) * 100;

        if (estBarCalc) estBarCalc.style.width = `${calcPercent}%`;
        if (estBarEligible) estBarEligible.style.width = `${eligiblePercent}%`;

        // Cap Warning
        if (capFlag) {
            if (benefitEstimate.isCapped) {
                capFlag.classList.remove("hidden");
                capFlag.innerText = "State Cap";
            } else {
                capFlag.classList.add("hidden");
            }
        }

        if (estWbaNote) {
            if (benefitEstimate.isCapped) {
                estWbaNote.innerHTML = `<span class="material-symbols-outlined text-[#ba1a1a] text-[18px] mt-0.5">warning</span>
                                        <p>Based on your high quarter earnings, you qualify for $${benefitEstimate.calculated}/wk, but ${stateRules[state.selectedState].name} law caps weekly benefits at $${benefitEstimate.finalWba}.</p>`;
                estWbaNote.className = "mt-4 p-3 bg-[#fff8f6] rounded border border-[#ffdad6] font-body-sm text-body-sm text-on-surface-variant flex gap-2 items-start";
            } else {
                estWbaNote.innerHTML = `<span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">info</span>
                                        <p>You qualify for the estimated benefit of $${benefitEstimate.finalWba}/wk for up to ${benefitEstimate.maxWeeks} weeks (total potential payout: $${benefitEstimate.potentialPayout.toLocaleString()}) in ${stateRules[state.selectedState].name}.</p>`;
                estWbaNote.className = "mt-4 p-3 bg-surface-container-low rounded border border-outline-variant/30 font-body-sm text-body-sm text-on-surface-variant flex gap-2 items-start";
            }
        }
    }
}

// 4. Advocacy & Action Center Controller
function initAdvocacyCenter() {
    renderDisputes();

    // 1099 Reality Check Modal Logic
    const realityCheckBtn = document.getElementById("reality-check-btn");
    const quizModal = document.getElementById("quiz-modal");
    const closeQuizBtn = document.getElementById("close-quiz-btn");
    const quizForm = document.getElementById("quiz-form");
    const quizResultCard = document.getElementById("quiz-result-card");
    const quizQuestions = document.getElementById("quiz-questions");
    const quizSubmitBtn = document.getElementById("quiz-submit-btn");

    if (realityCheckBtn && quizModal) {
        realityCheckBtn.addEventListener("click", () => {
            quizModal.classList.remove("hidden");
            quizModal.classList.add("flex");
            // Reset quiz
            if (quizForm) quizForm.reset();
            if (quizQuestions) quizQuestions.classList.remove("hidden");
            if (quizResultCard) quizResultCard.classList.add("hidden");
            if (quizSubmitBtn) quizSubmitBtn.classList.remove("hidden");
        });
    }

    if (closeQuizBtn && quizModal) {
        closeQuizBtn.addEventListener("click", () => {
            quizModal.classList.add("hidden");
            quizModal.classList.remove("flex");
        });
    }

    if (quizForm) {
        quizForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Gather scores (sum checked values)
            const checkboxes = quizForm.querySelectorAll("input[type='checkbox']:checked");
            const score = checkboxes.length;
            state.quizScore = score;

            // Render results
            if (quizQuestions) quizQuestions.classList.add("hidden");
            if (quizSubmitBtn) quizSubmitBtn.classList.add("hidden");
            if (quizResultCard) {
                quizResultCard.classList.remove("hidden");
                
                const scoreIndicator = document.getElementById("quiz-score-indicator");
                const quizDiagnosis = document.getElementById("quiz-diagnosis");
                const quizUnlockBtn = document.getElementById("quiz-unlock-btn");

                if (scoreIndicator) {
                    scoreIndicator.innerText = `${score} / 6 Indicators`;
                }

                if (score >= 3) {
                    quizDiagnosis.innerHTML = `
                        <h4 class="font-headline-sm text-primary mb-2">High Risk of Misclassification</h4>
                        <p class="font-body-sm text-on-surface-variant">
                            Based on your answers, you exhibit ${score} key criteria of W-2 employment (such as company-controlled hours, company-provided equipment, and being integral to core operations). 
                            You have a strong legal argument to dispute a 1099 classification.
                        </p>
                    `;
                    if (quizUnlockBtn) {
                        quizUnlockBtn.classList.remove("hidden");
                        quizUnlockBtn.onclick = () => {
                            quizModal.classList.add("hidden");
                            quizModal.classList.remove("flex");
                            generateDispute("1099");
                        };
                    }
                } else {
                    quizDiagnosis.innerHTML = `
                        <h4 class="font-headline-sm text-primary mb-2">Likely Independent Contractor</h4>
                        <p class="font-body-sm text-on-surface-variant">
                            Your working relationship has few indicators of W-2 control. State laws generally classify this structure as independent work. 
                            However, if you feel you have been misclassified under specific local laws, you can still generate a dispute letter.
                        </p>
                    `;
                    if (quizUnlockBtn) {
                        quizUnlockBtn.classList.remove("hidden");
                        quizUnlockBtn.onclick = () => {
                            quizModal.classList.add("hidden");
                            quizModal.classList.remove("flex");
                            generateDispute("1099");
                        };
                    }
                }
            }
        });
    }

    // Active Dispute buttons
    window.startDisputeRestructuring = () => {
        generateDispute("cause");
    };

    window.startDispute1099 = () => {
        generateDispute("1099");
    };
}

function renderDisputes() {
    const list = document.getElementById("disputes-list");
    if (!list) return;

    list.innerHTML = "";
    state.disputes.forEach(d => {
        list.innerHTML += `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface rounded-lg border border-surface-variant hover:shadow-[0px_4px_12px_rgba(30,41,59,0.05)] transition-shadow">
                <div class="mb-3 sm:mb-0">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="font-label-md text-label-md text-primary font-semibold">${d.id}: ${d.type}</span>
                        <span class="bg-[#dce9ff] text-[#0b1c30] font-label-sm text-label-sm px-2 py-0.5 rounded-full whitespace-nowrap font-medium">${d.status}</span>
                    </div>
                    <p class="font-label-sm text-outline text-xs">Submitted on ${d.date} • ${d.explanation}</p>
                </div>
                <div class="w-full sm:w-1/3 flex items-center gap-3">
                    <div class="flex-1 h-[4px] bg-surface-variant rounded-full overflow-hidden">
                        <div class="h-full bg-secondary" style="width: ${d.progress}%"></div>
                    </div>
                    <button onclick="viewActiveDispute('${d.id}')" class="text-secondary hover:text-primary font-label-md text-label-md font-bold shrink-0">
                        View Letter
                    </button>
                </div>
            </div>
        `;
    });
}

// 5. Dispute Letter Generator
function generateDispute(type) {
    // Navigate to Dispute Letter Editor
    window.navigateToSection("editor");

    const stateObj = stateRules[state.selectedState];
    const dateFormatted = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    const sepDateFormatted = new Date(state.separationDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    let letterTitle = "";
    let letterContent = "";

    // Input elements values
    const empName = document.getElementById("input-emp-name") ? document.getElementById("input-emp-name").value : "Jane Doe";
    const companyName = document.getElementById("input-company-name") ? document.getElementById("input-company-name").value : "Stitch Tech Systems, Inc.";
    const managerName = document.getElementById("input-manager-name") ? document.getElementById("input-manager-name").value : "Director of Human Resources";

    if (type === "cause") {
        letterTitle = "Misclassification of Separation Cause (Restructuring Layoff)";
        letterContent = `${dateFormatted}

State Unemployment Insurance Division
Attention: Separation Dispute Appeals
State of ${stateObj.name}

SUBJECT: Separation Dispute Appeal - Jane Doe
SSN: [XXX-XX-XXXX] (For verification purposes only)
Employer: ${companyName}
Separation Date: ${sepDateFormatted}

To Whom It May Concern,

I am writing to formally contest the classification of my termination from ${companyName} on ${sepDateFormatted} as being "for cause." 

My separation was the direct result of company-wide restructuring and organizational role elimination, not due to any performance issues or misconduct on my part. The decision was presented as part of an AI-driven restructuring initiative which affected multiple positions across my team.

Under ${stateObj.name} Unemployment Insurance regulations, an employee is eligible for benefits if their separation is due to lack of work or restructuring, and is only disqualified if the employer carries the burden of proof to demonstrate deliberate misconduct. The elimination of my role does not meet the standard of misconduct.

I request a full review of my separation circumstances and a correction of my eligibility status to enable the immediate release of my unemployment benefits.

Sincerely,

Jane Doe
[Jane Doe Signature]
Email: jane.doe@example.com
Phone: (555) 019-2834`;
    } else if (type === "1099") {
        letterTitle = "1099 Worker Classification & Wage Dispute";
        letterContent = `${dateFormatted}

State Department of Labor & Workforce Development
Unemployment Insurance Determinations Section
State of ${stateObj.name}

SUBJECT: Employee Status Misclassification Dispute
Employer: ${companyName}
Period of Service: January 15, 2024 to ${sepDateFormatted}
Position: Software Engineering Contractor (1099-NEC)

To the Determination Officer,

I am writing to formally request a determination regarding my employment classification during my work with ${companyName}. I was classified as an Independent Contractor (1099), but the actual characteristics of my service meet the legal standards of an employee under ${stateObj.name} common law and classification tests.

Specifically:
1. Control: The company dictated my work hours, required attendance at daily stand-up meetings, and supervised my task allocation directly.
2. Tools and Equipment: I was provided with a company laptop, licenses for developmental environments, and corporate credentials, utilizing none of my own independent tools.
3. Integration: My role as a developer was integral to the core business offerings of the company rather than a peripheral project.

Because of this misclassification, my wages have not been reported to the state's unemployment trust fund, causing an initial denial of my benefits. I request that the state audit my working relationship with ${companyName}, reclassify my earnings, and establish my valid eligibility.

Attached are copies of my 1099-NEC forms, contracts, and timesheet logs.

Sincerely,

Jane Doe
[Jane Doe Signature]
Email: jane.doe@example.com
Phone: (555) 019-2834`;
    } else {
        // Base Period Correction
        letterTitle = "Base Period Wages Correction Request";
        letterContent = `${dateFormatted}

State Unemployment Insurance Administration
State of ${stateObj.name}

SUBJECT: Request for Wage Record Correction
Claimant: Jane Doe
Employer: ${companyName}

I am writing to appeal the Wage Determination Notice because my reported wages for the base period quarters do not match my actual earnings. 

My records show the following discrepancy:
- Reported Q4 Wages: $10,200
- Actual Earnings: $19,200 (documented in attached pay slips)

I request that my records be audited and corrected to reflect my true earnings, thereby qualifying me for my full state-eligible benefit rate of $${benefitEstimate.finalWba}/wk.

Sincerely,

Jane Doe`;
    }

    state.currentDisputeLetter = letterContent;
    
    // Set text in editor
    const editorTextarea = document.getElementById("letter-editor-text");
    if (editorTextarea) {
        editorTextarea.value = letterContent;
    }

    const editorTitle = document.getElementById("editor-title-text");
    if (editorTitle) {
        editorTitle.innerText = letterTitle;
    }
}

// 6. Dispute Letter Editor UI Controller
function initDisputeLetterEditor() {
    const editorTextarea = document.getElementById("letter-editor-text");
    const saveLetterBtn = document.getElementById("save-letter-btn");
    const downloadTxtBtn = document.getElementById("download-txt-btn");
    const copyLetterBtn = document.getElementById("copy-letter-btn");
    const printLetterBtn = document.getElementById("print-letter-btn");

    if (editorTextarea) {
        editorTextarea.addEventListener("input", (e) => {
            state.currentDisputeLetter = e.target.value;
        });
    }

    if (saveLetterBtn) {
        saveLetterBtn.addEventListener("click", () => {
            // Save dispute to active list
            const newCaseId = `Case #` + Math.floor(Math.random() * 800 + 100) + `-A`;
            const titleElement = document.getElementById("editor-title-text");
            const title = titleElement ? titleElement.innerText : "Dispute Letter";
            
            const newDispute = {
                id: newCaseId,
                type: title.includes("1099") ? "1099 Misclassification" : "Separation Appeal",
                date: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
                status: "Pending Submission",
                progress: 10,
                explanation: "Ready to Send"
            };

            state.disputes.unshift(newDispute);
            renderDisputes();
            alert("Dispute draft saved to your Active Disputes tracker.");
            window.navigateToSection("advocacy");
        });
    }

    if (copyLetterBtn) {
        copyLetterBtn.addEventListener("click", () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(state.currentDisputeLetter)
                    .then(() => alert("Dispute letter copied to clipboard!"))
                    .catch(err => alert("Failed to copy text: " + err));
            } else {
                // Fallback
                if (editorTextarea) {
                    editorTextarea.select();
                    document.execCommand("copy");
                    alert("Dispute letter copied to clipboard!");
                }
            }
        });
    }

    if (downloadTxtBtn) {
        downloadTxtBtn.addEventListener("click", () => {
            const blob = new Blob([state.currentDisputeLetter], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "UI_Runway_Eligibility_Dispute_Letter.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (printLetterBtn) {
        printLetterBtn.addEventListener("click", () => {
            // Open print dialog for the letter content
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
                <html>
                <head>
                    <title>Print Dispute Letter</title>
                    <style>
                        body { font-family: 'Courier New', Courier, monospace; padding: 40px; line-height: 1.6; white-space: pre-wrap; color: #333; }
                    </style>
                </head>
                <body>${state.currentDisputeLetter}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        });
    }
}

// Global viewer for active dispute list items
window.viewActiveDispute = function(caseId) {
    const dispute = state.disputes.find(d => d.id === caseId);
    if (!dispute) return;
    
    // Simulate loading the dispute document in the editor
    generateDispute(dispute.type.includes("1099") ? "1099" : "cause");
};

// 7. Secure Document Vault UI Controller
function initVault() {
    const vaultModal = document.getElementById("vault-modal");
    const closeVaultBtn = document.getElementById("close-vault-btn");
    const closeVaultFooterBtn = document.getElementById("close-vault-footer-btn");

    // Connect modal opening and closing
    window.openVault = function() {
        if (vaultModal) {
            vaultModal.classList.remove("hidden");
            vaultModal.classList.add("flex");
            renderVault();
        }
    };

    window.closeVault = function() {
        if (vaultModal) {
            vaultModal.classList.add("hidden");
            vaultModal.classList.remove("flex");
        }
    };

    if (closeVaultBtn) {
        closeVaultBtn.addEventListener("click", () => {
            window.closeVault();
        });
    }

    if (closeVaultFooterBtn) {
        closeVaultFooterBtn.addEventListener("click", () => {
            window.closeVault();
        });
    }

    window.importVaultDocument = function(id) {
        const item = state.vault.find(doc => doc.id === id);
        if (!item) return;

        // Check if already uploaded
        const alreadyUploaded = state.uploads.some(u => u.name === item.name);
        if (alreadyUploaded) {
            showToast(`"${item.name}" is already imported.`, 'error');
            window.closeVault();
            return;
        }

        // Add to active uploads
        const newUpload = {
            id: Date.now(),
            name: item.name,
            size: item.size,
            date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "Analyzing",
            type: item.name.split(".").pop().toLowerCase(),
            text: item.text
        };

        state.uploads.unshift(newUpload);
        renderUploads();
        window.closeVault();

        // Simulate parsing block with custom delay for premium feel
        setTimeout(() => {
            simulateParsing(newUpload);
            showToast(`Successfully imported and parsed "${item.name}" from Vault!`);
        }, 800);
    };

    renderVault();
}

function renderVault() {
    const list = document.getElementById("vault-list");
    if (!list) return;

    list.innerHTML = "";
    state.vault.forEach(item => {
        const icon = item.name.endsWith(".pdf") ? "picture_as_pdf" : "description";
        
        list.innerHTML += `
            <div onclick="importVaultDocument('${item.id}')" 
                 class="border border-outline-variant bg-surface-container-lowest p-4 rounded-xl hover:border-[#0D9488] hover:bg-surface-container-low transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-[#eff4ff] text-[#0D9488] flex items-center justify-center rounded-lg border border-[#dce9ff] group-hover:bg-[#dce9ff] transition-colors shrink-0">
                        <span class="material-symbols-outlined">${icon}</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-label-md text-on-surface font-bold text-sm text-primary mb-1 group-hover:text-[#0D9488] transition-colors">${item.name}</h4>
                        <p class="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">${item.description}</p>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-outline-variant/30 flex justify-between items-center text-[11px] text-outline font-semibold">
                    <span>${item.date} • ${item.size}</span>
                    <span class="flex items-center gap-1 text-[#0d9488] font-bold group-hover:text-primary transition-colors">
                        Import & Parse <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                </div>
            </div>
        `;
    });
}

// Sleek Toast Notification System
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `p-4 rounded-lg shadow-lg border text-white font-label-md flex items-center gap-2 transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto max-w-sm ${
        type === 'success' 
            ? 'bg-[#006a61] border-[#86f2e4]' 
            : type === 'error' 
                ? 'bg-[#ba1a1a] border-[#ffb4ab]' 
                : 'bg-primary border-outline-variant'
    }`;
    
    const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
    toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">${icon}</span>
        <span class="text-xs font-semibold">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-[-10px]');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
