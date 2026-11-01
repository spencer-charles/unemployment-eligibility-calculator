// 50-State + D.C. Unemployment Insurance Rules Database & Financial Runway Engine for UI Runway

const stateRules = {
    AL: {
        code: "AL",
        name: "Alabama",
        maxWba: 275,
        minWba: 45,
        maxWeeks: 14,
        waitingWeek: true,
        portalUrl: "https://labor.alabama.gov/uc/",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Severance pay is treated as wages. Filing eligibility is delayed for the duration of the severance coverage period."
        },
        minWages: 2334,
        formula: "1/26 of the average of the two highest quarters in the base period."
    },
    AK: {
        code: "AK",
        name: "Alaska",
        maxWba: 370,
        minWba: 56,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://labor.alaska.gov/unemployment/",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
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
        waitingWeek: true,
        portalUrl: "https://des.az.gov/services/employment/unemployment-individual",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Severance pay allocated as salary continuation delays the start of your benefits for that period."
        },
        minWages: 4680,
        formula: "4% (1/25) of high quarter earnings."
    },
    AR: {
        code: "AR",
        name: "Arkansas",
        maxWba: 451,
        minWba: 81,
        maxWeeks: 16,
        waitingWeek: true,
        portalUrl: "https://www.dws.arkansas.gov/unemployment/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
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
        waitingWeek: true,
        portalUrl: "https://edd.ca.gov/unemployment/",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
            description: "Under California law, severance payments do not reduce or delay state unemployment benefits."
        },
        minWages: 1300,
        formula: "Based on high quarter wages (roughly 1/26 of high quarter earnings)."
    },
    CO: {
        code: "CO",
        name: "Colorado",
        maxWba: 742,
        minWba: 25,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://cdle.colorado.gov/unemployment",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Severance payments delay the start of unemployment benefit payments and reduce total entitlement weeks."
        },
        minWages: 2500,
        formula: "60% of 1/26 of two highest quarters, or 50% of 1/13 of high quarter wages."
    },
    CT: {
        code: "CT",
        name: "Connecticut",
        maxWba: 703,
        minWba: 15,
        maxWeeks: 26,
        waitingWeek: false,
        portalUrl: "https://portal.ct.gov/dol/Unemployed-Workers",
        severanceRule: {
            type: "delay",
            lumpSumExempt: true,
            description: "Severance package payments delay benefits for the weeks designated, unless signed with a release of legal claims."
        },
        minWages: 2000,
        formula: "1/26 of average of two highest quarters."
    },
    DE: {
        code: "DE",
        name: "Delaware",
        maxWba: 400,
        minWba: 20,
        maxWeeks: 26,
        waitingWeek: false,
        portalUrl: "https://ui.delawareworks.com/",
        severanceRule: {
            type: "delay",
            lumpSumExempt: true,
            description: "Lump sum severance does not offset benefits. Regular salary continuation severance will delay eligibility."
        },
        minWages: 1440,
        formula: "1/46 of total of two highest quarters."
    },
    DC: {
        code: "DC",
        name: "District of Columbia",
        maxWba: 444,
        minWba: 50,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://does.dc.gov/service/unemployment-compensation-process",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance pay reduces weekly unemployment benefits dollar-for-dollar during the weeks to which it is allocated."
        },
        minWages: 1950,
        formula: "1/26 of high quarter earnings."
    },
    FL: {
        code: "FL",
        name: "Florida",
        maxWba: 275,
        minWba: 32,
        maxWeeks: 12,
        waitingWeek: true,
        portalUrl: "https://www.floridajobs.org/Reemployment-Assistance-Service-Center/reemployment-assistance/claimants",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Florida law explicitly delays benefits during weeks covered by severance. You cannot collect UI while receiving severance."
        },
        minWages: 3400,
        formula: "1/26 of high quarter wages, capped at $275/week."
    },
    GA: {
        code: "GA",
        name: "Georgia",
        maxWba: 365,
        minWba: 55,
        maxWeeks: 14,
        waitingWeek: false,
        portalUrl: "https://dol.georgia.gov/unemployment-benefits",
        severanceRule: {
            type: "delay",
            lumpSumExempt: true,
            description: "Unconditional lump-sum severance does not delay benefits. Salary continuation where you remain on payroll delays filing."
        },
        minWages: 2600,
        formula: "1/21 of high quarter wages (or 1/42 of two highest quarters)."
    },
    HI: {
        code: "HI",
        name: "Hawaii",
        maxWba: 763,
        minWba: 5,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://huiclaims.hawaii.gov/",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
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
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.labor.idaho.gov/dnn/Unemployment-Benefits",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance is treated as wages and will reduce or entirely offset benefits during the weeks it is allocated."
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
        waitingWeek: true,
        portalUrl: "https://ides.illinois.gov/unemployment.html",
        severanceRule: {
            type: "delay",
            lumpSumExempt: true,
            description: "Lump sum severance package does not offset benefits. Active payroll salary continuation delays filing."
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
        waitingWeek: true,
        portalUrl: "https://www.in.gov/dwd/indiana-unemployment/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance reduces weekly benefit amounts dollar-for-dollar. If severance exceeds the WBA, you receive $0 that week."
        },
        minWages: 4200,
        formula: "4% of high quarter wages (capped at $390/wk)."
    },
    IA: {
        code: "IA",
        name: "Iowa",
        maxWba: 582,
        minWba: 87,
        maxWeeks: 16,
        waitingWeek: false,
        portalUrl: "https://workforce.iowa.gov/unemployment",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance is treated as wages and reduces benefits dollar-for-dollar during the covered period."
        },
        minWages: 3700,
        formula: "1/23 of high quarter earnings."
    },
    KS: {
        code: "KS",
        name: "Kansas",
        maxWba: 560,
        minWba: 140,
        maxWeeks: 16,
        waitingWeek: true,
        portalUrl: "https://www.getkansasbenefits.gov/",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
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
        maxWeeks: 12,
        waitingWeek: true,
        portalUrl: "https://kcc.ky.gov/career/If-you-are-Unemployed/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance pay counts as disqualifying income and reduces weekly UI benefits for the coverage weeks."
        },
        minWages: 1500,
        formula: "1.3078% of total base period wages."
    },
    LA: {
        code: "LA",
        name: "Louisiana",
        maxWba: 275,
        minWba: 10,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.laworks.net/UnemploymentInsurance/UI_MainMenu.asp",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance is deducted from weekly benefit payments. If severance is larger than WBA, weekly benefit is $0."
        },
        minWages: 1200,
        formula: "1/25 of average of four quarters multiplied by 1.05."
    },
    ME: {
        code: "ME",
        name: "Maine",
        maxWba: 545,
        minWba: 83,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.maine.gov/unemployment/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance pay allocated to weeks reduces the weekly benefit payment."
        },
        minWages: 5400,
        formula: "1/22 of average of two highest quarters."
    },
    MD: {
        code: "MD",
        name: "Maryland",
        maxWba: 430,
        minWba: 50,
        maxWeeks: 26,
        waitingWeek: false,
        portalUrl: "https://www.dllr.state.md.us/employment/unemployment.shtml",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance is allocated to weeks following separation and offsets your weekly benefit payment."
        },
        minWages: 1800,
        formula: "1/24 of high quarter wages."
    },
    MA: {
        code: "MA",
        name: "Massachusetts",
        maxWba: 1033,
        minWba: 36,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.mass.gov/orgs/department-of-unemployment-assistance",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: true,
            description: "Severance offsets benefits UNLESS paid with a signed release of legal claims (lump sum waiver) or due to plant closing."
        },
        minWages: 6000,
        formula: "50% of average weekly wage (roughly 1/26 of two highest quarters)."
    },
    MI: {
        code: "MI",
        name: "Michigan",
        maxWba: 362,
        minWba: 133,
        maxWeeks: 20,
        waitingWeek: false,
        portalUrl: "https://www.michigan.gov/leo/bureaus-agencies/uia",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance allocated to specific weeks reduces benefits for those weeks."
        },
        minWages: 3800,
        formula: "4.1% of high quarter wages."
    },
    MN: {
        code: "MN",
        name: "Minnesota",
        maxWba: 857,
        minWba: 100,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.uimn.org/",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Severance pay delays the start of benefits. Severance is divided by your regular weekly wage to calculate delay weeks."
        },
        minWages: 3000,
        formula: "50% of average weekly wage (1/26 of high quarter or 1/52 of base period)."
    },
    MS: {
        code: "MS",
        name: "Mississippi",
        maxWba: 235,
        minWba: 30,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://mdes.ms.gov/unemployment-claims/",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
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
        waitingWeek: false,
        portalUrl: "https://labor.mo.gov/des/unemployed-workers",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance pay reduces weekly benefit payments. If severance is higher than your WBA, you receive $0 for covered weeks."
        },
        minWages: 2250,
        formula: "4% of average of two highest quarters."
    },
    MT: {
        code: "MT",
        name: "Montana",
        maxWba: 657,
        minWba: 181,
        maxWeeks: 28,
        waitingWeek: true,
        portalUrl: "https://uid.dli.mt.gov/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance pay is allocated to the weeks covered and reduces or offsets your UI payment."
        },
        minWages: 2900,
        formula: "1% of total base period wages, or 1.9% of two highest quarters."
    },
    NE: {
        code: "NE",
        name: "Nebraska",
        maxWba: 514,
        minWba: 70,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://dol.nebraska.gov/UIBenefits",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
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
        waitingWeek: false,
        portalUrl: "https://ui.nv.gov/",
        severanceRule: {
            type: "delay",
            lumpSumExempt: true,
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
        waitingWeek: true,
        portalUrl: "https://www.nhes.nh.gov/services/claimants/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance pay is deducted from weekly benefits. If severance matches or exceeds WBA, benefits are $0."
        },
        minWages: 2800,
        formula: "Based on total annual base period wages from state charts (~1.1% of annual wages)."
    },
    NJ: {
        code: "NJ",
        name: "New Jersey",
        maxWba: 854,
        minWba: 120,
        maxWeeks: 26,
        waitingWeek: false,
        portalUrl: "https://www.nj.gov/labor/myunemployment/",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
            description: "New Jersey does not offset or delay unemployment benefit eligibility due to severance payments."
        },
        minWages: 8300,
        formula: "60% of average weekly wage."
    },
    NM: {
        code: "NM",
        name: "New Mexico",
        maxWba: 511,
        minWba: 90,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.dws.state.nm.us/Unemployment-Insurance",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance payments are treated as wages and reduce weekly benefits dollar-for-dollar."
        },
        minWages: 2000,
        formula: "53.5% of average weekly wage in high quarter (~1/24.3 of high quarter)."
    },
    NY: {
        code: "NY",
        name: "New York",
        maxWba: 504,
        minWba: 132,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://dol.ny.gov/unemployment/unemployment-insurance-assistance",
        severanceRule: {
            type: "custom",
            lumpSumExempt: false,
            description: "Severance delays benefits ONLY if first paid within 30 days of termination AND the weekly severance amount exceeds the state maximum weekly benefit ($504)."
        },
        minWages: 3200,
        formula: "1/26 of high quarter earnings (or 1/25 if high quarter is $3,575 or less)."
    },
    NC: {
        code: "NC",
        name: "North Carolina",
        maxWba: 350,
        minWba: 15,
        maxWeeks: 12,
        waitingWeek: true,
        portalUrl: "https://www.des.nc.gov/",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Severance delays your eligibility. You cannot collect UI until the severance coverage period ends."
        },
        minWages: 3000,
        formula: "1/52 of last two quarters combined."
    },
    ND: {
        code: "ND",
        name: "North Dakota",
        maxWba: 673,
        minWba: 43,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.jobsnd.com/unemployment-individuals",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance is allocated to weekly periods and offsets benefits dollar-for-dollar."
        },
        minWages: 2795,
        formula: "1/65 of (two highest quarters + half of third highest quarter)."
    },
    OH: {
        code: "OH",
        name: "Ohio",
        maxWba: 613,
        minWba: 150,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://unemployment.ohio.gov/",
        severanceRule: {
            type: "delay",
            lumpSumExempt: true,
            description: "Unallocated lump-sum severance does not offset. Allocated salary continuation delays benefits for covered weeks."
        },
        minWages: 5600,
        formula: "50% of average weekly wage."
    },
    OK: {
        code: "OK",
        name: "Oklahoma",
        maxWba: 539,
        minWba: 16,
        maxWeeks: 16,
        waitingWeek: true,
        portalUrl: "https://oklahoma.gov/oesc/individuals.html",
        severanceRule: {
            type: "delay",
            lumpSumExempt: true,
            description: "Lump sum severance with release of claims does not affect benefits. Salary continuation delays benefits week-for-week."
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
        waitingWeek: true,
        portalUrl: "https://unemployment.oregon.gov/",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
            description: "Severance pay is not considered disqualifying or deductible income. You can file immediately."
        },
        minWages: 1000,
        formula: "1.25% of total base period wages."
    },
    PA: {
        code: "PA",
        name: "Pennsylvania",
        maxWba: 605,
        minWba: 68,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://www.uc.pa.gov/",
        severanceRule: {
            type: "custom",
            lumpSumExempt: false,
            description: "Severance only offsets UI benefits if total severance exceeds 40% of Pennsylvania's average annual wage (~$25,200). Only the excess above $25,200 offsets benefits."
        },
        minWages: 3200,
        formula: "4% of high quarter wages."
    },
    RI: {
        code: "RI",
        name: "Rhode Island",
        maxWba: 707,
        minWba: 62,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://dlt.ri.gov/ui/",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
            description: "Severance pay does not delay or offset your weekly unemployment benefits in Rhode Island."
        },
        minWages: 3900,
        formula: "3.85% of average of two highest quarters."
    },
    SC: {
        code: "SC",
        name: "South Carolina",
        maxWba: 326,
        minWba: 42,
        maxWeeks: 20,
        waitingWeek: true,
        portalUrl: "https://dew.sc.gov/individuals/apply-for-benefits",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
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
        waitingWeek: true,
        portalUrl: "https://dlr.sd.gov/ra/default.aspx",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
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
        maxWeeks: 12,
        waitingWeek: true,
        portalUrl: "https://www.tn.gov/workforce/unemployment.html",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Severance is treated as wages and disqualifies you for the weeks covered by the severance package."
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
        waitingWeek: true,
        portalUrl: "https://www.twc.texas.gov/programs/unemployment-benefits",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Texas law delays unemployment benefits by the number of weeks paid in severance. You cannot collect UI during the severance period."
        },
        minWages: 2500,
        formula: "1/25 of high quarter wages."
    },
    UT: {
        code: "UT",
        name: "Utah",
        maxWba: 712,
        minWba: 38,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://jobs.utah.gov/ui/home",
        severanceRule: {
            type: "delay",
            lumpSumExempt: false,
            description: "Severance is treated as earnings and delays/disqualifies weekly benefits for the weeks covered."
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
        waitingWeek: false,
        portalUrl: "https://labor.vermont.gov/unemployment-insurance",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
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
        maxWeeks: 12,
        waitingWeek: true,
        portalUrl: "https://www.vec.virginia.gov/unemployed",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
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
        waitingWeek: true,
        portalUrl: "https://esd.wa.gov/unemployment",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
            description: "Washington State does not deduct lump-sum or standard severance payments from weekly benefits, nor does it delay eligibility."
        },
        minWages: 684,
        formula: "3.85% of average of two highest quarters."
    },
    WV: {
        code: "WV",
        name: "West Virginia",
        maxWba: 424,
        minWba: 24,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://workforcewv.org/unemployment",
        severanceRule: {
            type: "none",
            lumpSumExempt: true,
            description: "West Virginia law generally does not deduct severance pay from weekly unemployment benefit amounts."
        },
        minWages: 2200,
        formula: "Based on total annual base period wages from state charts (~1.1% of annual wages)."
    },
    WI: {
        code: "WI",
        name: "Wisconsin",
        maxWba: 370,
        minWba: 54,
        maxWeeks: 26,
        waitingWeek: true,
        portalUrl: "https://dwd.wisconsin.gov/uiben/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
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
        waitingWeek: false,
        portalUrl: "https://dws.wyo.gov/dws-division/unemployment-insurance/",
        severanceRule: {
            type: "reduce",
            lumpSumExempt: false,
            description: "Severance reduces weekly benefits dollar-for-dollar. If severance exceeds WBA, benefits are $0."
        },
        minWages: 3600,
        formula: "4% of high quarter wages."
    }
};

// Timezone-safe Local Date Utilities
function parseLocalDate(dateStr) {
    if (!dateStr) return null;
    if (dateStr instanceof Date) {
        return isNaN(dateStr.getTime()) ? null : new Date(dateStr.getFullYear(), dateStr.getMonth(), dateStr.getDate());
    }
    const match = String(dateStr).trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) {
        return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    }
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return null;
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function toLocalIsoDate(dateObj) {
    if (!dateObj || isNaN(dateObj.getTime())) return "";
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function formatLocalDate(dateObj, options = { year: "numeric", month: "short", day: "numeric" }) {
    if (!dateObj || isNaN(dateObj.getTime())) return "Invalid Date";
    return dateObj.toLocaleDateString("en-US", options);
}

// Calculations Helper
const rulesEngine = {
    parseLocalDate,
    toLocalIsoDate,
    formatLocalDate,

    // Validates if wages meet base period eligibility criteria
    validateBasePeriod: (stateCode, q1, q2, q3, q4, is1099Only = false) => {
        const state = stateRules[stateCode];
        if (!state) return { eligible: false, reason: "Invalid State", activeQuarters: 0, totalWages: 0, highQuarter: 0 };

        const quarters = [Number(q1) || 0, Number(q2) || 0, Number(q3) || 0, Number(q4) || 0];
        const activeQuarters = quarters.filter(q => q > 0).length;
        const totalWages = quarters.reduce((a, b) => a + b, 0);
        const highQuarter = Math.max(...quarters);

        if (is1099Only) {
            return {
                eligible: false,
                is1099Warning: true,
                reason: `1099 Nonemployee Compensation ($${totalWages.toLocaleString()}) is not reported to ${state.name}'s UI tax fund by default. You must file a Worker Misclassification Dispute to count these wages toward eligibility.`,
                activeQuarters,
                totalWages,
                highQuarter
            };
        }

        // Rule 1: Wages in at least 2 quarters (standard in almost all states)
        if (activeQuarters < 2) {
            return {
                eligible: false,
                reason: "Insufficient quarters worked. Unemployment requires earnings in at least 2 base period quarters to demonstrate workforce attachment.",
                activeQuarters,
                totalWages,
                highQuarter
            };
        }

        // Rule 2: Minimum total base period wages
        if (totalWages < state.minWages) {
            return {
                eligible: false,
                reason: `Total base period earnings of $${totalWages.toLocaleString()} are below the state minimum requirement of $${state.minWages.toLocaleString()} for ${state.name}.`,
                activeQuarters,
                totalWages,
                highQuarter
            };
        }

        // Rule 3: 1.5x high quarter rule (ensures distributed wages across quarters)
        if (totalWages < 1.5 * highQuarter) {
            return {
                eligible: false,
                reason: `Total wages ($${totalWages.toLocaleString()}) must be at least 1.5x your highest quarter earnings ($${highQuarter.toLocaleString()} -> $${Math.ceil(1.5 * highQuarter).toLocaleString()} required). This ensures earnings were distributed across the year.`,
                activeQuarters,
                totalWages,
                highQuarter
            };
        }

        return {
            eligible: true,
            reason: `Qualified! Your base period earnings ($${totalWages.toLocaleString()} across ${activeQuarters} quarters) exceed ${state.name}'s $${state.minWages.toLocaleString()} minimum threshold.`,
            activeQuarters,
            totalWages,
            highQuarter
        };
    },

    // Calculates Weekly Benefit Amount based on quarterly wages and state
    calcWba: (stateCode, q1, q2, q3, q4, is1099Only = false) => {
        const state = stateRules[stateCode];
        if (!state) return null;

        const quarters = [Number(q1) || 0, Number(q2) || 0, Number(q3) || 0, Number(q4) || 0];
        const highQuarter = Math.max(...quarters);
        const total = quarters.reduce((a, b) => a + b, 0);
        const sorted = [...quarters].sort((a, b) => b - a);
        const sumTwoHigh = sorted[0] + sorted[1];

        let calculated = 0;

        switch (stateCode) {
            case "AL":
            case "CT":
            case "TN":
            case "MA":
                calculated = sumTwoHigh / 52;
                break;
            case "AZ":
            case "IN":
            case "NV":
            case "PA":
            case "TX":
            case "WI":
            case "WY":
                calculated = highQuarter * 0.04; // 1/25 (4%)
                break;
            case "CO":
                calculated = Math.max((sumTwoHigh / 26) * 0.60, (highQuarter / 13) * 0.50);
                break;
            case "DE":
                calculated = sumTwoHigh / 46;
                break;
            case "GA":
            case "HI":
                calculated = highQuarter / 21;
                break;
            case "IL":
                calculated = (sumTwoHigh / 26) * 0.47;
                break;
            case "IA":
            case "OK":
                calculated = highQuarter / 23;
                break;
            case "KS":
                calculated = highQuarter * 0.0425;
                break;
            case "KY":
                calculated = total * 0.013078;
                break;
            case "LA":
                calculated = ((total / 4) / 25) * 1.05;
                break;
            case "ME":
                calculated = (sumTwoHigh / 2) / 22;
                break;
            case "MD":
            case "NM":
                calculated = highQuarter / 24;
                break;
            case "MI":
                calculated = highQuarter * 0.041;
                break;
            case "MN":
            case "OH":
                calculated = Math.max(highQuarter / 26, total / 52);
                break;
            case "MO":
                calculated = (sumTwoHigh / 2) * 0.04;
                break;
            case "MT":
                calculated = Math.max(total * 0.01, sumTwoHigh * 0.019);
                break;
            case "NJ":
                calculated = (highQuarter / 13) * 0.60;
                break;
            case "NY":
                calculated = highQuarter <= 3575 ? highQuarter / 25 : highQuarter / 26;
                break;
            case "NC":
                calculated = (quarters[2] + quarters[3]) / 52;
                break;
            case "ND":
                calculated = (sumTwoHigh + sorted[2] * 0.5) / 65;
                break;
            case "OR":
                calculated = total * 0.0125;
                break;
            case "RI":
            case "WA":
                calculated = (sumTwoHigh / 2) * 0.0385;
                break;
            case "UT":
                calculated = Math.max(0, (highQuarter / 26) - 5);
                break;
            case "VT":
                calculated = sumTwoHigh / 45;
                break;
            case "VA":
                calculated = sumTwoHigh / 50;
                break;
            case "AK":
                calculated = total * 0.015;
                break;
            case "NH":
            case "WV":
                calculated = total * 0.0115;
                break;
            default:
                // Standard High Quarter / 26
                calculated = highQuarter / 26;
                break;
        }

        const baseValidation = rulesEngine.validateBasePeriod(stateCode, q1, q2, q3, q4, is1099Only);
        const rawCalculated = Math.round(calculated);

        // Apply state min/max caps if eligible
        let cappedWba = rawCalculated;
        if (total > 0 && cappedWba < state.minWba) cappedWba = state.minWba;
        if (cappedWba > state.maxWba) cappedWba = state.maxWba;

        const finalWba = baseValidation.eligible ? cappedWba : 0;
        const potentialWbaIfReclassified = total > 0 ? cappedWba : 0;

        return {
            eligible: baseValidation.eligible,
            is1099Warning: Boolean(baseValidation.is1099Warning),
            ineligibleReason: baseValidation.eligible ? null : baseValidation.reason,
            calculated: rawCalculated,
            finalWba: finalWba,
            potentialWbaIfReclassified,
            isCapped: baseValidation.eligible && rawCalculated > state.maxWba,
            highQuarter: highQuarter,
            totalWages: total,
            maxWeeks: state.maxWeeks,
            waitingWeek: state.waitingWeek,
            portalUrl: state.portalUrl,
            potentialPayout: finalWba * state.maxWeeks,
            potentialPayoutIfReclassified: potentialWbaIfReclassified * state.maxWeeks
        };
    },

    // Calculates the exact Severance Exhaustion Date and clock delay
    calculateSeveranceClock: (stateCode, separationDateStr, severanceAmount, severanceType, weeklyWage, customDelayWeeks) => {
        const state = stateRules[stateCode];
        if (!state) return null;

        const sepDate = parseLocalDate(separationDateStr);
        if (!sepDate) return null;

        const safeWage = Math.max(1, Number(weeklyWage) || 1500);
        const safeAmount = Math.max(0, Number(severanceAmount) || 0);
        const safeWeeks = Math.max(0, Number(customDelayWeeks) || 0);

        let rawSevWeeks = 0;
        let effectiveSevAmount = 0;

        if (severanceType === "none") {
            rawSevWeeks = 0;
            effectiveSevAmount = 0;
        } else if (severanceType === "weeks" && safeWeeks > 0) {
            rawSevWeeks = safeWeeks;
            effectiveSevAmount = safeWeeks * safeWage;
        } else if (severanceType === "lump-sum" && safeAmount > 0) {
            rawSevWeeks = Math.ceil(safeAmount / safeWage);
            effectiveSevAmount = safeAmount;
        }

        let delayWeeks = rawSevWeeks;
        let delayDays = delayWeeks * 7;
        let explanation = "";
        let effectCategory = state.severanceRule.type; // 'none', 'delay', 'reduce', 'custom'
        let eligibilityDate = new Date(sepDate.getTime());

        if (severanceType === "none" || rawSevWeeks === 0) {
            eligibilityDate.setDate(sepDate.getDate() + 1);
            delayDays = 0;
            delayWeeks = 0;
            effectCategory = "none";
            explanation = `With no severance package delaying your claim in ${state.name}, you are eligible to file immediately on the day after separation.`;
        } else if (state.severanceRule.type === "none") {
            eligibilityDate.setDate(sepDate.getDate() + 1);
            delayDays = 0;
            delayWeeks = 0;
            effectCategory = "none";
            explanation = `${state.name} law does not deduct or delay unemployment benefits due to severance pay. File immediately upon separation to start your claim${state.waitingWeek ? " and satisfy the 1-week unpaid waiting period" : ""}.`;
        } else if (severanceType === "lump-sum" && state.severanceRule.lumpSumExempt) {
            eligibilityDate.setDate(sepDate.getDate() + 1);
            delayDays = 0;
            delayWeeks = 0;
            effectCategory = "none";
            explanation = `In ${state.name}, a lump-sum severance package (especially with a release of claims) does not delay UI eligibility—unlike ongoing payroll continuation. You can file immediately!`;
        } else if (state.severanceRule.type === "delay") {
            eligibilityDate.setDate(sepDate.getDate() + delayDays + 1);
            effectCategory = "delay";
            explanation = `${state.name} treats ${severanceType === "lump-sum" ? "your lump-sum severance" : "salary continuation"} as wages covering ${delayWeeks} weeks ($${effectiveSevAmount.toLocaleString()}). Your first eligible filing date is postponed until the severance window expires, preserving your ${state.maxWeeks} benefit weeks afterward.`;
        } else if (state.severanceRule.type === "reduce") {
            eligibilityDate.setDate(sepDate.getDate() + delayDays + 1);
            effectCategory = "reduce";
            explanation = `${state.name} is a Benefit Reduction (Offset) state: severance allocated across ${delayWeeks} weeks reduces your weekly UI benefit dollar-for-dollar (to $0/wk while weekly severance exceeds your $${state.maxWba} cap). Full weekly payouts begin after week ${delayWeeks}.`;
        } else if (state.severanceRule.type === "custom") {
            if (stateCode === "NY") {
                const weeklySev = delayWeeks > 0 ? effectiveSevAmount / delayWeeks : safeWage;
                if (weeklySev > 504) {
                    eligibilityDate.setDate(sepDate.getDate() + delayDays + 1);
                    effectCategory = "delay";
                    explanation = `New York Rule: Because your weekly severance equivalent ($${Math.round(weeklySev).toLocaleString()}/wk) exceeds NY's $504 maximum WBA and is paid within 30 days, benefits are delayed for ${delayWeeks} weeks (Tip: if paid in a lump sum MORE than 30 days after separation, NY does not delay benefits).`;
                } else {
                    eligibilityDate.setDate(sepDate.getDate() + 1);
                    delayDays = 0;
                    delayWeeks = 0;
                    effectCategory = "none";
                    explanation = `New York Rule: Your weekly severance value ($${Math.round(weeklySev).toLocaleString()}/wk) does not exceed the $504 maximum WBA. You are eligible to file immediately!`;
                }
            } else if (stateCode === "PA") {
                const paThreshold = 25200;
                if (effectiveSevAmount > paThreshold) {
                    const offsetAmount = effectiveSevAmount - paThreshold;
                    const offsetWeeks = Math.ceil(offsetAmount / safeWage);
                    eligibilityDate.setDate(sepDate.getDate() + (offsetWeeks * 7) + 1);
                    delayWeeks = offsetWeeks;
                    delayDays = offsetWeeks * 7;
                    effectCategory = "reduce";
                    explanation = `Pennsylvania 40% Rule: The first $${paThreshold.toLocaleString()} of severance is 100% exempt! Only the excess ($${offsetAmount.toLocaleString()}) offsets your benefits across ${offsetWeeks} week${offsetWeeks === 1 ? "" : "s"}.`;
                } else {
                    eligibilityDate.setDate(sepDate.getDate() + 1);
                    delayDays = 0;
                    delayWeeks = 0;
                    effectCategory = "none";
                    explanation = `Pennsylvania 40% Rule: Your severance ($${effectiveSevAmount.toLocaleString()}) is below Pennsylvania's $${paThreshold.toLocaleString()} deductible threshold. You can file immediately with zero offset!`;
                }
            }
        }

        // First Payment Estimate (accounts for 1-week waiting period + ~1 week processing)
        const firstPayoutDate = new Date(eligibilityDate.getTime());
        firstPayoutDate.setDate(eligibilityDate.getDate() + (state.waitingWeek ? 14 : 7));

        // Calculate real-time progress between separationDate and eligibilityDate relative to today
        const today = parseLocalDate(new Date());
        let progressPercent = 100;
        let remainingDaysFromToday = 0;

        if (delayDays > 0) {
            const totalSpanMs = eligibilityDate.getTime() - sepDate.getTime();
            const elapsedMs = today.getTime() - sepDate.getTime();
            if (elapsedMs <= 0) {
                progressPercent = 8; // Just starting
                remainingDaysFromToday = Math.ceil((eligibilityDate.getTime() - sepDate.getTime()) / (1000 * 60 * 60 * 24));
            } else if (elapsedMs >= totalSpanMs) {
                progressPercent = 100;
                remainingDaysFromToday = 0;
            } else {
                progressPercent = Math.max(8, Math.min(100, Math.round((elapsedMs / totalSpanMs) * 100)));
                remainingDaysFromToday = Math.max(0, Math.ceil((eligibilityDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
            }
        }

        return {
            separationDateFormatted: formatLocalDate(sepDate, { month: "short", day: "numeric", year: "numeric" }),
            separationDateShort: formatLocalDate(sepDate, { month: "short", day: "numeric" }),
            eligibilityDate: toLocalIsoDate(eligibilityDate),
            eligibilityDateFormatted: formatLocalDate(eligibilityDate, { year: "numeric", month: "short", day: "numeric" }),
            eligibilityDateShort: formatLocalDate(eligibilityDate, { month: "short", day: "numeric" }),
            firstPayoutDateFormatted: formatLocalDate(firstPayoutDate, { month: "short", day: "numeric", year: "numeric" }),
            delayWeeks,
            delayDays,
            remainingDaysFromToday,
            progressPercent,
            explanation,
            effectCategory,
            waitingWeek: state.waitingWeek,
            portalUrl: state.portalUrl,
            severanceRuleType: state.severanceRule.type,
            lumpSumExempt: Boolean(state.severanceRule.lumpSumExempt)
        };
    },

    // Calculates complete Financial Runway (Liquid Savings + Severance + UI Benefits vs. Monthly Expenses + COBRA)
    calculateFinancialRunway: (params) => {
        const {
            separationDateStr,
            liquidSavings = 15000,
            monthlyExpenses = 4200,
            monthlyCobra = 650,
            cobraSubsidyMonths = 0,
            applyTaxes = true,
            severanceAmount = 0,
            severanceWeeks = 0,
            severanceType = "weeks",
            weeklyWage = 1500,
            weeklyWba = 275,
            maxUiWeeks = 12,
            delayWeeks = 0,
            waitingWeek = true
        } = params;

        const sepDate = parseLocalDate(separationDateStr) || parseLocalDate(new Date());
        const grossSeverance = severanceType === "none"
            ? 0
            : severanceType === "weeks"
                ? Math.max(0, Number(severanceWeeks) || 0) * Math.max(0, Number(weeklyWage) || 0)
                : Math.max(0, Number(severanceAmount) || 0);

        const sevTaxRate = applyTaxes ? 0.22 : 0; // Supplemental federal/payroll tax estimate
        const uiTaxRate = applyTaxes ? 0.10 : 0;  // Optional 10% federal UI withholding

        const netSeveranceTotal = Math.round(grossSeverance * (1 - sevTaxRate));
        const netWeeklyWba = Math.round((Number(weeklyWba) || 0) * (1 - uiTaxRate));
        const totalNetUiPool = netWeeklyWba * (Number(maxUiWeeks) || 0);

        const safeSavings = Math.max(0, Number(liquidSavings) || 0);
        const safeMonthlyLiving = Math.max(100, Number(monthlyExpenses) || 0);
        const safeMonthlyCobra = Math.max(0, Number(monthlyCobra) || 0);
        const safeSubsidyMonths = Math.max(0, Number(cobraSubsidyMonths) || 0);

        const weeklyLivingBurn = (safeMonthlyLiving * 12) / 52;
        const weeklyCobraBurn = (safeMonthlyCobra * 12) / 52;
        const subsidyWeeks = Math.round(safeSubsidyMonths * 4.33);

        // Simulate week-by-week cash pool starting with liquid savings + lump sum or weekly severance
        const activeSevWeeks = severanceType === "none" ? 0 : Math.max(1, Number(severanceWeeks) || Math.ceil(grossSeverance / Math.max(1, weeklyWage)));
        const netWeeklySeverance = activeSevWeeks > 0 ? netSeveranceTotal / activeSevWeeks : 0;

        const uiStartWeek = Number(delayWeeks) + (waitingWeek ? 1 : 0) + 1;
        const uiEndWeek = uiStartWeek + Number(maxUiWeeks) - 1;

        let currentCash = safeSavings + (severanceType === "lump-sum" ? netSeveranceTotal : 0);
        let depletionWeek = 0;
        const maxSimWeeks = 260; // Up to 5 years

        for (let w = 1; w <= maxSimWeeks; w++) {
            let inflow = 0;
            if (severanceType === "weeks" && w <= activeSevWeeks) {
                inflow += netWeeklySeverance;
            }
            if (w >= uiStartWeek && w <= uiEndWeek && netWeeklyWba > 0) {
                inflow += netWeeklyWba;
            }

            const cobraThisWeek = w <= subsidyWeeks ? 0 : weeklyCobraBurn;
            const outflow = weeklyLivingBurn + cobraThisWeek;

            currentCash = currentCash + inflow - outflow;
            if (currentCash <= 0) {
                depletionWeek = w;
                break;
            }
            if (w === maxSimWeeks) {
                depletionWeek = maxSimWeeks;
            }
        }

        const depletionDate = new Date(sepDate.getTime());
        depletionDate.setDate(sepDate.getDate() + depletionWeek * 7);

        const runwayMonths = Number((depletionWeek / 4.333).toFixed(1));
        const totalAvailableResources = safeSavings + netSeveranceTotal + totalNetUiPool;
        const fullMonthlyBurn = safeMonthlyLiving + safeMonthlyCobra;

        // Calculate phase shares for visual stacked bar
        const sevSharePct = totalAvailableResources > 0 ? Math.round((netSeveranceTotal / totalAvailableResources) * 100) : 0;
        const uiSharePct = totalAvailableResources > 0 ? Math.round((totalNetUiPool / totalAvailableResources) * 100) : 0;
        const savingsSharePct = Math.max(0, 100 - sevSharePct - uiSharePct);

        return {
            runwayWeeks: depletionWeek,
            runwayMonths,
            isCappedAt5Years: depletionWeek >= maxSimWeeks,
            depletionDateFormatted: formatLocalDate(depletionDate, { month: "short", day: "numeric", year: "numeric" }),
            grossSeverance,
            netSeveranceTotal,
            netWeeklyWba,
            totalNetUiPool,
            safeSavings,
            totalAvailableResources,
            fullMonthlyBurn,
            subsidizedMonthlyBurn: safeMonthlyLiving,
            sevSharePct,
            uiSharePct,
            savingsSharePct
        };
    }
};

// Export rules for browser and Node compatibility
if (typeof module !== "undefined" && module.exports) {
    module.exports = { stateRules, rulesEngine };
} else {
    window.stateRules = stateRules;
    window.rulesEngine = rulesEngine;
}
