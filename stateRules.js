// 50-State Unemployment Insurance Rules Database for UI Runway

const stateRules = {
    AL: {
        code: "AL",
        name: "Alabama",
        maxWba: 275,
        minWba: 45,
        maxWeeks: 14,
        severanceRule: {
            type: "delay",
            description: "Severance pay is treated as wages. Filing eligibility is delayed for the duration of the severance coverage period."
        },
        minWages: 2334,
        formula: "1/26 of the average of the two highest quarters in the base period."
    },
    AK: {
        code: "AK",
        name: "Alaska",
        maxWba: 370, // excluding dependent allowances
        minWba: 56,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "Severance pay does not affect or delay your weekly unemployment benefit eligibility."
        },
        minWages: 2500,
        formula: "Based on a state schedule of total base period wages."
    },
    AZ: {
        code: "AZ",
        name: "Arizona",
        maxWba: 320,
        minWba: 120,
        maxWeeks: 26,
        severanceRule: {
            type: "delay",
            description: "Severance pay allocated as salary continuation delays the start of your benefits for that period."
        },
        minWages: 4680, // 390 times minimum wage in high quarter
        formula: "4% of high quarter earnings."
    },
    AR: {
        code: "AR",
        name: "Arkansas",
        maxWba: 451,
        minWba: 81,
        maxWeeks: 16,
        severanceRule: {
            type: "reduce",
            description: "Severance reduces the weekly benefit amount dollar-for-dollar for the weeks it covers."
        },
        minWages: 2200,
        formula: "1/26 of high quarter earnings."
    },
    CA: {
        code: "CA",
        name: "California",
        maxWba: 450,
        minWba: 40,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "Under California law, severance payments do not reduce or delay state unemployment benefits."
        },
        minWages: 1300, // or $900 in high quarter plus total 1.25x high quarter
        formula: "Based on high quarter wages (roughly 1/26 of high quarter earnings)."
    },
    CO: {
        code: "CO",
        name: "Colorado",
        maxWba: 742,
        minWba: 25,
        maxWeeks: 26,
        severanceRule: {
            type: "delay",
            description: "Severance payments delay the start of unemployment benefit payments. The delay matches the number of weeks paid."
        },
        minWages: 2500,
        formula: "60% of 1/26 of total base period wages, or 50% of high quarter wages."
    },
    CT: {
        code: "CT",
        name: "Connecticut",
        maxWba: 703,
        minWba: 15,
        maxWeeks: 26,
        severanceRule: {
            type: "delay",
            description: "Severance package payments delay benefits for the weeks designated by the employer."
        },
        minWages: 2000, // 40 times min WBA
        formula: "1/26 of average of two highest quarters."
    },
    DE: {
        code: "DE",
        name: "Delaware",
        maxWba: 400,
        minWba: 20,
        maxWeeks: 26,
        severanceRule: {
            type: "none", // if lump sum, continuation might delay
            description: "Lump sum severance does not offset. Regular salary continuation severance will delay eligibility."
        },
        minWages: 1440, // 36 times WBA
        formula: "1/46 of total of two highest quarters."
    },
    FL: {
        code: "FL",
        name: "Florida",
        maxWba: 275,
        minWba: 32,
        maxWeeks: 12, // Florida has a variable duration between 12-23 based on state unemployment rate
        severanceRule: {
            type: "delay",
            description: "Florida law explicitly delays benefits during weeks covered by severance. You cannot collect UI while receiving severance."
        },
        minWages: 3400,
        formula: "1/26 of high quarter wages, capped at a historically low $275/week."
    },
    GA: {
        code: "GA",
        name: "Georgia",
        maxWba: 365,
        minWba: 55,
        maxWeeks: 14, // variable up to 20, currently 14
        severanceRule: {
            type: "none", // unless salary continuation
            description: "Unconditional severance does not delay benefits. Salary continuation where you remain on payroll will delay filing."
        },
        minWages: 2600,
        formula: "1/21 of high quarter wages."
    },
    HI: {
        code: "HI",
        name: "Hawaii",
        maxWba: 763,
        minWba: 5,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "Severance pay does not disqualify or offset weekly benefit payments in Hawaii."
        },
        minWages: 1500,
        formula: "1/21 of high quarter earnings."
    },
    ID: {
        code: "ID",
        name: "Idaho",
        maxWba: 532,
        minWba: 72,
        maxWeeks: 26, // variable 20-26
        severanceRule: {
            type: "reduce",
            description: "Severance is treated as wages and will reduce or entirely offset benefits during the weeks it is paid."
        },
        minWages: 1872,
        formula: "1/26 of high quarter earnings."
    },
    IL: {
        code: "IL",
        name: "Illinois",
        maxWba: 585,
        minWba: 51,
        maxWeeks: 26,
        severanceRule: {
            type: "none", // lump sum is fine, continuation delays
            description: "Lump sum severance package with a release of claims does not offset benefits. Payroll continuation delays filing."
        },
        minWages: 1600,
        formula: "47% of average weekly wage in the two highest quarters."
    },
    IN: {
        code: "IN",
        name: "Indiana",
        maxWba: 390,
        minWba: 50,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance reduces weekly benefit amounts dollar-for-dollar. If severance exceeds the WBA, you are ineligible that week."
        },
        minWages: 4200,
        formula: "47% of the high quarter wages."
    },
    IA: {
        code: "IA",
        name: "Iowa",
        maxWba: 582,
        minWba: 87,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance is treated as wages and will reduce benefits dollar-for-dollar during the covered period."
        },
        minWages: 3700,
        formula: "1/23 of high quarter earnings (roughly)."
    },
    KS: {
        code: "KS",
        name: "Kansas",
        maxWba: 560,
        minWba: 140,
        maxWeeks: 26, // 16-26 weeks
        severanceRule: {
            type: "delay",
            description: "Severance pay allocated to weeks after separation delays eligibility for the duration of the severance period."
        },
        minWages: 3500,
        formula: "4.25% of high quarter earnings."
    },
    KY: {
        code: "KY",
        name: "Kentucky",
        maxWba: 626,
        minWba: 39,
        maxWeeks: 12, // variable 12-24 weeks
        severanceRule: {
            type: "reduce",
            description: "Severance pay counts as disqualifying income and reduces weekly UI benefits for the coverage weeks."
        },
        minWages: 1500,
        formula: "1.305% of base period wages."
    },
    LA: {
        code: "LA",
        name: "Louisiana",
        maxWba: 275,
        minWba: 10,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance is deducted from weekly benefit payments. If severance is larger than WBA, weekly benefit is $0."
        },
        minWages: 1200,
        formula: "1/25 of high quarter wages multiplied by 1.05."
    },
    ME: {
        code: "ME",
        name: "Maine",
        maxWba: 545,
        minWba: 83,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance exceeding $100 per week is deducted from the weekly benefit payment."
        },
        minWages: 5400,
        formula: "1/22 of high quarter earnings."
    },
    MD: {
        code: "MD",
        name: "Maryland",
        maxWba: 430,
        minWba: 50,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance is allocated to weeks following separation and offsets your weekly benefit payment."
        },
        minWages: 1800,
        formula: "Based on high quarter wages from a state schedule."
    },
    MA: {
        code: "MA",
        name: "Massachusetts",
        maxWba: 1015,
        minWba: 36,
        maxWeeks: 26, // up to 30 weeks during high unemployment
        severanceRule: {
            type: "reduce", // offsets unless plant closing or release of claims exception
            description: "Severance offsets benefits unless paid under a severance agreement releasing legal claims or due to plant closings."
        },
        minWages: 6000,
        formula: "1/26 of high quarter wages (roughly)."
    },
    MI: {
        code: "MI",
        name: "Michigan",
        maxWba: 362,
        minWba: 133,
        maxWeeks: 20,
        severanceRule: {
            type: "delay",
            description: "Severance salary continuation delays benefits. If it's a lump sum with a legal waiver, it may be exempt."
        },
        minWages: 3800,
        formula: "4.1% of high quarter wages plus $6 per dependent (up to 5)."
    },
    MN: {
        code: "MN",
        name: "Minnesota",
        maxWba: 820,
        minWba: 100,
        maxWeeks: 26,
        severanceRule: {
            type: "delay",
            description: "Severance pay delays the start of benefits. Severance is divided by your regular wage to calculate delay weeks."
        },
        minWages: 3000,
        formula: "50% of average weekly wage, up to the maximum cap."
    },
    MS: {
        code: "MS",
        name: "Mississippi",
        maxWba: 235,
        minWba: 30,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "Mississippi does not reduce or delay unemployment benefits because of severance pay."
        },
        minWages: 1200,
        formula: "1/26 of high quarter wages."
    },
    MO: {
        code: "MO",
        name: "Missouri",
        maxWba: 320,
        minWba: 45,
        maxWeeks: 20,
        severanceRule: {
            type: "reduce",
            description: "Severance pay reduces weekly benefit payments. If severance is higher than your WBA, you will receive $0."
        },
        minWages: 2250,
        formula: "4% of high quarter wages."
    },
    MT: {
        code: "MT",
        name: "Montana",
        maxWba: 657,
        minWba: 181,
        maxWeeks: 28,
        severanceRule: {
            type: "reduce",
            description: "Severance pay is allocated to the weeks covered and reduces or offsets your UI payment."
        },
        minWages: 2900,
        formula: "1% of total base period wages, or 1.9% if higher."
    },
    NE: {
        code: "NE",
        name: "Nebraska",
        maxWba: 514,
        minWba: 70,
        maxWeeks: 26,
        severanceRule: {
            type: "delay",
            description: "Severance pay acts as weekly earnings and delays filing eligibility for the weeks it represents."
        },
        minWages: 4500,
        formula: "1/26 of high quarter wages."
    },
    NV: {
        code: "NV",
        name: "Nevada",
        maxWba: 585,
        minWba: 46,
        maxWeeks: 26,
        severanceRule: {
            type: "none", // if lump sum. continuation delays
            description: "Lump sum severance does not delay benefits. Salary continuation delays filing for the covered period."
        },
        minWages: 4000,
        formula: "1/25 of high quarter wages."
    },
    NH: {
        code: "NH",
        name: "New Hampshire",
        maxWba: 427,
        minWba: 32,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance pay is deducted from weekly benefits. If severance matches or exceeds WBA, benefits are $0."
        },
        minWages: 2800,
        formula: "Based on total annual base period wages from state charts."
    },
    NJ: {
        code: "NJ",
        name: "New Jersey",
        maxWba: 854,
        minWba: 120,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "New Jersey does not offset or delay unemployment benefit eligibility due to severance payments."
        },
        minWages: 8300, // or 20 base weeks earning minimum amount
        formula: "60% of average weekly wage."
    },
    NM: {
        code: "NM",
        name: "New Mexico",
        maxWba: 511,
        minWba: 90,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance payments are treated as wages and reduce weekly benefits dollar-for-dollar."
        },
        minWages: 2000,
        formula: "1/26 of high quarter wages."
    },
    NY: {
        code: "NY",
        name: "New York",
        maxWba: 504,
        minWba: 132,
        maxWeeks: 26,
        severanceRule: {
            type: "custom",
            description: "Severance delays benefits ONLY if paid within 30 days of termination AND the weekly severance amount exceeds the state maximum weekly benefit ($504)."
        },
        minWages: 3200,
        formula: "1/26 of high quarter earnings if high quarter exceeds $3,575; otherwise 1/25."
    },
    NC: {
        code: "NC",
        name: "North Carolina",
        maxWba: 350,
        minWba: 15,
        maxWeeks: 12, // Variable 12-20, currently capped at 12
        severanceRule: {
            type: "delay",
            description: "Severance delays your filing date. You must wait to file until the severance coverage period ends."
        },
        minWages: 3000,
        formula: "Total base period wages divided by 52."
    },
    ND: {
        code: "ND",
        name: "North Dakota",
        maxWba: 673,
        minWba: 43,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance is allocated to weekly periods and offsets benefits dollar-for-dollar."
        },
        minWages: 2795,
        formula: "1/65 of total of two highest quarters plus high quarter."
    },
    OH: {
        code: "OH",
        name: "Ohio",
        maxWba: 613, // up to 742+ with dependents
        minWba: 150,
        maxWeeks: 26,
        severanceRule: {
            type: "delay", // salary continuation; lump sum is none
            description: "Lump sum severance does not offset. Salary continuation delays filing for the covered weeks."
        },
        minWages: 5600, // must have 20 weeks earning at least $280/wk
        formula: "50% of average weekly wage."
    },
    OK: {
        code: "OK",
        name: "Oklahoma",
        maxWba: 539,
        minWba: 16,
        maxWeeks: 26,
        severanceRule: {
            type: "none", // if lump sum
            description: "Lump sum severance does not affect benefits. Continuation delays benefits week-for-week."
        },
        minWages: 1500,
        formula: "1/23 of high quarter wages."
    },
    OR: {
        code: "OR",
        name: "Oregon",
        maxWba: 780,
        minWba: 190,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "Severance pay is not considered disqualifying or deductible income. You can file immediately."
        },
        minWages: 1000,
        formula: "1.25% of total base period wages."
    },
    PA: {
        code: "PA",
        name: "Pennsylvania",
        maxWba: 605, // plus dependent allowances
        minWba: 68,
        maxWeeks: 26,
        severanceRule: {
            type: "custom",
            description: "Severance only offsets UI benefits if the total severance exceeds 40% of the state's average weekly wage (deductible threshold is currently $25,200). Amounts above this reduce WBA."
        },
        minWages: 3200,
        formula: "Based on high quarter wages (around 4% of high quarter)."
    },
    RI: {
        code: "RI",
        name: "Rhode Island",
        maxWba: 707, // excluding dependents
        minWba: 62,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "Severance pay does not delay or offset your weekly unemployment benefits in Rhode Island."
        },
        minWages: 3900,
        formula: "3.85% of high quarter earnings."
    },
    SC: {
        code: "SC",
        name: "South Carolina",
        maxWba: 326,
        minWba: 42,
        maxWeeks: 20,
        severanceRule: {
            type: "reduce",
            description: "Severance pay reduces weekly UI benefits. If severance matches or exceeds WBA, benefits are $0."
        },
        minWages: 1092,
        formula: "1/26 of high quarter wages."
    },
    SD: {
        code: "SD",
        name: "South Dakota",
        maxWba: 487,
        minWba: 28,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance pay is treated as wages and reduces weekly benefit amounts dollar-for-dollar."
        },
        minWages: 728,
        formula: "1/26 of high quarter wages."
    },
    TN: {
        code: "TN",
        name: "Tennessee",
        maxWba: 275,
        minWba: 30,
        maxWeeks: 12, // 12-26 weeks (currently 12 weeks max)
        severanceRule: {
            type: "reduce",
            description: "Severance is treated as wages and offsets weekly UI benefits for the covered period."
        },
        minWages: 1560,
        formula: "1/26 of average of two highest quarters."
    },
    TX: {
        code: "TX",
        name: "Texas",
        maxWba: 577,
        minWba: 86,
        maxWeeks: 26,
        severanceRule: {
            type: "delay",
            description: "Texas law delays unemployment benefits by the number of weeks paid in severance. You cannot collect UI during the severance period."
        },
        minWages: 2500, // must earn at least 37x WBA
        formula: "1/25 of high quarter wages."
    },
    UT: {
        code: "UT",
        name: "Utah",
        maxWba: 712,
        minWba: 38,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance reduces weekly benefit amounts. If severance exceeds WBA, benefits are $0 for those weeks."
        },
        minWages: 3800,
        formula: "1/26 of high quarter wages minus $5."
    },
    VT: {
        code: "VT",
        name: "Vermont",
        maxWba: 705,
        minWba: 94,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance offsets weekly benefit payments. If severance is larger than WBA, you receive $0 for that week."
        },
        minWages: 3400,
        formula: "1/45 of two highest quarters combined."
    },
    VA: {
        code: "VA",
        name: "Virginia",
        maxWba: 378,
        minWba: 60,
        maxWeeks: 12, // 12-26 weeks
        severanceRule: {
            type: "reduce",
            description: "Severance reduces weekly benefit amounts. Severance is allocated to weekly periods and deducted from UI benefits."
        },
        minWages: 3000,
        formula: "1/50 of the two highest quarters combined."
    },
    WA: {
        code: "WA",
        name: "Washington",
        maxWba: 1019,
        minWba: 317,
        maxWeeks: 26,
        severanceRule: {
            type: "none",
            description: "Washington State does not deduct severance payments from weekly benefits, nor does it delay eligibility."
        },
        minWages: 684, // must have worked 680 hours in base period
        formula: "3.85% of average of two highest quarters."
    },
    WV: {
        code: "WV",
        name: "West Virginia",
        maxWba: 424,
        minWba: 24,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance pay reduces weekly benefit amounts dollar-for-dollar for the duration of the severance period."
        },
        minWages: 2200,
        formula: "Based on total annual base period wages from state charts."
    },
    WI: {
        code: "WI",
        name: "Wisconsin",
        maxWba: 370,
        minWba: 54,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance pay reduces weekly benefit payments. If severance exceeds WBA, you are ineligible that week."
        },
        minWages: 3400,
        formula: "4% of high quarter wages."
    },
    WY: {
        code: "WY",
        name: "Wyoming",
        maxWba: 588,
        minWba: 43,
        maxWeeks: 26,
        severanceRule: {
            type: "reduce",
            description: "Severance reduces weekly benefits dollar-for-dollar. If severance exceeds WBA, benefits are $0."
        },
        minWages: 3600,
        formula: "4% of high quarter wages."
    }
};

// Calculations Helper
const rulesEngine = {
    // Calculates Weekly Benefit Amount based on quarterly wages and state
    calcWba: (stateCode, q1, q2, q3, q4) => {
        const state = stateRules[stateCode];
        if (!state) return 0;
        
        const quarters = [Number(q1) || 0, Number(q2) || 0, Number(q3) || 0, Number(q4) || 0];
        const highQuarter = Math.max(...quarters);
        
        let calculated = 0;
        if (stateCode === "AL") {
            // AL formula: 1/26 of average of two highest quarters
            const sorted = [...quarters].sort((a,b) => b-a);
            calculated = ((sorted[0] + sorted[1]) / 2) / 26;
        } else if (stateCode === "NC") {
            // NC formula: total base period wages / 52
            const total = quarters.reduce((a,b) => a+b, 0);
            calculated = total / 52;
        } else if (stateCode === "AK") {
            // Alaska uses total wages schedule, we simulate it
            const total = quarters.reduce((a,b) => a+b, 0);
            calculated = total * 0.015;
        } else if (stateCode === "NH" || stateCode === "WV") {
            // NH & WV use total wages schedule
            const total = quarters.reduce((a,b) => a+b, 0);
            calculated = total * 0.012;
        } else if (stateCode === "CT" || stateCode === "IL" || stateCode === "TN" || stateCode === "VT" || stateCode === "VA" || stateCode === "WA" || stateCode === "ND") {
            // Multi-quarter formula
            const sorted = [...quarters].sort((a,b) => b-a);
            const sumTwoHigh = sorted[0] + sorted[1];
            if (stateCode === "CT") calculated = sumTwoHigh / 52;
            else if (stateCode === "IL") calculated = (sumTwoHigh / 26) * 0.47;
            else if (stateCode === "TN") calculated = sumTwoHigh / 52;
            else if (stateCode === "VT") calculated = sumTwoHigh / 45;
            else if (stateCode === "VA") calculated = sumTwoHigh / 50;
            else if (stateCode === "WA") calculated = (sumTwoHigh / 2) * 0.0385;
            else if (stateCode === "ND") calculated = (sumTwoHigh + sorted[0]) / 65;
        } else {
            // Default High Quarter / 26 (or similar %)
            calculated = highQuarter / 26;
        }
        
        // Apply caps
        let finalWba = Math.round(calculated);
        if (finalWba < state.minWba) finalWba = state.minWba;
        if (finalWba > state.maxWba) finalWba = state.maxWba;
        
        return {
            calculated: Math.round(calculated),
            finalWba: finalWba,
            isCapped: finalWba === state.maxWba,
            highQuarter: highQuarter,
            totalWages: quarters.reduce((a,b) => a+b, 0),
            maxWeeks: state.maxWeeks,
            potentialPayout: finalWba * state.maxWeeks
        };
    },

    // Validates if wages meet base period eligibility criteria
    validateBasePeriod: (stateCode, q1, q2, q3, q4) => {
        const state = stateRules[stateCode];
        if (!state) return { eligible: false, reason: "Invalid State" };
        
        const quarters = [Number(q1) || 0, Number(q2) || 0, Number(q3) || 0, Number(q4) || 0];
        const activeQuarters = quarters.filter(q => q > 0).length;
        const totalWages = quarters.reduce((a,b) => a+b, 0);
        const highQuarter = Math.max(...quarters);
        
        // Rule 1: Wages in at least 2 quarters (standard in almost all states)
        if (activeQuarters < 2) {
            return {
                eligible: false,
                reason: "Insufficient quarters worked. Unemployment requires earnings in at least 2 base period quarters to demonstrate workforce attachment.",
                activeQuarters,
                totalWages
            };
        }
        
        // Rule 2: Minimum total base period wages
        if (totalWages < state.minWages) {
            return {
                eligible: false,
                reason: `Total base period earnings of $${totalWages.toLocaleString()} are below the state minimum requirement of $${state.minWages.toLocaleString()} for ${state.name}.`,
                activeQuarters,
                totalWages
            };
        }
        
        // Rule 3: 1.5x high quarter rule (standard check in many states to ensure distributed wages)
        if (totalWages < 1.5 * highQuarter) {
            return {
                eligible: false,
                reason: `Total wages ($${totalWages.toLocaleString()}) must be at least 1.5 times your highest quarter earnings ($${highQuarter.toLocaleString()}) to qualify. This ensures earnings were not concentrated in a single short period.`,
                activeQuarters,
                totalWages
            };
        }
        
        return {
            eligible: true,
            reason: `Qualified! Your base period earnings meet the minimum wage threshold ($${state.minWages}) and are distributed across quarters.`,
            activeQuarters,
            totalWages
        };
    },

    // Calculates the exact Severance Exhaustion Date and clock delay
    calculateSeveranceClock: (stateCode, separationDateStr, severanceAmount, severanceType, weeklyWage, customDelayWeeks) => {
        const state = stateRules[stateCode];
        if (!state) return null;
        
        const sepDate = new Date(separationDateStr);
        if (isNaN(sepDate.getTime())) return null;
        
        let delayWeeks = 0;
        let delayDays = 0;
        let explanation = "";
        
        // Determine delay duration
        if (severanceType === "weeks" && customDelayWeeks > 0) {
            delayWeeks = Number(customDelayWeeks);
        } else if (severanceType === "lump-sum" && severanceAmount > 0 && weeklyWage > 0) {
            delayWeeks = Math.ceil(severanceAmount / weeklyWage);
        }
        
        delayDays = delayWeeks * 7;
        
        // Calculate date of eligibility
        let eligibilityDate = new Date(sepDate);
        
        // Apply state laws
        if (state.severanceRule.type === "none") {
            // Eligible immediately (day after separation)
            eligibilityDate.setDate(sepDate.getDate() + 1);
            explanation = `${state.name} law does not delay or offset unemployment benefit claims due to severance. You are eligible to file immediately.`;
            delayDays = 0;
            delayWeeks = 0;
        } else if (state.severanceRule.type === "delay" || state.severanceRule.type === "reduce") {
            // Standard delay week-for-week
            eligibilityDate.setDate(sepDate.getDate() + delayDays + 1);
            explanation = `${state.name} law delays your filing eligibility by the duration of your severance coverage (${delayWeeks} weeks).`;
        } else if (state.severanceRule.type === "custom") {
            if (stateCode === "NY") {
                // NY: Only delays if severance is within 30 days and weekly severance > $504
                let weeklySev = weeklyWage;
                if (severanceType === "lump-sum" && delayWeeks > 0) {
                    weeklySev = severanceAmount / delayWeeks;
                }
                if (weeklySev > 504) {
                    eligibilityDate.setDate(sepDate.getDate() + delayDays + 1);
                    explanation = `New York: Severance exceeds the state benefit cap of $504/week and was paid within 30 days, causing a week-for-week filing delay of ${delayWeeks} weeks.`;
                } else {
                    eligibilityDate.setDate(sepDate.getDate() + 1);
                    explanation = `New York: Your weekly severance value ($${Math.round(weeklySev)}) is below the $504 cap. You are eligible to file immediately.`;
                    delayDays = 0;
                    delayWeeks = 0;
                }
            } else if (stateCode === "PA") {
                // PA: Only offsets above deductible threshold ($25,200)
                if (severanceAmount > 25200) {
                    const offsetAmount = severanceAmount - 25200;
                    const offsetWeeks = Math.ceil(offsetAmount / weeklyWage);
                    eligibilityDate.setDate(sepDate.getDate() + (offsetWeeks * 7) + 1);
                    explanation = `Pennsylvania: Severance exceeds the $25,200 threshold. The excess amount ($${offsetAmount.toLocaleString()}) delays your filing by ${offsetWeeks} weeks.`;
                    delayWeeks = offsetWeeks;
                    delayDays = offsetWeeks * 7;
                } else {
                    eligibilityDate.setDate(sepDate.getDate() + 1);
                    explanation = `Pennsylvania: Your severance ($${severanceAmount.toLocaleString()}) is below the $25,200 offset threshold. You can file immediately.`;
                    delayDays = 0;
                    delayWeeks = 0;
                }
            }
        }
        
        return {
            eligibilityDate: eligibilityDate.toISOString().split("T")[0],
            eligibilityDateFormatted: eligibilityDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
            delayWeeks,
            delayDays,
            explanation,
            severanceRuleType: state.severanceRule.type
        };
    }
};

// Export rules for browser compatibility
if (typeof module !== "undefined" && module.exports) {
    module.exports = { stateRules, rulesEngine };
} else {
    window.stateRules = stateRules;
    window.rulesEngine = rulesEngine;
}
