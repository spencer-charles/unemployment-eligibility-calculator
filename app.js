// UI Runway Core Application Logic

const STORAGE_KEY = "ui_runway_session_v2";

const DEFAULT_VAULT = [
    {
        id: "vault-1",
        name: "Seattle_Tech_Severance.pdf",
        size: "2.8 MB",
        date: "Jun 10, 2026",
        description: "Severance agreement from Seattle, WA. Contains 12 weeks lump-sum severance, COBRA subsidy, and release of claims.",
        text: "Separation Agreement and Release of Claims. Employee: Jane Doe. Employer: Seattle Tech Systems (Seattle, WA). Separation Date: June 30, 2026. The Company agrees to provide a lump-sum severance payment equal to 12 weeks of employee's base salary ($24,000). The Company will also subsidize 3 months of COBRA healthcare continuation. Employee agrees to waive and release all claims and abide by a 12-month non-disparagement and non-solicitation clause. You have 21 days to review this agreement under the Older Workers Benefit Protection Act (ADEA)."
    },
    {
        id: "vault-2",
        name: "Stitch_Tech_W2_2025.pdf",
        size: "1.4 MB",
        date: "Jan 25, 2026",
        description: "Form W-2 Wage and Tax Statement. Shows annual W-2 wages of $88,000 in Washington state.",
        text: "Form W-2 Wage and Tax Statement 2025. Employer: Stitch Tech Systems. Employee: Jane Doe. Box 1 Wages, tips, other comp: $88,000. Box 2 Federal income tax withheld: $13,200. Box 15 State: WA. Q1 wages: $22000. Q2 wages: $22000. Q3 wages: $22000. Q4 wages: $22000."
    },
    {
        id: "vault-3",
        name: "CA_Severance_JaneDoe.pdf",
        size: "2.1 MB",
        date: "Jun 18, 2026",
        description: "California separation agreement. Includes 6 weeks of continuation pay, 1 month COBRA, and separation date of August 1, 2026.",
        text: "Separation Agreement and General Release. Employee Jane Doe. Employer: California Tech Solutions. State: CA. Separation Date: August 1, 2026. Severance compensation: 6 weeks of continuation pay. Company shall pay 1 month of COBRA health insurance premiums. Includes general release of claims and confidentiality provisions."
    },
    {
        id: "vault-4",
        name: "TX_Termination_Continuation.pdf",
        size: "1.9 MB",
        date: "May 14, 2026",
        description: "Texas termination letter. Details 8 weeks salary continuation, clawback clause, and separation date of September 15, 2026.",
        text: "Termination Notice & Severance Agreement. Employer: Texas Enterprise Corp. Employee: Jane Doe. Separation date: September 15, 2026. You will receive severance payment in the form of salary continuation for 8 weeks. Mitigation & Clawback: If Employee secures full-time replacement employment during the continuation period, remaining severance payments shall cease. Governing law: State of Texas (TX)."
    },
    {
        id: "vault-5",
        name: "1099_NEC_Consulting_Fees.pdf",
        size: "1.2 MB",
        date: "Feb 12, 2026",
        description: "Form 1099-NEC Nonemployee Compensation. Shows $52,000 consulting payments in Florida.",
        text: "Form 1099-NEC Nonemployee Compensation. Payer: Florida Consulting Group. Recipient: Jane Doe. Box 1 Nonemployee compensation: $52,000. State: FL. Note: Independent contractor fees; no state unemployment tax (SUTA) reported by payer."
    }
];

function getDefaultState() {
    return {
        userName: "Jane Doe",
        companyName: "Stitch Tech Systems, Inc.",
        managerName: "Director of Human Resources",
        selectedState: "FL",
        separationDate: "2026-06-15",
        weeklyWage: 1500,
        severanceType: "weeks", // 'weeks' | 'lump-sum' | 'none'
        severanceAmount: 12000,
        severanceWeeks: 8,
        q1Wage: 18500,
        q2Wage: 18500,
        q3Wage: 19200,
        q4Wage: 19200,
        is1099Mode: false,
        // Financial Runway parameters
        liquidSavings: 15000,
        monthlyExpenses: 4200,
        monthlyCobra: 650,
        cobraSubsidyMonths: 0,
        applyTaxes: true,
        // Filing Readiness Checklist manual toggles
        checklist: {
            stateId: true,
            directDeposit: false,
            severanceDoc: false,
            wageRecord: false
        },
        selectedUploadId: null,
        uploads: [],
        disputes: [
            {
                id: "Case #492-A",
                type: "Classification Review",
                templateType: "cause",
                date: "Oct 12, 2026",
                status: "In Progress",
                progress: 50,
                explanation: "Awaiting Employer Response",
                letterContent: ""
            }
        ],
        quizScore: 0,
        currentDisputeType: "cause", // 'cause' | '1099' | 'wages'
        currentDisputeLetter: "",
        vault: DEFAULT_VAULT
    };
}

let state = loadStateFromStorage();

// Escape HTML utility to prevent XSS
function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function loadStateFromStorage() {
    const defaults = getDefaultState();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaults;
        const parsed = JSON.parse(raw);
        return {
            ...defaults,
            ...parsed,
            checklist: { ...defaults.checklist, ...(parsed.checklist || {}) },
            vault: DEFAULT_VAULT
        };
    } catch (e) {
        console.warn("Could not read session from localStorage, using defaults.", e);
        return defaults;
    }
}

function saveStateToStorage() {
    try {
        const toSave = { ...state };
        delete toSave.vault; // Vault is static constant
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        updateSettingsStats();
    } catch (e) {
        console.warn("Failed to persist state to localStorage", e);
    }
}

// Initialize app when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    syncProfileUI();
    initNavigation();
    initIntakePortal();
    initRoadmapDashboard();
    initAdvocacyCenter();
    initDisputeLetterEditor();
    initVault();
    renderUploads();
    renderDisputes();
    updateCalculations();
    updateSettingsStats();
});

function syncProfileUI() {
    const name = state.userName || "Jane Doe";
    const initials = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0].toUpperCase())
        .join("") || "JD";

    const sidebarName = document.getElementById("sidebar-user-name");
    const sidebarAvatar = document.getElementById("sidebar-avatar");
    if (sidebarName) sidebarName.textContent = name;
    if (sidebarAvatar) sidebarAvatar.textContent = initials;

    const empNameInput = document.getElementById("input-emp-name");
    const companyInput = document.getElementById("input-company-name");
    const managerInput = document.getElementById("input-manager-name");
    if (empNameInput) empNameInput.value = state.userName;
    if (companyInput) companyInput.value = state.companyName;
    if (managerInput) managerInput.value = state.managerName;

    const settingsName = document.getElementById("settings-user-name");
    const settingsCompany = document.getElementById("settings-company-name");
    if (settingsName) settingsName.value = state.userName;
    if (settingsCompany) settingsCompany.value = state.companyName;
}

// 1. Navigation Controller (Tab Switching)
function initNavigation() {
    const navLinks = document.querySelectorAll("nav a[data-nav]");
    const sections = {
        intake: document.getElementById("section-intake"),
        roadmap: document.getElementById("section-roadmap"),
        advocacy: document.getElementById("section-advocacy"),
        editor: document.getElementById("section-editor"),
        settings: document.getElementById("section-settings")
    };

    function showSection(targetId) {
        Object.keys(sections).forEach(key => {
            if (sections[key]) {
                sections[key].classList.add("hidden");
                sections[key].classList.remove("flex", "flex-col");
            }
        });

        const targetSection = sections[targetId];
        if (targetSection) {
            targetSection.classList.remove("hidden");
            if (targetId === "editor") {
                targetSection.classList.add("flex", "flex-col");
            }
        }

        document.querySelectorAll("nav a[data-nav]").forEach(link => {
            const navKey = link.getAttribute("data-nav");
            const isTarget = navKey === targetId || (targetId === "editor" && navKey === "advocacy");

            if (isTarget) {
                link.classList.add("bg-secondary-container", "text-on-secondary-container", "font-bold");
                link.classList.remove("text-on-surface-variant", "hover:bg-surface-variant", "hover:bg-surface-container-high");
            } else {
                link.classList.remove("bg-secondary-container", "text-on-secondary-container", "font-bold");
                link.classList.add("text-on-surface-variant", "hover:bg-surface-variant", "hover:bg-surface-container-high");
            }
        });

        if (targetId === "roadmap") {
            syncRoadmapInputsFromState();
            updateCalculations();
        } else if (targetId === "settings") {
            syncProfileUI();
            updateSettingsStats();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const navKey = link.getAttribute("data-nav");
            if (navKey) showSection(navKey);
        });
    });

    window.navigateToSection = showSection;
}

// 2. Intake Portal Controller
function initIntakePortal() {
    const fileInput = document.getElementById("file-input");
    const dropzone = document.getElementById("dropzone");
    const selectFilesBtn = document.getElementById("select-files-btn");

    if (selectFilesBtn && fileInput) {
        selectFilesBtn.addEventListener("click", () => fileInput.click());
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handleUploadedFiles(e.target.files);
                fileInput.value = "";
            }
        });
    }

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
            if (dt && dt.files && dt.files.length > 0) {
                handleUploadedFiles(dt.files);
            }
        });
    }

    function handleUploadedFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileId = Date.now() + i;

            const newUpload = {
                id: fileId,
                name: file.name,
                size: Math.max(0.1, file.size / (1024 * 1024)).toFixed(1) + " MB",
                date: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                status: "Analyzing",
                type: file.name.split(".").pop().toLowerCase(),
                text: "",
                extractedSummary: ""
            };

            state.uploads.unshift(newUpload);
            state.selectedUploadId = newUpload.id;
            renderUploads();

            if (newUpload.type === "pdf") {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const arrayBuffer = e.target.result;
                        const text = await extractTextFromPdfBuffer(arrayBuffer);
                        newUpload.text = text || mockOcrTextForFilename(newUpload.name);
                    } catch (err) {
                        console.warn("PDF.js parsing fallback used:", err);
                        newUpload.text = mockOcrTextForFilename(newUpload.name);
                    }
                    simulateParsing(newUpload);
                    showToast(`Analyzed "${newUpload.name}" and updated your Roadmap.`);
                };
                reader.readAsArrayBuffer(file);
            } else if (file.type === "text/plain" || newUpload.type === "txt") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newUpload.text = e.target.result;
                    simulateParsing(newUpload);
                    showToast(`Analyzed "${newUpload.name}" and updated your Roadmap.`);
                };
                reader.readAsText(file);
            } else {
                setTimeout(() => {
                    newUpload.text = mockOcrTextForFilename(newUpload.name);
                    simulateParsing(newUpload);
                    showToast(`Analyzed "${newUpload.name}" and updated your Roadmap.`);
                }, 900);
            }
        }
    }

    window.selectUpload = function(id) {
        const found = state.uploads.find(u => String(u.id) === String(id));
        if (!found) return;
        state.selectedUploadId = found.id;
        renderUploads();
        renderTranslationPreview(found);
        saveStateToStorage();
    };

    window.deleteUpload = function(id, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        state.uploads = state.uploads.filter(item => String(item.id) !== String(id));
        if (String(state.selectedUploadId) === String(id)) {
            state.selectedUploadId = state.uploads.length > 0 ? state.uploads[0].id : null;
        }
        renderUploads();
        if (state.selectedUploadId) {
            const currentDoc = state.uploads.find(u => u.id === state.selectedUploadId);
            renderTranslationPreview(currentDoc);
        } else {
            renderTranslationPreview(null);
        }
        updateCalculations();
        saveStateToStorage();
        showToast("Document removed from session.", "info");
    };

    window.loadSampleDocuments = function() {
        const sampleSev = {
            id: Date.now() + 1,
            name: "Severance_Agreement_Draft.pdf",
            size: "2.4 MB",
            date: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "Verified",
            type: "pdf",
            text: "Separation Agreement and General Release. Employee Jane Doe is separating from Stitch Tech Systems in Florida (FL). Separation date is June 15, 2026. The company will pay employee severance of 8 weeks salary continuation. Company will cover 2 months of COBRA healthcare continuation. Includes standard release of claims and 12-month non-disparagement clause."
        };
        const sampleW2 = {
            id: Date.now() + 2,
            name: "W2_2025_Final.pdf",
            size: "1.1 MB",
            date: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "Verified",
            type: "pdf",
            text: "Form W-2 Wage and Tax Statement. Employer: Stitch Tech Systems. Claimant: Jane Doe. Box 1 Wages: $75,400. Q1 Wages: $18,500. Q2 Wages: $18,500. Q3 Wages: $19,200. Q4 Wages: $19,200. Box 15 State: FL."
        };

        state.uploads = [sampleSev, sampleW2];
        state.selectedUploadId = sampleSev.id;
        simulateParsing(sampleW2, true);
        simulateParsing(sampleSev, false);
        showToast("Sample Florida transition package loaded! Click 'View Updated Roadmap' to explore.");
    };

    // Render initial translation preview if uploads exist from localStorage
    if (state.uploads.length > 0) {
        const activeDoc = state.uploads.find(u => u.id === state.selectedUploadId) || state.uploads[0];
        state.selectedUploadId = activeDoc.id;
        renderTranslationPreview(activeDoc);
    }
}

// PDF Text extraction utility using Mozilla PDF.js
async function extractTextFromPdfBuffer(arrayBuffer) {
    if (typeof pdfjsLib === "undefined") {
        throw new Error("pdfjsLib is not loaded on page");
    }
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
    }
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    let extractedText = "";

    const pagesToParse = Math.min(pdf.numPages, 4);
    for (let pageNum = 1; pageNum <= pagesToParse; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        extractedText += pageText + "\n";
    }
    return extractedText.trim();
}

// Mock OCR helper for image files or scanned PDFs
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

        let foundState = state.selectedState || "FL";
        for (const [code, rule] of Object.entries(stateRules)) {
            if (fn.includes(rule.name.toLowerCase()) || new RegExp(`\\b${code.toLowerCase()}\\b`).test(fn)) {
                foundState = code;
                break;
            }
        }
        mockText += `This agreement is governed by the laws of the State of ${stateRules[foundState].name} (${foundState}). `;
        mockText += "Employee agrees their Separation Date will be June 15, 2026. Includes release of claims and confidentiality provisions.";
    } else if (fn.includes("1099")) {
        mockText += "Form 1099-NEC Nonemployee Compensation. Payer: Consulting Group. Recipient: Jane Doe. Box 1 Nonemployee compensation: $52,000. State: FL.";
    } else if (fn.includes("w2") || fn.includes("w-2") || fn.includes("tax")) {
        mockText += "Wage and Tax Statement W-2. Employer Stitch Tech. Employee Jane Doe. Box 1 Wages: $78,000. Box 15 State: FL Florida.";
    }
    return mockText;
}

// Flexible Date Parser
function parseFlexibleDate(text) {
    const ymd = text.match(/\b(\d{4})[-/\.](\d{1,2})[-/\.](\d{1,2})\b/);
    if (ymd) {
        return `${ymd[1]}-${String(ymd[2]).padStart(2, "0")}-${String(ymd[3]).padStart(2, "0")}`;
    }

    const mdy = text.match(/\b(\d{1,2})[-/\.](\d{1,2})[-/\.](\d{2,4})\b/);
    if (mdy) {
        let year = mdy[3];
        if (year.length === 2) year = "20" + year;
        return `${year}-${String(mdy[1]).padStart(2, "0")}-${String(mdy[2]).padStart(2, "0")}`;
    }

    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const monthsAbbr = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    const pattern = new RegExp(`\\b(${months.join("|")}|${monthsAbbr.join("|")})\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})\\b`, "i");
    const mdyWord = text.match(pattern);
    if (mdyWord) {
        const monthName = mdyWord[1].toLowerCase();
        let monthIdx = months.indexOf(monthName);
        if (monthIdx === -1) monthIdx = monthsAbbr.indexOf(monthName);
        if (monthIdx !== -1) {
            return `${mdyWord[3]}-${String(monthIdx + 1).padStart(2, "0")}-${String(mdyWord[2]).padStart(2, "0")}`;
        }
    }
    return null;
}

// Contextual State Extractor
function extractStateFromContext(text) {
    if (typeof stateRules === "undefined") return null;

    const zipPattern = /\b([A-Z]{2})\s+\d{5}(?:-\d{4})?\b/;
    const zipMatch = text.match(zipPattern);
    if (zipMatch && stateRules[zipMatch[1].toUpperCase()]) {
        return zipMatch[1].toUpperCase();
    }

    const cityStatePattern = /\b[a-zA-Z\s]{3,20},\s+([A-Z]{2})\b/;
    const cityStateMatch = text.match(cityStatePattern);
    if (cityStateMatch && stateRules[cityStateMatch[1].toUpperCase()]) {
        return cityStateMatch[1].toUpperCase();
    }

    const stateLabelPattern = /\b(?:state|st)\s*:\s*\b([A-Z]{2})\b/i;
    const stateLabelMatch = text.match(stateLabelPattern);
    if (stateLabelMatch && stateRules[stateLabelMatch[1].toUpperCase()]) {
        return stateLabelMatch[1].toUpperCase();
    }

    const box15Pattern = /\bbox\s*15\s*(?:state)?\s*:?\s*([A-Z]{2})\b/i;
    const box15Match = text.match(box15Pattern);
    if (box15Match && stateRules[box15Match[1].toUpperCase()]) {
        return box15Match[1].toUpperCase();
    }

    return null;
}

// Clause scanner that detects specific legal provisions in the document text
function scanDocumentClauses(uploadItem) {
    const rawText = `${uploadItem.name || ""} ${uploadItem.text || ""}`;
    const lower = rawText.toLowerCase();
    const clauses = [];

    if (lower.includes("1099") || lower.includes("nonemployee compensation")) {
        clauses.push({
            label: "1099 Contractor Flag",
            tone: "error",
            summary: "1099-NEC earnings are not automatically credited to your state's UI base period unless you file a worker misclassification claim."
        });
    }
    if (lower.includes("w-2") || lower.includes("w2") || lower.includes("wage and tax")) {
        clauses.push({
            label: "W-2 Covered Wages",
            tone: "success",
            summary: "Confirms SUTA-covered employment wages eligible for standard state base period validation."
        });
    }
    if (lower.includes("lump sum") || lower.includes("lump-sum")) {
        clauses.push({
            label: "Lump-Sum Payout",
            tone: "info",
            summary: "Paid in a single installment. In several states (e.g., DE, GA, IL, MA, NV, OH, OK), lump-sum severance does not delay UI benefits."
        });
    } else if (lower.includes("continuation") || lower.includes("weeks")) {
        clauses.push({
            label: "Salary Continuation",
            tone: "info",
            summary: "Severance paid over a multi-week schedule. Often treated as active payroll in delay/offset states."
        });
    }
    if (lower.includes("release") || lower.includes("waive")) {
        clauses.push({
            label: "Release of Claims",
            tone: "warn",
            summary: "Requires waiving your right to sue for wrongful termination in exchange for severance pay (cannot waive your statutory right to file for state UI)."
        });
    }
    if (lower.includes("clawback") || lower.includes("mitigation") || lower.includes("cease")) {
        clauses.push({
            label: "Clawback / Mitigation",
            tone: "error",
            summary: "Contains a mitigation offset: severance payments may stop or be clawed back if you start a new job during the continuation window."
        });
    }
    if (lower.includes("non-compete") || lower.includes("non-solicitation") || lower.includes("non-disparagement")) {
        clauses.push({
            label: "Restrictive Covenants",
            tone: "warn",
            summary: "Includes non-disparagement, non-solicitation, or non-compete restrictions that bind your post-separation conduct."
        });
    }
    if (lower.includes("cobra")) {
        const cobraMonthsMatch = lower.match(/(\d+)\s*months?\s*(?:of)?\s*cobra/);
        const mo = cobraMonthsMatch ? cobraMonthsMatch[1] : "subsidized";
        clauses.push({
            label: `COBRA Subsidy (${mo} mo)`,
            tone: "success",
            summary: "Employer-paid COBRA health coverage reduces your monthly cash burn rate during early transition months."
        });
    }
    if (lower.includes("21 days") || lower.includes("45 days") || lower.includes("adea") || lower.includes("older workers")) {
        clauses.push({
            label: "ADEA Review Window",
            tone: "info",
            summary: "Provides a mandatory 21- or 45-day review period plus a 7-day revocation window after signing."
        });
    }

    if (clauses.length === 0) {
        clauses.push({
            label: "Standard Separation Notice",
            tone: "info",
            summary: "Verifies involuntary layoff / separation date for state unemployment intake."
        });
    }

    return clauses;
}

// Parse uploaded or vault document and sync state
function simulateParsing(uploadItem, silentBanner = false) {
    uploadItem.status = "Verified";

    const originalText = uploadItem.name + " " + (uploadItem.text || "");
    const textToSearch = originalText.toLowerCase();

    let stateMatched = extractStateFromContext(originalText);

    if (!stateMatched) {
        for (const [code, rule] of Object.entries(stateRules)) {
            if (textToSearch.includes(rule.name.toLowerCase())) {
                stateMatched = code;
                break;
            }
        }
    }

    if (!stateMatched) {
        const ambiguousCodes = ["ID", "IN", "OR", "CO", "ME", "LA", "OH", "MD", "PA", "UT", "DE"];
        for (const [code] of Object.entries(stateRules)) {
            if (ambiguousCodes.includes(code)) continue;
            const codeRegex = new RegExp(`\\b${code}\\b`);
            if (codeRegex.test(originalText)) {
                stateMatched = code;
                break;
            }
        }
    }

    let severanceWeeks = null;
    let severanceAmount = null;
    let severanceType = null;
    const isLumpSumText = textToSearch.includes("lump sum") || textToSearch.includes("lump-sum");

    const weeksMatch = textToSearch.match(/\b(\d+)\s*(?:weeks?|months?)\s*(?:of)?\s*(?:employee's\s*base\s*salary|severance|salary|pay|continuation|compensation)\b/);
    const amtMatch = textToSearch.match(/(?:severance|separation|lump-sum|lump\s*sum|payment|sum|salary)\s*(?:pay|payment|amount)?[^$]{0,40}\$\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/);

    if (isLumpSumText && amtMatch) {
        severanceAmount = parseInt(amtMatch[1].replace(/,/g, ""), 10);
        severanceType = "lump-sum";
    } else if (weeksMatch) {
        severanceWeeks = parseInt(weeksMatch[1], 10);
        if (weeksMatch[0].includes("month")) {
            severanceWeeks = Math.round(severanceWeeks * 4.33);
        }
        severanceType = isLumpSumText ? "lump-sum" : "weeks";
        if (amtMatch) {
            severanceAmount = parseInt(amtMatch[1].replace(/,/g, ""), 10);
        }
    } else if (amtMatch) {
        severanceAmount = parseInt(amtMatch[1].replace(/,/g, ""), 10);
        severanceType = "lump-sum";
    }

    // Check COBRA subsidy months
    const cobraMatch = textToSearch.match(/(\d+)\s*months?\s*(?:of)?\s*cobra/);
    let cobraMonths = cobraMatch ? parseInt(cobraMatch[1], 10) : null;

    // Check separation date
    let separationDate = null;
    const dateMatch = textToSearch.match(/(?:separation|termination|effective|end|last)\s*(?:date|day)?\s*(?:is|of|set for|on)?\s*:?\s*([a-zA-Z0-9\/\-\.,\s]{6,30})/);
    if (dateMatch) {
        separationDate = parseFlexibleDate(dateMatch[1]);
    }
    if (!separationDate) {
        separationDate = parseFlexibleDate(textToSearch);
    }

    const detailsList = [];

    if (stateMatched) {
        state.selectedState = stateMatched;
        detailsList.push(`State: ${stateRules[stateMatched].name}`);
    }

    if (severanceType === "weeks" && severanceWeeks) {
        state.severanceType = "weeks";
        state.severanceWeeks = severanceWeeks;
        state.severanceAmount = severanceAmount || (severanceWeeks * state.weeklyWage);
        detailsList.push(`Severance: ${severanceWeeks} wks continuation ($${state.severanceAmount.toLocaleString()})`);
    } else if (severanceType === "lump-sum" && (severanceAmount || severanceWeeks)) {
        state.severanceType = "lump-sum";
        state.severanceAmount = severanceAmount || (severanceWeeks * state.weeklyWage);
        state.severanceWeeks = severanceWeeks || Math.ceil(state.severanceAmount / Math.max(1, state.weeklyWage));
        detailsList.push(`Severance: Lump Sum $${state.severanceAmount.toLocaleString()} (~${state.severanceWeeks} wks)`);
    }

    if (cobraMonths !== null && !isNaN(cobraMonths)) {
        state.cobraSubsidyMonths = Math.min(6, cobraMonths);
        detailsList.push(`COBRA Subsidy: ${cobraMonths} mo`);
    }

    if (separationDate) {
        state.separationDate = separationDate;
        detailsList.push(`Separation Date: ${separationDate}`);
    }

    // Check W-2 / 1099 annual wages
    let w2Wage = null;
    let is1099 = false;

    if (textToSearch.includes("1099") || textToSearch.includes("nonemployee compensation")) {
        is1099 = true;
        const wageMatch = textToSearch.match(/(?:nonemployee\s*compensation|box\s*1|compensation)\s*:?\s*\$\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/i);
        if (wageMatch) {
            w2Wage = parseInt(wageMatch[1].replace(/,/g, ""), 10);
        }
    } else if (textToSearch.includes("w-2") || textToSearch.includes("w2") || textToSearch.includes("wage and tax") || textToSearch.includes("q1 wages")) {
        const wageMatch = textToSearch.match(/(?:box\s*1[^$]{0,30}|wages\s*:\s*)\$\s*(\d{1,3}(?:,\d{3})+|\d{4,9})/i);
        if (wageMatch) {
            w2Wage = parseInt(wageMatch[1].replace(/,/g, ""), 10);
        }
    }

    // Check explicit quarterly wages in text (e.g., Q1 wages: $18,500)
    const qMatches = [1, 2, 3, 4].map(qNum => {
        const m = textToSearch.match(new RegExp(`q${qNum}\\s*wages\\s*:\\s*\\$?\\s*(\\d{1,3}(?:,\\d{3})+|\\d{4,9})`, "i"));
        return m ? parseInt(m[1].replace(/,/g, ""), 10) : null;
    });

    if (qMatches.some(v => v !== null)) {
        if (qMatches[0] !== null) state.q1Wage = qMatches[0];
        if (qMatches[1] !== null) state.q2Wage = qMatches[1];
        if (qMatches[2] !== null) state.q3Wage = qMatches[2];
        if (qMatches[3] !== null) state.q4Wage = qMatches[3];
        state.is1099Mode = is1099;
        const sumQ = state.q1Wage + state.q2Wage + state.q3Wage + state.q4Wage;
        state.weeklyWage = Math.round(sumQ / 52);
        detailsList.push(`W-2 Quarterly Wages ($${sumQ.toLocaleString()} total)`);
    } else if (w2Wage) {
        const quarterly = Math.round(w2Wage / 4);
        state.q1Wage = quarterly;
        state.q2Wage = quarterly;
        state.q3Wage = quarterly;
        state.q4Wage = quarterly;
        state.weeklyWage = Math.round(w2Wage / 52);
        state.is1099Mode = is1099;
        detailsList.push(`${is1099 ? "1099-NEC (Disputed)" : "W-2"} Annual Earnings: $${w2Wage.toLocaleString()}`);
    }

    uploadItem.extractedSummary = detailsList.length > 0
        ? detailsList.join(" • ")
        : "Standard separation clauses verified";

    if (!silentBanner && detailsList.length > 0) {
        const banner = document.getElementById("intake-extraction-banner");
        const bannerSummary = document.getElementById("intake-extraction-summary");
        if (banner && bannerSummary) {
            banner.classList.remove("hidden");
            bannerSummary.textContent = `Extracted from ${uploadItem.name}: ${detailsList.join(" • ")}.`;
        }
    }

    syncRoadmapInputsFromState();
    renderUploads();
    renderTranslationPreview(uploadItem);
    updateCalculations();
    saveStateToStorage();
}

function renderTranslationPreview(uploadItem) {
    const docBadge = document.getElementById("translation-doc-badge");
    const clausesContainer = document.getElementById("translation-clauses-badges");
    const translationTitle = document.getElementById("translation-title");
    const translationLegalese = document.getElementById("translation-legalese");
    const translationPlainEnglish = document.getElementById("translation-plain-english");
    const actionSlot = document.getElementById("translation-action-slot");

    if (!translationTitle || !translationLegalese || !translationPlainEnglish) return;

    if (!uploadItem) {
        if (docBadge) docBadge.textContent = "No File Selected";
        if (clausesContainer) {
            clausesContainer.innerHTML = `<span class="text-[11px] px-2 py-0.5 rounded bg-surface-container-low text-outline border border-outline-variant/50">Upload or select a file to scan clauses</span>`;
        }
        translationTitle.innerHTML = `<span class="material-symbols-outlined text-[16px] text-secondary">gavel</span> Plain-English Impact`;
        translationLegalese.textContent = "No document currently selected. Upload a PDF/TXT document or choose one from the Sample Vault to inspect its clauses.";
        translationPlainEnglish.textContent = "Legal translations and state-specific unemployment impact will appear here in plain, jargon-free language.";
        if (actionSlot) actionSlot.classList.add("hidden");
        return;
    }

    if (docBadge) docBadge.textContent = uploadItem.status || "Verified";
    const clauses = scanDocumentClauses(uploadItem);

    if (clausesContainer) {
        clausesContainer.innerHTML = clauses.map(c => {
            const colorClass = c.tone === "error"
                ? "bg-[#ffdad6] text-[#93000a] border-[#ffb4ab]"
                : c.tone === "warn"
                    ? "bg-amber-50 text-amber-900 border-amber-300"
                    : c.tone === "success"
                        ? "bg-[#dce9ff] text-[#006a61] border-[#86f2e4]"
                        : "bg-surface-container text-primary border-outline-variant";
            return `<span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}">${escapeHtml(c.label)}</span>`;
        }).join("");
    }

    translationTitle.innerHTML = `<span class="material-symbols-outlined text-[16px] text-secondary">gavel</span> ${escapeHtml(uploadItem.name)}`;
    translationLegalese.textContent = uploadItem.text
        ? `"${uploadItem.text}"`
        : `"Verified transition document (${uploadItem.name})."`;

    const currentStateObj = stateRules[state.selectedState] || stateRules.FL;
    const is1099Doc = (uploadItem.name + " " + (uploadItem.text || "")).toLowerCase().includes("1099");

    const clauseBulletsHtml = clauses.map(c => `
        <div class="flex items-start gap-1.5">
            <span class="material-symbols-outlined text-[15px] text-secondary mt-0.5 shrink-0">subdirectory_arrow_right</span>
            <span><strong>${escapeHtml(c.label)}:</strong> ${escapeHtml(c.summary)}</span>
        </div>
    `).join("");

    translationPlainEnglish.innerHTML = `
        <p class="mb-2"><strong>${escapeHtml(currentStateObj.name)} Rule Check:</strong> ${escapeHtml(currentStateObj.severanceRule.description)}</p>
        <div class="space-y-1.5 pt-1 border-t border-[#cbdbf5]/60">
            ${clauseBulletsHtml}
        </div>
    `;

    if (actionSlot) {
        actionSlot.classList.remove("hidden");
        if (is1099Doc) {
            actionSlot.innerHTML = `
                <button onclick="window.navigateToSection('advocacy'); document.getElementById('reality-check-btn').click();" class="w-full bg-error text-white hover:bg-[#93000a] font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">warning</span>
                    Run 1099 Misclassification Diagnostic
                </button>
            `;
        } else {
            actionSlot.innerHTML = `
                <button onclick="window.navigateToSection('roadmap')" class="w-full bg-secondary text-white hover:bg-[#0F766E] font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors">
                    <span class="material-symbols-outlined text-[16px]">dashboard_customize</span>
                    See Impact on Financial Roadmap
                </button>
            `;
        }
    }
}

function renderUploads() {
    const list = document.getElementById("uploads-list");
    const countBadge = document.getElementById("uploads-count-badge");
    if (countBadge) {
        countBadge.textContent = `${state.uploads.length} ${state.uploads.length === 1 ? "File" : "Files"}`;
    }
    if (!list) return;

    if (state.uploads.length === 0) {
        list.innerHTML = `
            <li class="p-8 text-center text-on-surface-variant">
                <span class="material-symbols-outlined text-3xl text-outline mb-2 block">folder_open</span>
                <p class="font-semibold text-sm text-primary">No transition documents uploaded yet</p>
                <p class="text-xs text-outline mt-1">Drop a PDF/TXT above, browse the Sample Vault, or load the Florida sample package.</p>
            </li>
        `;
        renderFilingChecklist();
        return;
    }

    list.innerHTML = state.uploads.map(item => {
        const isAnalyzing = item.status === "Analyzing";
        const isSelected = String(item.id) === String(state.selectedUploadId);
        const statusBadge = isAnalyzing
            ? `<span class="bg-[#eff4ff] text-[#091426] px-2 py-1 rounded font-label-sm text-xs flex items-center gap-1 border border-[#cbdbf5] animate-pulse">
                <span class="material-symbols-outlined text-[14px] animate-spin">sync</span> Analyzing
               </span>`
            : `<span class="bg-[#dce9ff] text-[#006a61] px-2 py-1 rounded font-label-sm text-xs flex items-center gap-1 border border-[#86f2e4]">
                <span class="material-symbols-outlined text-[14px]">check_circle</span> Verified
               </span>`;

        const icon = item.type === "pdf" ? "picture_as_pdf" : "description";
        const activeRowClasses = isSelected
            ? "bg-[#eff4ff] border-l-4 border-l-[#0D9488]"
            : "bg-white hover:bg-surface-container-low";

        return `
            <li onclick="selectUpload('${escapeHtml(item.id)}')" class="p-4 px-6 flex items-center justify-between transition-colors cursor-pointer ${activeRowClasses}">
                <div class="flex items-center gap-4 min-w-0 pr-3">
                    <div class="w-10 h-10 bg-[#eff4ff] text-primary flex items-center justify-center rounded-lg border border-[#dce9ff] shrink-0">
                        <span class="material-symbols-outlined">${icon}</span>
                    </div>
                    <div class="min-w-0">
                        <p class="font-label-md text-on-surface font-semibold truncate">${escapeHtml(item.name)}</p>
                        <p class="font-label-sm text-outline text-xs truncate">${escapeHtml(item.date)} • ${escapeHtml(item.size)}${item.extractedSummary ? ` • ${escapeHtml(item.extractedSummary)}` : ""}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    ${statusBadge}
                    <button onclick="deleteUpload('${escapeHtml(item.id)}', event)" title="Remove document" class="text-on-surface-variant hover:text-error p-2 rounded-lg hover:bg-error-container/30 transition-colors">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            </li>
        `;
    }).join("");

    renderFilingChecklist();
}

function renderFilingChecklist() {
    const container = document.getElementById("filing-checklist-container");
    const progressBadge = document.getElementById("checklist-progress-badge");
    if (!container) return;

    const hasSeveranceUpload = state.uploads.some(u => {
        const combined = `${u.name} ${u.text || ""}`.toLowerCase();
        return combined.includes("severance") || combined.includes("agreement") || combined.includes("termination");
    });

    const hasW2Upload = state.uploads.some(u => {
        const combined = `${u.name} ${u.text || ""}`.toLowerCase();
        return combined.includes("w-2") || combined.includes("w2") || combined.includes("wage and tax") || combined.includes("1099");
    });

    const items = [
        {
            key: "stateId",
            label: "Government ID / Driver's License",
            checked: Boolean(state.checklist.stateId),
            autoVerified: false,
            actionHtml: ""
        },
        {
            key: "directDeposit",
            label: "SSN & Direct Deposit Routing Numbers",
            checked: Boolean(state.checklist.directDeposit),
            autoVerified: false,
            actionHtml: ""
        },
        {
            key: "severanceDoc",
            label: "Separation Notice / Severance Agreement",
            checked: hasSeveranceUpload || Boolean(state.checklist.severanceDoc),
            autoVerified: hasSeveranceUpload,
            actionHtml: !hasSeveranceUpload
                ? `<button onclick="event.stopPropagation(); window.navigateToSection('intake')" class="font-label-sm text-xs px-2.5 py-1 bg-white border border-outline-variant text-primary rounded hover:bg-surface-variant transition-colors font-semibold">Upload</button>`
                : `<span class="font-label-sm text-[11px] px-2 py-0.5 bg-[#dce9ff] text-[#006a61] rounded font-semibold">Auto-Verified</span>`
        },
        {
            key: "wageRecord",
            label: "Base Period Wage Record (W-2 / Pay Stubs)",
            checked: hasW2Upload || Boolean(state.checklist.wageRecord),
            autoVerified: hasW2Upload,
            actionHtml: !hasW2Upload
                ? `<button onclick="event.stopPropagation(); window.navigateToSection('intake')" class="font-label-sm text-xs px-2.5 py-1 bg-white border border-outline-variant text-primary rounded hover:bg-surface-variant transition-colors font-semibold">Upload</button>`
                : `<span class="font-label-sm text-[11px] px-2 py-0.5 bg-[#dce9ff] text-[#006a61] rounded font-semibold">Auto-Verified</span>`
        }
    ];

    const readyCount = items.filter(i => i.checked).length;
    if (progressBadge) {
        progressBadge.textContent = `${readyCount} / ${items.length} Ready`;
    }

    container.innerHTML = items.map(item => {
        const rowClass = item.checked
            ? "bg-white border-outline-variant/60"
            : "bg-[#fff8f6] border-[#CBD5E1] border-l-4 border-l-[#ba1a1a]";
        const iconHtml = item.checked
            ? `<span class="material-symbols-outlined text-[#006a61]" style="font-variation-settings: 'FILL' 1;">check_circle</span>`
            : `<span class="material-symbols-outlined text-outline">radio_button_unchecked</span>`;

        return `
            <div onclick="toggleChecklistItem('${item.key}')" class="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors ${rowClass}">
                <div class="flex items-center gap-3">
                    ${iconHtml}
                    <span class="font-body-sm text-xs md:text-sm text-primary font-medium select-none">${escapeHtml(item.label)}</span>
                </div>
                <div class="flex items-center gap-2">
                    ${item.actionHtml || `<span class="text-[11px] font-semibold ${item.checked ? "text-[#006a61]" : "text-outline"}">${item.checked ? "Ready" : "Pending"}</span>`}
                </div>
            </div>
        `;
    }).join("");
}

window.toggleChecklistItem = function(key) {
    if (!state.checklist) state.checklist = {};
    state.checklist[key] = !state.checklist[key];
    renderFilingChecklist();
    saveStateToStorage();
};

// 3. Roadmap & Calculations Controller
function syncSeveranceInputVisibility() {
    const sevWeeksInput = document.getElementById("roadmap-sev-weeks");
    const sevAmountInput = document.getElementById("roadmap-sev-amount");
    const sevNoneBadge = document.getElementById("roadmap-sev-none-badge");
    if (!sevWeeksInput || !sevAmountInput) return;

    sevWeeksInput.classList.add("hidden");
    sevAmountInput.classList.add("hidden");
    if (sevNoneBadge) {
        sevNoneBadge.classList.add("hidden");
        sevNoneBadge.classList.remove("flex");
    }

    if (state.severanceType === "weeks") {
        sevWeeksInput.classList.remove("hidden");
    } else if (state.severanceType === "lump-sum") {
        sevAmountInput.classList.remove("hidden");
    } else if (sevNoneBadge) {
        sevNoneBadge.classList.remove("hidden");
        sevNoneBadge.classList.add("flex");
    }
}

function syncRoadmapInputsFromState() {
    const map = {
        "roadmap-state": state.selectedState,
        "roadmap-sep-date": state.separationDate,
        "roadmap-weekly-wage": state.weeklyWage,
        "roadmap-sev-type": state.severanceType,
        "roadmap-sev-amount": state.severanceAmount,
        "roadmap-sev-weeks": state.severanceWeeks,
        "roadmap-q1": state.q1Wage,
        "roadmap-q2": state.q2Wage,
        "roadmap-q3": state.q3Wage,
        "roadmap-q4": state.q4Wage,
        "runway-savings": state.liquidSavings,
        "runway-expenses": state.monthlyExpenses,
        "runway-cobra": state.monthlyCobra,
        "runway-cobra-subsidy": state.cobraSubsidyMonths
    };

    Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el && String(el.value) !== String(val)) {
            el.value = val;
        }
    });

    const taxToggle = document.getElementById("runway-tax-toggle");
    if (taxToggle) taxToggle.checked = Boolean(state.applyTaxes);

    syncSeveranceInputVisibility();
}

function initRoadmapDashboard() {
    syncRoadmapInputsFromState();

    const inputs = [
        ["roadmap-state", "selectedState"],
        ["roadmap-sep-date", "separationDate"],
        ["roadmap-weekly-wage", "weeklyWage", Number],
        ["roadmap-sev-type", "severanceType"],
        ["roadmap-sev-amount", "severanceAmount", Number],
        ["roadmap-sev-weeks", "severanceWeeks", Number],
        ["roadmap-q1", "q1Wage", Number],
        ["roadmap-q2", "q2Wage", Number],
        ["roadmap-q3", "q3Wage", Number],
        ["roadmap-q4", "q4Wage", Number],
        ["runway-savings", "liquidSavings", Number],
        ["runway-expenses", "monthlyExpenses", Number],
        ["runway-cobra", "monthlyCobra", Number],
        ["runway-cobra-subsidy", "cobraSubsidyMonths", Number]
    ];

    inputs.forEach(([elementId, stateKey, parser]) => {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.addEventListener("input", (e) => {
            let val = e.target.value;
            if (parser) val = Math.max(0, parser(val) || 0);
            state[stateKey] = val;

            const sevAmountInput = document.getElementById("roadmap-sev-amount");
            const sevWeeksInput = document.getElementById("roadmap-sev-weeks");

            if (stateKey === "weeklyWage" && state.severanceType === "weeks") {
                state.severanceAmount = state.weeklyWage * state.severanceWeeks;
                if (sevAmountInput) sevAmountInput.value = state.severanceAmount;
            } else if (stateKey === "severanceWeeks" && state.severanceType === "weeks") {
                state.severanceAmount = state.weeklyWage * state.severanceWeeks;
                if (sevAmountInput) sevAmountInput.value = state.severanceAmount;
            } else if (stateKey === "severanceAmount" && state.severanceType === "lump-sum") {
                state.severanceWeeks = Math.ceil(state.severanceAmount / Math.max(1, state.weeklyWage));
                if (sevWeeksInput) sevWeeksInput.value = state.severanceWeeks;
            } else if (stateKey === "severanceType") {
                if (val === "weeks") {
                    state.severanceWeeks = state.severanceWeeks || 8;
                    state.severanceAmount = state.severanceWeeks * state.weeklyWage;
                } else if (val === "lump-sum") {
                    state.severanceAmount = state.severanceAmount || (state.severanceWeeks * state.weeklyWage) || 12000;
                    state.severanceWeeks = Math.ceil(state.severanceAmount / Math.max(1, state.weeklyWage));
                }
                syncRoadmapInputsFromState();
            }

            updateCalculations();
            saveStateToStorage();
        });
    });

    const taxToggle = document.getElementById("runway-tax-toggle");
    if (taxToggle) {
        taxToggle.addEventListener("change", (e) => {
            state.applyTaxes = e.target.checked;
            updateCalculations();
            saveStateToStorage();
        });
    }

    window.toggle1099Mode = function() {
        state.is1099Mode = !state.is1099Mode;
        updateCalculations();
        saveStateToStorage();
        showToast(
            state.is1099Mode
                ? "Switched Base Period Validator to 1099 Contractor Mode."
                : "Switched Base Period Validator to W-2 Employee Mode.",
            "info"
        );
    };
}

// Triggers calculations and updates HTML elements
function updateCalculations() {
    const rules = window.rulesEngine;
    if (!rules || !stateRules[state.selectedState]) return;

    const currentStateRule = stateRules[state.selectedState];

    // Update header state badge and official portal link
    const stateBadge = document.getElementById("state-badge-indicator");
    const portalLink = document.getElementById("state-portal-link");
    if (stateBadge) stateBadge.textContent = currentStateRule.name;
    if (portalLink && currentStateRule.portalUrl) {
        portalLink.href = currentStateRule.portalUrl;
        portalLink.title = `Open official ${currentStateRule.name} Unemployment Portal`;
    }

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
        const clockFirstPayout = document.getElementById("clock-first-payout");
        const clockWaitingBadge = document.getElementById("clock-waiting-week-badge");
        const clockStatusText = document.getElementById("clock-status-text");
        const clockStatusCard = document.getElementById("clock-status-card");
        const clockProgress = document.getElementById("clock-progress");
        const clockDateLabels = document.getElementById("clock-date-labels");
        const clockDescription = document.getElementById("clock-description");

        if (clockDate) clockDate.textContent = sevClock.eligibilityDateFormatted;
        if (clockDays) clockDays.textContent = sevClock.delayDays;
        if (clockWeeks) clockWeeks.textContent = sevClock.delayWeeks;
        if (clockFirstPayout) clockFirstPayout.textContent = sevClock.firstPayoutDateFormatted;
        if (clockDescription) clockDescription.textContent = sevClock.explanation;

        if (clockWaitingBadge) {
            clockWaitingBadge.textContent = sevClock.waitingWeek
                ? `${currentStateRule.name}: 1-Wk Unpaid Waiting Period`
                : `${currentStateRule.name}: No Waiting Week!`;
        }

        const isDelayed = sevClock.delayDays > 0;
        if (clockStatusText) {
            if (!isDelayed) {
                clockStatusText.innerHTML = `<span class="material-symbols-outlined">verified</span> File Immediately`;
            } else if (sevClock.effectCategory === "reduce") {
                clockStatusText.innerHTML = `<span class="material-symbols-outlined">balance</span> Weekly Benefit Offset`;
            } else {
                clockStatusText.innerHTML = `<span class="material-symbols-outlined">schedule</span> Severance Delay Active`;
            }
        }

        if (clockStatusCard && clockStatusText) {
            if (isDelayed) {
                clockStatusCard.className = "bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20 text-left md:text-right w-full md:w-auto shrink-0";
                clockStatusText.className = "font-headline-sm text-base md:text-lg text-secondary-fixed flex items-center md:justify-end gap-2 text-[#86f2e4]";
            } else {
                clockStatusCard.className = "bg-[#86f2e4]/20 rounded-lg p-4 backdrop-blur-sm border border-[#86f2e4]/40 text-left md:text-right w-full md:w-auto shrink-0";
                clockStatusText.className = "font-headline-sm text-base md:text-lg text-white flex items-center md:justify-end gap-2";
            }
        }

        if (clockProgress) {
            clockProgress.style.width = `${sevClock.progressPercent}%`;
        }

        if (clockDateLabels) {
            clockDateLabels.innerHTML = `
                <span>Separation (${escapeHtml(sevClock.separationDateShort)})</span>
                <span>${isDelayed ? `${sevClock.delayWeeks}-Wk Severance Window` : "Zero Severance Offset"}</span>
                <span>Eligible (${escapeHtml(sevClock.eligibilityDateShort)})</span>
            `;
        }
    }

    // 2. Base Period Validator Calculations
    const basePeriod = rules.validateBasePeriod(
        state.selectedState,
        state.q1Wage,
        state.q2Wage,
        state.q3Wage,
        state.q4Wage,
        state.is1099Mode
    );

    const bpToggleBtn = document.getElementById("bp-1099-toggle-btn");
    if (bpToggleBtn) {
        bpToggleBtn.textContent = state.is1099Mode ? "Mode: 1099-NEC" : "Mode: W-2";
        bpToggleBtn.className = state.is1099Mode
            ? "text-[10px] font-bold px-2.5 py-1 rounded border border-[#ba1a1a] bg-[#ffdad6] text-[#93000a] transition-colors"
            : "text-[10px] font-bold px-2.5 py-1 rounded border border-outline-variant bg-white text-primary hover:bg-surface-container transition-colors";
    }

    const bpStatusIcon = document.getElementById("bp-status-icon");
    const bpStatusTitle = document.getElementById("bp-status-title");
    const bpStatusDesc = document.getElementById("bp-status-desc");
    const bpStatusBox = document.getElementById("bp-status-box");
    const bpActionContainer = document.getElementById("bp-action-container");

    const bpQ1 = document.getElementById("bp-q1");
    const bpQ2 = document.getElementById("bp-q2");
    const bpQ3 = document.getElementById("bp-q3");
    const bpQ4 = document.getElementById("bp-q4");
    const bpHigh = document.getElementById("bp-high");
    const bpTotal = document.getElementById("bp-total");

    if (bpQ1) bpQ1.textContent = `$${state.q1Wage.toLocaleString()}`;
    if (bpQ2) bpQ2.textContent = `$${state.q2Wage.toLocaleString()}`;
    if (bpQ3) bpQ3.textContent = `$${state.q3Wage.toLocaleString()}`;
    if (bpQ4) bpQ4.textContent = `$${state.q4Wage.toLocaleString()}`;
    if (bpHigh) bpHigh.textContent = `$${basePeriod.highQuarter.toLocaleString()}`;
    if (bpTotal) bpTotal.textContent = `$${basePeriod.totalWages.toLocaleString()}`;

    if (basePeriod) {
        if (bpStatusTitle) {
            bpStatusTitle.textContent = basePeriod.eligible
                ? "Quarters Qualified"
                : basePeriod.is1099Warning
                    ? "1099 Reclassification Required"
                    : "Base Period Unqualified";
        }
        if (bpStatusDesc) bpStatusDesc.textContent = basePeriod.reason;

        if (bpStatusBox) {
            if (basePeriod.eligible) {
                bpStatusBox.className = "flex items-start gap-3 mb-4 p-3.5 rounded-lg bg-[#eff4ff] border border-[#cbdbf5]";
                if (bpStatusIcon) {
                    bpStatusIcon.textContent = "check_circle";
                    bpStatusIcon.className = "material-symbols-outlined text-[#006a61] text-2xl mt-0.5";
                }
                if (bpActionContainer) bpActionContainer.classList.add("hidden");
            } else {
                bpStatusBox.className = "flex items-start gap-3 mb-4 p-3.5 rounded-lg bg-error-container/40 border border-error-container";
                if (bpStatusIcon) {
                    bpStatusIcon.textContent = basePeriod.is1099Warning ? "warning" : "cancel";
                    bpStatusIcon.className = "material-symbols-outlined text-error text-2xl mt-0.5";
                }
                if (bpActionContainer) {
                    bpActionContainer.classList.remove("hidden");
                    bpActionContainer.innerHTML = basePeriod.is1099Warning
                        ? `<button onclick="startDispute1099()" class="text-xs font-bold text-[#93000a] underline flex items-center gap-1">
                             <span>Draft 1099 Misclassification Appeal</span>
                             <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                           </button>`
                        : `<button onclick="startDisputeWages()" class="text-xs font-bold text-[#93000a] underline flex items-center gap-1">
                             <span>Appeal Missing Base Period Wages</span>
                             <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                           </button>`;
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
        state.q4Wage,
        state.is1099Mode
    );

    if (benefitEstimate) {
        const estWba = document.getElementById("est-wba");
        const estMaxPayoutSub = document.getElementById("est-max-payout-sub");
        const estDurationBadge = document.getElementById("est-duration-badge");
        const estCalcWba = document.getElementById("est-calc-wba");
        const estBarCalc = document.getElementById("est-bar-calc");
        const estBarEligible = document.getElementById("est-bar-eligible");
        const estActualText = document.getElementById("est-actual-text");
        const estFormulaText = document.getElementById("est-formula-text");
        const estWbaNote = document.getElementById("est-wba-note");
        const capFlag = document.getElementById("cap-flag");

        if (estDurationBadge) {
            estDurationBadge.textContent = `Max ${benefitEstimate.maxWeeks} Weeks`;
        }
        if (estFormulaText) {
            estFormulaText.textContent = `State Formula: ${currentStateRule.formula}`;
        }

        if (estWba) {
            estWba.innerHTML = `$${benefitEstimate.finalWba}<span class="text-base text-on-surface-variant font-normal">/wk</span>`;
        }
        if (estMaxPayoutSub) {
            estMaxPayoutSub.textContent = benefitEstimate.eligible
                ? `Up to $${benefitEstimate.potentialPayout.toLocaleString()} max state payout (${benefitEstimate.maxWeeks} wks)`
                : benefitEstimate.is1099Warning
                    ? `$${benefitEstimate.potentialWbaIfReclassified}/wk ($${benefitEstimate.potentialPayoutIfReclassified.toLocaleString()}) if reclassified`
                    : "Ineligible under current base period wages";
        }
        if (estCalcWba) estCalcWba.textContent = `$${benefitEstimate.calculated}/wk`;
        if (estActualText) estActualText.textContent = `$${benefitEstimate.finalWba}/wk`;

        const maxRange = Math.max(benefitEstimate.calculated, currentStateRule.maxWba, 100);
        const calcPercent = Math.min(100, Math.round((benefitEstimate.calculated / maxRange) * 100));
        const eligiblePercent = Math.min(100, Math.round((benefitEstimate.finalWba / maxRange) * 100));

        if (estBarCalc) estBarCalc.style.width = `${calcPercent}%`;
        if (estBarEligible) estBarEligible.style.width = `${eligiblePercent}%`;

        if (capFlag) {
            if (benefitEstimate.isCapped) {
                capFlag.classList.remove("hidden");
            } else {
                capFlag.classList.add("hidden");
            }
        }

        if (estWbaNote) {
            if (!benefitEstimate.eligible) {
                estWbaNote.innerHTML = `
                    <span class="material-symbols-outlined text-[#ba1a1a] text-[18px] mt-0.5">error</span>
                    <p>${escapeHtml(benefitEstimate.ineligibleReason)}${benefitEstimate.is1099Warning ? ` If reclassified as W-2, your estimated benefit in ${escapeHtml(currentStateRule.name)} would be <strong>$${benefitEstimate.potentialWbaIfReclassified}/wk</strong>.` : ""}</p>
                `;
                estWbaNote.className = "mt-4 p-3 bg-[#fff8f6] rounded border border-[#ffdad6] font-body-sm text-xs text-on-surface-variant flex gap-2 items-start";
            } else if (benefitEstimate.isCapped) {
                estWbaNote.innerHTML = `
                    <span class="material-symbols-outlined text-[#ba1a1a] text-[18px] mt-0.5">warning</span>
                    <p>Your quarterly earnings calculate to <strong>$${benefitEstimate.calculated}/wk</strong>, which hits ${escapeHtml(currentStateRule.name)}'s statutory cap of <strong>$${benefitEstimate.finalWba}/wk</strong> for up to ${benefitEstimate.maxWeeks} weeks (<strong>$${benefitEstimate.potentialPayout.toLocaleString()}</strong> total).</p>
                `;
                estWbaNote.className = "mt-4 p-3 bg-[#fff8f6] rounded border border-[#ffdad6] font-body-sm text-xs text-on-surface-variant flex gap-2 items-start";
            } else {
                estWbaNote.innerHTML = `
                    <span class="material-symbols-outlined text-secondary text-[18px] mt-0.5">info</span>
                    <p>You qualify for <strong>$${benefitEstimate.finalWba}/wk</strong> for up to ${benefitEstimate.maxWeeks} weeks (total potential payout: <strong>$${benefitEstimate.potentialPayout.toLocaleString()}</strong>) in ${escapeHtml(currentStateRule.name)}.</p>
                `;
                estWbaNote.className = "mt-4 p-3 bg-surface-container-low rounded border border-outline-variant/30 font-body-sm text-xs text-on-surface-variant flex gap-2 items-start";
            }
        }

        // 4. Financial Runway & COBRA Cash-Flow Simulator
        const runway = rules.calculateFinancialRunway({
            separationDateStr: state.separationDate,
            liquidSavings: state.liquidSavings,
            monthlyExpenses: state.monthlyExpenses,
            monthlyCobra: state.monthlyCobra,
            cobraSubsidyMonths: state.cobraSubsidyMonths,
            applyTaxes: state.applyTaxes,
            severanceAmount: state.severanceAmount,
            severanceWeeks: state.severanceWeeks,
            severanceType: state.severanceType,
            weeklyWage: state.weeklyWage,
            weeklyWba: benefitEstimate.finalWba,
            maxUiWeeks: benefitEstimate.maxWeeks,
            delayWeeks: sevClock ? sevClock.delayWeeks : 0,
            waitingWeek: currentStateRule.waitingWeek
        });

        const runwayMonthsEl = document.getElementById("runway-months");
        const runwayWeeksEl = document.getElementById("runway-weeks");
        const runwayDepletionEl = document.getElementById("runway-depletion-date");
        const runwayBurnLabel = document.getElementById("runway-burn-label");
        const runwayTotalPool = document.getElementById("runway-total-pool");

        const barSavingsVal = document.getElementById("runway-bar-savings-val");
        const barSevVal = document.getElementById("runway-bar-sev-val");
        const barUiVal = document.getElementById("runway-bar-ui-val");

        const segSavings = document.getElementById("runway-seg-savings");
        const segSev = document.getElementById("runway-seg-sev");
        const segUi = document.getElementById("runway-seg-ui");

        if (runwayMonthsEl) {
            runwayMonthsEl.textContent = runway.isCappedAt5Years ? "60+ Mos" : `${runway.runwayMonths} Mos`;
        }
        if (runwayWeeksEl) {
            runwayWeeksEl.textContent = `${runway.runwayWeeks}${runway.isCappedAt5Years ? "+" : ""} Weeks Cash Runway`;
        }
        if (runwayDepletionEl) {
            runwayDepletionEl.textContent = runway.depletionDateFormatted;
        }
        if (runwayBurnLabel) {
            runwayBurnLabel.textContent = state.cobraSubsidyMonths > 0
                ? `$${runway.subsidizedMonthlyBurn.toLocaleString()}/mo (first ${state.cobraSubsidyMonths} mo), then $${runway.fullMonthlyBurn.toLocaleString()}/mo`
                : `$${runway.fullMonthlyBurn.toLocaleString()}/mo combined burn`;
        }
        if (runwayTotalPool) {
            runwayTotalPool.textContent = `$${runway.totalAvailableResources.toLocaleString()}`;
        }

        if (barSavingsVal) barSavingsVal.textContent = `$${runway.safeSavings.toLocaleString()}`;
        if (barSevVal) barSevVal.textContent = `$${runway.netSeveranceTotal.toLocaleString()}`;
        if (barUiVal) barUiVal.textContent = `$${runway.totalNetUiPool.toLocaleString()}`;

        if (segSavings) segSavings.style.width = `${runway.savingsSharePct}%`;
        if (segSev) segSev.style.width = `${runway.sevSharePct}%`;
        if (segUi) segUi.style.width = `${runway.uiSharePct}%`;
    }

    renderFilingChecklist();
}

// 4. Advocacy & Action Center Controller
function initAdvocacyCenter() {
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
            const checkboxes = quizForm.querySelectorAll("input[type='checkbox']:checked");
            const score = checkboxes.length;
            state.quizScore = score;
            saveStateToStorage();

            if (quizQuestions) quizQuestions.classList.add("hidden");
            if (quizSubmitBtn) quizSubmitBtn.classList.add("hidden");
            if (quizResultCard) {
                quizResultCard.classList.remove("hidden");

                const scoreIndicator = document.getElementById("quiz-score-indicator");
                const quizDiagnosis = document.getElementById("quiz-diagnosis");
                const quizUnlockBtn = document.getElementById("quiz-unlock-btn");

                if (scoreIndicator) {
                    scoreIndicator.textContent = `${score} / 6 Control Indicators`;
                }

                if (score >= 3) {
                    quizDiagnosis.innerHTML = `
                        <h4 class="font-headline-sm text-primary font-bold mb-1.5">High Likelihood of Misclassification</h4>
                        <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                            Your working relationship satisfies <strong>${score} of 6</strong> employee control criteria (behavioral direction, equipment provision, or core business integration). Under state labor tests, you have strong grounds to request a W-2 wage audit and claim UI benefits.
                        </p>
                    `;
                } else {
                    quizDiagnosis.innerHTML = `
                        <h4 class="font-headline-sm text-primary font-bold mb-1.5">Moderate / Low Control Indicators</h4>
                        <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                            You selected <strong>${score} of 6</strong> indicators. While traditional contractors are excluded from UI, strict <strong>ABC Test</strong> states (like CA, MA, NJ, WA) still classify workers as employees if your work was in the company's core line of business.
                        </p>
                    `;
                }

                if (quizUnlockBtn) {
                    quizUnlockBtn.onclick = () => {
                        quizModal.classList.add("hidden");
                        quizModal.classList.remove("flex");
                        generateDispute("1099");
                    };
                }
            }
        });
    }

    window.startDisputeRestructuring = () => generateDispute("cause");
    window.startDispute1099 = () => generateDispute("1099");
    window.startDisputeWages = () => generateDispute("wages");
}

function renderDisputes() {
    const list = document.getElementById("disputes-list");
    const countBadge = document.getElementById("disputes-count-badge");
    if (countBadge) {
        countBadge.textContent = `${state.disputes.length} Active ${state.disputes.length === 1 ? "Case" : "Cases"}`;
    }
    if (!list) return;

    if (state.disputes.length === 0) {
        list.innerHTML = `
            <div class="p-6 text-center text-on-surface-variant bg-surface rounded-lg border border-outline-variant/50">
                <p class="text-sm font-semibold text-primary">No active disputes saved</p>
                <p class="text-xs text-outline mt-1">Use one of the generators below to draft and track an appeal letter.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = state.disputes.map(d => `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface rounded-lg border border-surface-variant hover:shadow-[0px_4px_12px_rgba(30,41,59,0.05)] transition-shadow gap-3">
            <div>
                <div class="flex flex-wrap items-center gap-2 mb-1">
                    <span class="font-label-md text-sm text-primary font-bold">${escapeHtml(d.id)}: ${escapeHtml(d.type)}</span>
                    <span class="bg-[#dce9ff] text-[#0b1c30] font-label-sm text-xs px-2.5 py-0.5 rounded-full whitespace-nowrap font-semibold">${escapeHtml(d.status)}</span>
                </div>
                <p class="font-label-sm text-outline text-xs">Created ${escapeHtml(d.date)} • ${escapeHtml(d.explanation)}</p>
            </div>
            <div class="w-full sm:w-auto flex items-center gap-3">
                <div class="w-24 h-[5px] bg-surface-variant rounded-full overflow-hidden hidden md:block">
                    <div class="h-full bg-secondary" style="width: ${Number(d.progress) || 25}%"></div>
                </div>
                <button onclick="viewActiveDispute('${escapeHtml(d.id)}')" class="text-secondary hover:text-primary font-label-md text-xs font-bold px-3 py-1.5 rounded border border-outline-variant bg-white hover:bg-surface-container transition-colors shrink-0">
                    Open Letter
                </button>
                <button onclick="deleteActiveDispute('${escapeHtml(d.id)}')" title="Delete dispute" class="text-outline hover:text-error p-1.5 rounded hover:bg-error-container/30 transition-colors">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
            </div>
        </div>
    `).join("");
}

window.deleteActiveDispute = function(caseId) {
    state.disputes = state.disputes.filter(d => d.id !== caseId);
    renderDisputes();
    saveStateToStorage();
    showToast(`Removed ${caseId} from tracker.`, "info");
};

// 5. Dispute Letter Generator
function generateDispute(type, existingLetterOverride = null) {
    const validType = ["cause", "1099", "wages"].includes(type) ? type : "cause";
    state.currentDisputeType = validType;

    window.navigateToSection("editor");

    const templateSelect = document.getElementById("editor-template-type");
    if (templateSelect) templateSelect.value = validType;

    const stateObj = stateRules[state.selectedState] || stateRules.FL;
    const dateFormatted = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const sepDateObj = window.rulesEngine.parseLocalDate(state.separationDate) || new Date();
    const sepDateFormatted = sepDateObj.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const empNameEl = document.getElementById("input-emp-name");
    const companyNameEl = document.getElementById("input-company-name");
    const managerNameEl = document.getElementById("input-manager-name");

    const empName = (empNameEl && empNameEl.value.trim()) ? empNameEl.value.trim() : (state.userName || "Jane Doe");
    const companyName = (companyNameEl && companyNameEl.value.trim()) ? companyNameEl.value.trim() : (state.companyName || "Stitch Tech Systems, Inc.");
    const managerName = (managerNameEl && managerNameEl.value.trim()) ? managerNameEl.value.trim() : (state.managerName || "Director of Human Resources");

    state.userName = empName;
    state.companyName = companyName;
    state.managerName = managerName;
    syncProfileUI();

    const benefitEstimate = window.rulesEngine.calcWba(
        state.selectedState,
        state.q1Wage,
        state.q2Wage,
        state.q3Wage,
        state.q4Wage,
        false
    );

    let letterTitle = "";
    let letterContent = "";

    if (validType === "cause") {
        letterTitle = "Misclassification of Separation Cause (Restructuring Layoff)";
        letterContent = `${dateFormatted}

State Unemployment Insurance Appeals Division
State of ${stateObj.name}
CC: ${managerName}, ${companyName}

SUBJECT: Formal Separation Classification Appeal – ${empName}
Claimant Name: ${empName}
SSN / Claimant ID: [XXX-XX-XXXX]
Former Employer: ${companyName}
Employer Representative: ${managerName}
Separation Date: ${sepDateFormatted}

To the Unemployment Determination & Appeals Officer,

I am writing to formally contest the characterization of my separation from ${companyName} on ${sepDateFormatted} as a termination "for cause."

My separation was the direct result of an organizational restructuring and workforce reduction, not willful misconduct. Prior to my separation, my role was eliminated as part of a broader departmental realignment communicated by ${managerName}.

Under ${stateObj.name} Unemployment Insurance law, a claimant separated due to lack of work, layoff, or position elimination is entitled to full benefits unless the employer satisfies the statutory burden of proof demonstrating deliberate, willful misconduct connected with the work. General restructuring or role elimination does not constitute disqualifying misconduct.

Enclosed are copies of my separation documentation and base period wage records ($${benefitEstimate.totalWages.toLocaleString()} across 4 quarters, qualifying for ${stateObj.name}'s $${benefitEstimate.potentialWbaIfReclassified}/wk benefit rate). I respectfully request an immediate redetermination of my eligibility and release of benefits effective ${sepDateFormatted}.

Sincerely,

${empName}
[Signature of ${empName}]`;
    } else if (validType === "1099") {
        letterTitle = "1099 Worker Misclassification & Wage Audit Request";
        letterContent = `${dateFormatted}

State Department of Labor & Workforce Development
Unemployment Insurance Tax & Determinations Unit
State of ${stateObj.name}

SUBJECT: Request for Worker Classification Audit & Wage Credit (1099-NEC to W-2)
Claimant Name: ${empName}
SSN / Claimant ID: [XXX-XX-XXXX]
Hiring Entity: ${companyName}
Supervisor / Point of Contact: ${managerName}
Separation Date: ${sepDateFormatted}

To the Determination & Tax Audit Officer,

I am formally requesting an investigation and monetary redetermination regarding my employment status with ${companyName} through ${sepDateFormatted}. Although ${companyName} issued Form 1099-NEC for my services, the actual working relationship satisfied the legal criteria for covered W-2 employment under ${stateObj.name} labor standards:

1. Behavioral & Schedule Control: ${managerName} and ${companyName} directed my daily work schedule, assigned and prioritized tasks, and required regular attendance at internal team meetings.
2. Equipment & Systems: I performed my duties using company-designated software, credentials, and operational workflows rather than operating an independent trade or business.
3. Core Business Integration: The services I performed were a core, ongoing component of ${companyName}'s primary business operations rather than a standalone outside project.

Because of this misclassification, my base period earnings of $${benefitEstimate.totalWages.toLocaleString()} (Q1: $${state.q1Wage.toLocaleString()}, Q2: $${state.q2Wage.toLocaleString()}, Q3: $${state.q3Wage.toLocaleString()}, Q4: $${state.q4Wage.toLocaleString()}) were not reported to ${stateObj.name}'s Unemployment Trust Fund. I request that the agency audit my employment relationship, credit these wages to my base period, and establish my weekly benefit amount of $${benefitEstimate.potentialWbaIfReclassified}/wk.

Attached are copies of my 1099-NEC statements, work logs, and written communications from ${managerName}.

Sincerely,

${empName}
[Signature of ${empName}]`;
    } else {
        letterTitle = "Base Period Wage Record Correction & Monetary Reconsideration";
        letterContent = `${dateFormatted}

State Unemployment Insurance Monetary Determinations Unit
State of ${stateObj.name}

SUBJECT: Request for Base Period Monetary Reconsideration – ${empName}
Claimant Name: ${empName}
SSN / Claimant ID: [XXX-XX-XXXX]
Employer of Record: ${companyName} (Attn: ${managerName})
Separation Date: ${sepDateFormatted}

To Whom It May Concern,

I am writing to request a Monetary Reconsideration of my Unemployment Insurance Wage Determination Notice. The quarterly wages currently reflected in my initial determination do not accurately capture my full covered earnings from ${companyName}.

According to my W-2 and payroll records, my actual base period earnings are as follows:
- Quarter 1 Wages: $${state.q1Wage.toLocaleString()}
- Quarter 2 Wages: $${state.q2Wage.toLocaleString()}
- Quarter 3 Wages: $${state.q3Wage.toLocaleString()}
- Quarter 4 Wages: $${state.q4Wage.toLocaleString()}
- Total Base Period Earnings: $${benefitEstimate.totalWages.toLocaleString()} (High Quarter: $${benefitEstimate.highQuarter.toLocaleString()})

If my most recent quarter's wages fall outside the standard base period, I also formally request evaluation under ${stateObj.name}'s Alternate Base Period (ABP) provisions. Based on these verified earnings, my claim qualifies for a Weekly Benefit Amount of $${benefitEstimate.potentialWbaIfReclassified}/wk for up to ${benefitEstimate.maxWeeks} weeks.

Please find attached my W-2 forms and final pay stubs.

Sincerely,

${empName}
[Signature of ${empName}]`;
    }

    if (existingLetterOverride) {
        letterContent = existingLetterOverride;
    }

    state.currentDisputeLetter = letterContent;
    saveStateToStorage();

    const editorTextarea = document.getElementById("letter-editor-text");
    if (editorTextarea) {
        editorTextarea.value = letterContent;
    }

    const editorTitle = document.getElementById("editor-title-text");
    if (editorTitle) {
        editorTitle.textContent = letterTitle;
    }
}

// 6. Dispute Letter Editor UI Controller
function initDisputeLetterEditor() {
    const editorTextarea = document.getElementById("letter-editor-text");
    const saveLetterBtn = document.getElementById("save-letter-btn");
    const downloadTxtBtn = document.getElementById("download-txt-btn");
    const copyLetterBtn = document.getElementById("copy-letter-btn");
    const printLetterBtn = document.getElementById("print-letter-btn");
    const reapplyBtn = document.getElementById("reapply-template-btn");
    const templateTypeSelect = document.getElementById("editor-template-type");

    if (editorTextarea) {
        editorTextarea.addEventListener("input", (e) => {
            state.currentDisputeLetter = e.target.value;
            saveStateToStorage();
        });
    }

    if (templateTypeSelect) {
        templateTypeSelect.addEventListener("change", (e) => {
            generateDispute(e.target.value);
            showToast("Switched dispute letter template.", "info");
        });
    }

    if (reapplyBtn) {
        reapplyBtn.addEventListener("click", () => {
            const selectedType = templateTypeSelect ? templateTypeSelect.value : state.currentDisputeType;
            generateDispute(selectedType);
            showToast("Updated template with your customized claimant and employer details!");
        });
    }

    if (saveLetterBtn) {
        saveLetterBtn.addEventListener("click", () => {
            const newCaseId = `Case #${Math.floor(Math.random() * 800 + 100)}-A`;
            const typeMap = {
                cause: "Restructuring Appeal",
                "1099": "1099 Misclassification",
                wages: "Base Period Wage Appeal"
            };

            const newDispute = {
                id: newCaseId,
                type: typeMap[state.currentDisputeType] || "Separation Appeal",
                templateType: state.currentDisputeType,
                date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                status: "Ready to Submit",
                progress: 25,
                explanation: `Prepared for ${stateRules[state.selectedState].name} UI Division`,
                letterContent: state.currentDisputeLetter
            };

            state.disputes.unshift(newDispute);
            renderDisputes();
            saveStateToStorage();
            showToast(`Saved ${newCaseId} to your Active Disputes tracker!`);
            window.navigateToSection("advocacy");
        });
    }

    if (copyLetterBtn) {
        copyLetterBtn.addEventListener("click", () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(state.currentDisputeLetter)
                    .then(() => showToast("Dispute letter copied to clipboard!"))
                    .catch(() => showToast("Failed to copy letter.", "error"));
            } else if (editorTextarea) {
                editorTextarea.select();
                document.execCommand("copy");
                showToast("Dispute letter copied to clipboard!");
            }
        });
    }

    if (downloadTxtBtn) {
        downloadTxtBtn.addEventListener("click", () => {
            const blob = new Blob([state.currentDisputeLetter], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `UI_Runway_Dispute_${state.selectedState}_${state.currentDisputeType}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast("Downloaded dispute letter (.txt)!");
        });
    }

    if (printLetterBtn) {
        printLetterBtn.addEventListener("click", () => {
            const printWindow = window.open("", "_blank");
            if (!printWindow) {
                showToast("Pop-up blocked. Please allow pop-ups to print.", "error");
                return;
            }
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Print Dispute Letter - ${escapeHtml(state.userName)}</title>
                    <style>
                        body { font-family: Georgia, 'Times New Roman', serif; max-width: 700px; margin: 40px auto; padding: 20px; line-height: 1.65; white-space: pre-wrap; color: #111; font-size: 13pt; }
                    </style>
                </head>
                <body>${escapeHtml(state.currentDisputeLetter)}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        });
    }
}

window.viewActiveDispute = function(caseId) {
    const dispute = state.disputes.find(d => d.id === caseId);
    if (!dispute) return;

    const inferredType = dispute.templateType || (dispute.type.includes("1099") ? "1099" : dispute.type.includes("Wage") ? "wages" : "cause");
    generateDispute(inferredType, dispute.letterContent || null);
};

// 7. Secure Document Vault UI Controller
function initVault() {
    const vaultModal = document.getElementById("vault-modal");
    const closeVaultBtn = document.getElementById("close-vault-btn");
    const closeVaultFooterBtn = document.getElementById("close-vault-footer-btn");

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

    if (closeVaultBtn) closeVaultBtn.addEventListener("click", () => window.closeVault());
    if (closeVaultFooterBtn) closeVaultFooterBtn.addEventListener("click", () => window.closeVault());

    window.importVaultDocument = function(id) {
        const item = state.vault.find(doc => doc.id === id);
        if (!item) return;

        const existing = state.uploads.find(u => u.name === item.name);
        if (existing) {
            state.selectedUploadId = existing.id;
            simulateParsing(existing);
            window.closeVault();
            showToast(`Re-applied parameters from "${item.name}".`, "info");
            return;
        }

        const newUpload = {
            id: Date.now(),
            name: item.name,
            size: item.size,
            date: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "Analyzing",
            type: item.name.split(".").pop().toLowerCase(),
            text: item.text
        };

        state.uploads.unshift(newUpload);
        state.selectedUploadId = newUpload.id;
        renderUploads();
        window.closeVault();

        setTimeout(() => {
            simulateParsing(newUpload);
            showToast(`Imported & analyzed "${item.name}" from Vault!`);
        }, 450);
    };

    renderVault();
}

function renderVault() {
    const list = document.getElementById("vault-list");
    if (!list) return;

    list.innerHTML = state.vault.map(item => {
        const icon = item.name.endsWith(".pdf") ? "picture_as_pdf" : "description";
        return `
            <div onclick="importVaultDocument('${escapeHtml(item.id)}')" 
                 class="border border-outline-variant bg-surface-container-lowest p-4 rounded-xl hover:border-[#0D9488] hover:bg-surface-container-low transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-[#eff4ff] text-[#0D9488] flex items-center justify-center rounded-lg border border-[#dce9ff] group-hover:bg-[#dce9ff] transition-colors shrink-0">
                        <span class="material-symbols-outlined">${icon}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-label-md text-on-surface font-bold text-sm text-primary mb-1 group-hover:text-[#0D9488] transition-colors truncate">${escapeHtml(item.name)}</h4>
                        <p class="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">${escapeHtml(item.description)}</p>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-outline-variant/30 flex justify-between items-center text-[11px] text-outline font-semibold">
                    <span>${escapeHtml(item.date)} • ${escapeHtml(item.size)}</span>
                    <span class="flex items-center gap-1 text-[#0d9488] font-bold group-hover:text-primary transition-colors">
                        Import &amp; Parse <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                </div>
            </div>
        `;
    }).join("");
}

// 8. Settings & Support Modal Controllers
window.saveProfileSettings = function() {
    const nameInput = document.getElementById("settings-user-name");
    const companyInput = document.getElementById("settings-company-name");
    if (nameInput && nameInput.value.trim()) state.userName = nameInput.value.trim();
    if (companyInput && companyInput.value.trim()) state.companyName = companyInput.value.trim();
    syncProfileUI();
    saveStateToStorage();
    showToast("Claimant profile preferences saved!");
};

window.clearLocalSessionData = function() {
    localStorage.removeItem(STORAGE_KEY);
    state = getDefaultState();
    syncProfileUI();
    syncRoadmapInputsFromState();
    renderUploads();
    renderTranslationPreview(null);
    renderDisputes();
    updateCalculations();
    updateSettingsStats();

    const banner = document.getElementById("intake-extraction-banner");
    if (banner) banner.classList.add("hidden");

    showToast("Local session wiped and reset to factory defaults.", "info");
};

function updateSettingsStats() {
    const statsEl = document.getElementById("settings-storage-stats");
    if (!statsEl) return;
    const stateObj = stateRules[state.selectedState] || stateRules.FL;
    statsEl.innerHTML = `
        <div class="flex justify-between"><span>Active Jurisdiction:</span><strong class="text-primary">${escapeHtml(stateObj.name)} (${escapeHtml(state.selectedState)})</strong></div>
        <div class="flex justify-between"><span>Uploaded Documents in Memory:</span><strong class="text-primary">${state.uploads.length}</strong></div>
        <div class="flex justify-between"><span>Saved Active Disputes:</span><strong class="text-primary">${state.disputes.length}</strong></div>
        <div class="flex justify-between"><span>Browser Persistence:</span><strong class="text-secondary">Synced (${STORAGE_KEY})</strong></div>
    `;
}

window.openSupportModal = function() {
    const modal = document.getElementById("support-modal");
    const stateCard = document.getElementById("support-state-card");
    const currentStateObj = stateRules[state.selectedState] || stateRules.FL;

    if (stateCard) {
        stateCard.innerHTML = `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-secondary block">Your Selected State</span>
                    <h4 class="font-bold text-base text-primary">${escapeHtml(currentStateObj.name)} Unemployment Agency</h4>
                    <p class="text-xs text-on-surface-variant mt-0.5">Max WBA: <strong>$${currentStateObj.maxWba}/wk</strong> • Duration: <strong>Up to ${currentStateObj.maxWeeks} weeks</strong></p>
                </div>
                <a href="${escapeHtml(currentStateObj.portalUrl)}" target="_blank" rel="noopener noreferrer" class="bg-secondary hover:bg-[#0F766E] text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 shrink-0 w-fit shadow-sm">
                    <span>File Claim in ${escapeHtml(state.selectedState)}</span>
                    <span class="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>
            </div>
        `;
    }

    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
};

window.closeSupportModal = function() {
    const modal = document.getElementById("support-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
};

// Sleek Toast Notification System
function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `p-4 rounded-lg shadow-lg border text-white font-label-md flex items-center gap-2 transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto max-w-sm ${
        type === "success"
            ? "bg-[#006a61] border-[#86f2e4]"
            : type === "error"
                ? "bg-[#ba1a1a] border-[#ffb4ab]"
                : "bg-primary border-outline-variant"
    }`;

    const icon = type === "success" ? "check_circle" : type === "error" ? "error" : "info";
    toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">${icon}</span>
        <span class="text-xs font-semibold">${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
    }, 10);

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-[-10px]");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}
