# UI Runway - Product Design Breakdown

## 1. The "Safe Landing" Intake Portal
The initial onboarding needs to be extremely low-friction to avoid overwhelming an already stressed user.
* **The Dropzone:** A secure drag-and-drop interface for users to upload their termination letters, severance packages, and historical W-2/1099 data.
* **Instant Translation:** The AI engine processes the uploads and instantly translates the complex, state-specific legal jargon into plain language.

## 2. The Financial Roadmap Dashboard
This is the core value proposition of the app, visualizing the user's financial reality over the coming months.
* **The Severance Clock:** Displays a countdown clock calculating the exact date they become legally eligible to file.
* **State-Adjusted Benefit Estimator:** Estimates weekly benefit amount based on specific state caps (e.g., flagging Florida's $275/week cap).
* **Base Period Validator:** Analyzes tax documents to ensure the user meets earnings and hours thresholds.

## 3. The Advocacy & Action Center
Helping users navigate eligibility disputes and identifying 1099 loopholes.
* **Dispute Generator:** Automated generator for "Eligibility Disputes" if a layoff is misclassified.
* **The 1099 Reality Check:** Identifies if a user falls into the 1099 loophole (not covered by traditional UI).

## Core Architecture
* **Document Parser:** Ingests PDFs/images to extract key dates and income.
* **State Rules Database:** Source of truth for 50 states (caps, base periods, etc.).
* **Eligibility Engine:** Formulates timelines and estimated payouts.
* **Document Generator:** Compiles legally sound templates for dispute letters.