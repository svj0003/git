document.addEventListener("DOMContentLoaded", () => {
    const businessGrid = document.getElementById("businesses");
    const searchInput = document.getElementById("businessSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const stageFilter = document.getElementById("stageFilter");
    const sortFilter = document.getElementById("sortFilter");
    const businessForm = document.getElementById("businessForm");

    const directory = [
        { id: 1, name: "Amara Okafor", role: "Entrepreneur", company: "Daybreak Foods", sector: "Food & Beverage", stage: "Seed", location: "Oakland, CA", goal: 650000, raised: "₹4,20,000" },
        { id: 2, name: "Sofia Reyes", role: "Entrepreneur", company: "Lumen Care", sector: "Healthcare", stage: "Seed", location: "Boston, MA", goal: 400000, raised: "₹2,75,000" },
        { id: 3, name: "Theo Martin", role: "Entrepreneur", company: "Field Notes Studio", sector: "Creative Tools", stage: "Pre-seed", location: "Brooklyn, NY", goal: 850000, raised: "₹6,10,000" },
        { id: 4, name: "Vikram Mehta", role: "Investor", company: "Apex Horizon Ventures", sector: "Technology", stage: "Series A", location: "Mumbai, India", goal: 5000000, raised: "₹35,00,000" },
        { id: 5, name: "Elena Rostova", role: "Investor", company: "Nordic Seed Fund", sector: "CleanTech", stage: "Pre-seed", location: "Stockholm, Sweden", goal: 1200000, raised: "₹8,00,000" },
        { id: 6, name: "Liam O'Connor", role: "Entrepreneur", company: "BioHarvest Analytics", sector: "AgriTech", stage: "Seed", location: "Dublin, Ireland", goal: 950000, raised: "₹5,40,000" },
        { id: 7, name: "Priya Sharma", role: "Entrepreneur", company: "FinPulse India", sector: "FinTech", stage: "Seed", location: "Bengaluru, India", goal: 1500000, raised: "₹11,20,000" },
        { id: 8, name: "Marcus Vance", role: "Investor", company: "Vance Capital Partners", sector: "Technology", stage: "Series A", location: "San Francisco, CA", goal: 7500000, raised: "₹50,00,000" },
        { id: 9, name: "Chloe Dubois", role: "Entrepreneur", company: "Atelier Vert", sector: "Sustainable Fashion", stage: "Pre-seed", location: "Paris, France", goal: 350000, raised: "₹2,10,000" },
        { id: 10, name: "Kenji Sato", role: "Entrepreneur", company: "NeuroCraft AI", sector: "Technology", stage: "Seed", location: "Tokyo, Japan", goal: 2200000, raised: "₹14,50,000" },
        { id: 11, name: "Rachel Greenwald", role: "Investor", company: "Horizon Angel Network", sector: "Consumer Goods", stage: "Pre-seed", location: "Chicago, IL", goal: 800000, raised: "₹6,00,000" },
        { id: 12, name: "David Kim", role: "Entrepreneur", company: "CloudScale Systems", sector: "Technology", stage: "Series A", location: "Seattle, WA", goal: 4500000, raised: "₹32,00,000" },
        { id: 13, name: "Zara Al-Mansoor", role: "Entrepreneur", company: "Oasis Desalination", sector: "CleanTech", stage: "Seed", location: "Dubai, UAE", goal: 1800000, raised: "₹9,50,000" },
        { id: 14, name: "Lucas Silva", role: "Investor", company: "Latitude South Ventures", sector: "Technology", stage: "Seed", location: "São Paulo, Brazil", goal: 2000000, raised: "₹15,00,000" },
        { id: 15, name: "Hannah Abbott", role: "Entrepreneur", company: "SwiftFleet Logistics", sector: "Supply Chain", stage: "Pre-seed", location: "Austin, TX", goal: 550000, raised: "₹3,10,000" },
        { id: 16, name: "Tariq Jameel", role: "Entrepreneur", company: "MedSecure Ledger", sector: "Healthcare", stage: "Seed", location: "Lahore, Pakistan", goal: 700000, raised: "₹4,90,000" },
        { id: 17, name: "Oliver Thorne", role: "Investor", company: "Ironwood Syndicate", sector: "Industrial Tech", stage: "Series A", location: "London, UK", goal: 6000000, raised: "₹42,00,000" },
        { id: 18, name: "Maya Lin", role: "Entrepreneur", company: "CodeSpark Academy", sector: "EdTech", stage: "Pre-seed", location: "Vancouver, Canada", goal: 450000, raised: "₹3,20,000" },
        { id: 19, name: "Gabriel Santos", role: "Entrepreneur", company: "AgroDrone Solutions", sector: "AgriTech", stage: "Seed", location: "Belo Horizonte, Brazil", goal: 1100000, raised: "₹7,80,000" },
        { id: 20, name: "Dr. Aris Thorne", role: "Investor", company: "BioHealth Angels", sector: "Healthcare", stage: "Seed", location: "Zurich, Switzerland", goal: 2500000, raised: "₹19,00,000" },
        { id: 21, name: "Nadia Petrova", role: "Entrepreneur", company: "CyberShield Labs", sector: "Technology", stage: "Series A", location: "Berlin, Germany", goal: 3800000, raised: "₹28,50,000" },
        { id: 22, name: "Ethan Huntley", role: "Entrepreneur", company: "QuantumRoute AI", sector: "Technology", stage: "Seed", location: "Boston, MA", goal: 1600000, raised: "₹10,40,000" },
        { id: 23, name: "Fatimah Al-Farsi", role: "Investor", company: "Gulf Crescent Capital", sector: "FinTech", stage: "Series A", location: "Riyadh, Saudi Arabia", goal: 8000000, raised: "₹64,00,000" },
        { id: 24, name: "Julian Vance", role: "Entrepreneur", company: "SolarGrid Dynamics", sector: "CleanTech", stage: "Pre-seed", location: "Denver, CO", goal: 600000, raised: "₹3,60,000" },
        { id: 25, name: "Clara Dupont", role: "Entrepreneur", company: "Lumière Optics", sector: "Hardware", stage: "Seed", location: "Lyon, France", goal: 1400000, raised: "₹8,90,000" },
        { id: 26, name: "Sanjay Patel", role: "Investor", company: "Gujarat Growth Fund", sector: "Technology", stage: "Seed", location: "Ahmedabad, India", goal: 3000000, raised: "₹21,00,000" },
        { id: 27, name: "Beatrice Wong", role: "Entrepreneur", company: "ZenWork Spaces", sector: "Future of Work", stage: "Pre-seed", location: "Singapore", goal: 500000, raised: "₹2,90,000" },
        { id: 28, name: "Mateo Morales", role: "Entrepreneur", company: "CafeStream Analytics", sector: "Food & Beverage", stage: "Pre-seed", location: "Bogotá, Colombia", goal: 320000, raised: "₹1,80,000" },
        { id: 29, name: "Ingrid Lindqvist", role: "Investor", company: "Baltic Ventures", sector: "Consumer Tech", stage: "Pre-seed", location: "Helsinki, Finland", goal: 900000, raised: "₹6,30,000" },
        { id: 30, name: "Ryan O'Neill", role: "Entrepreneur", company: "AquaPure Technologies", sector: "CleanTech", stage: "Seed", location: "Melbourne, Australia", goal: 1300000, raised: "₹9,10,000" },
        { id: 31, name: "Aisha Bello", role: "Entrepreneur", company: "AgriPay Africa", sector: "FinTech", stage: "Seed", location: "Lagos, Nigeria", goal: 1050000, raised: "₹7,35,000" },
        { id: 32, name: "Hiroshi Tanaka", role: "Investor", company: "Tokyo Tech Syndicate", sector: "Technology", stage: "Series A", location: "Tokyo, Japan", goal: 5500000, raised: "₹41,25,000" },
        { id: 33, name: "Samantha Brooks", role: "Entrepreneur", company: "EcoPackaging Solutions", sector: "CleanTech", stage: "Seed", location: "Toronto, Canada", goal: 880000, raised: "₹5,70,000" },
        { id: 34, name: "Devendra Joshi", role: "Entrepreneur", company: "SkillForge India", sector: "EdTech", stage: "Pre-seed", location: "Pune, India", goal: 480000, raised: "₹3,36,000" },
        { id: 35, name: "Catherine Moreau", role: "Investor", company: "Paris Angel Fund", sector: "Consumer Goods", stage: "Pre-seed", location: "Paris, France", goal: 750000, raised: "₹5,25,000" },
        { id: 36, name: "Liam Vance", role: "Entrepreneur", company: "NextGen Robotics", sector: "Robotics", stage: "Series A", location: "Pittsburgh, PA", goal: 4200000, raised: "₹31,50,000" },
        { id: 37, name: "Zara Patel", role: "Entrepreneur", company: "HealthFirst Telemed", sector: "Healthcare", stage: "Seed", location: "London, UK", goal: 1250000, raised: "₹8,75,000" },
        { id: 38, name: "Marcus Sterling", role: "Investor", company: "Sterling & Co. Wealth", sector: "Technology", stage: "Series A", location: "New York, NY", goal: 9000000, raised: "₹72,00,000" },
        { id: 39, name: "Freja Johansen", role: "Entrepreneur", company: "Nordic BioThreads", sector: "Sustainable Fashion", stage: "Pre-seed", location: "Copenhagen, Denmark", goal: 420000, raised: "₹2,52,000" },
        { id: 40, name: "Carlos Mendez", role: "Entrepreneur", company: "Ruta Logistics", sector: "Supply Chain", stage: "Seed", location: "Mexico City, Mexico", goal: 980000, raised: "₹6,86,000" },
        { id: 41, name: "Ananya Roy", role: "Investor", company: "Bengal Angel Network", sector: "EdTech", stage: "Pre-seed", location: "Kolkata, India", goal: 650000, raised: "₹4,55,000" },
        { id: 42, name: "Benjamin Cole", role: "Entrepreneur", company: "AeroDeliver Drones", sector: "Supply Chain", stage: "Seed", location: "Seattle, WA", goal: 1750000, raised: "₹12,25,000" },
        { id: 43, name: "Youssef Ben Ali", role: "Entrepreneur", company: "Maghreb Solar", sector: "CleanTech", stage: "Seed", location: "Casablanca, Morocco", goal: 1150000, raised: "₹8,05,000" },
        { id: 44, name: "Jessica Taylor", role: "Investor", company: "Pacific Dawn Ventures", sector: "Healthcare", stage: "Series A", location: "San Diego, CA", goal: 4800000, raised: "₹36,00,000" },
        { id: 45, name: "Noah Wright", role: "Entrepreneur", company: "OmniRetail POS", sector: "Retail Tech", stage: "Seed", location: "Nashville, TN", goal: 820000, raised: "₹5,74,000" },
        { id: 46, name: "Meera Nair", role: "Entrepreneur", company: "UrbanFarm Systems", sector: "AgriTech", stage: "Pre-seed", location: "Kochi, India", goal: 390000, raised: "₹2,73,000" },
        { id: 47, name: "Dmitri Ivanov", role: "Investor", company: "Red Square Capital", sector: "Technology", stage: "Series A", location: "Tallinn, Estonia", goal: 5200000, raised: "₹39,00,000" },
        { id: 48, name: "Kaito Yamamoto", role: "Entrepreneur", company: "RoboChef Kitchens", sector: "Food & Beverage", stage: "Seed", location: "Osaka, Japan", goal: 1450000, raised: "₹10,15,000" },
        { id: 49, name: "Chloe Bennett", role: "Entrepreneur", company: "CleanWave Water", sector: "CleanTech", stage: "Pre-seed", location: "Sydney, Australia", goal: 530000, raised: "₹3,71,000" },
        { id: 50, name: "Arthur Pendelton", role: "Investor", company: "Heritage Seed Partners", sector: "Consumer Goods", stage: "Seed", location: "Edinburgh, UK", goal: 1900000, raised: "₹13,30,000" }
    ];

    function mergeSort(arr, sortType) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid), sortType);
        const right = mergeSort(arr.slice(mid), sortType);

        return merge(left, right, sortType);
    }

    function merge(left, right, sortType) {
        let result = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            let condition = false;

            if (sortType === "goal-asc") {
                condition = left[i].goal <= right[j].goal;
            } else if (sortType === "goal-desc") {
                condition = left[i].goal >= right[j].goal;
            } else if (sortType === "name-asc") {
                condition = left[i].company.localeCompare(right[j].company) <= 0;
            }

            if (condition) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        return result.concat(left.slice(i)).concat(right.slice(j));
    }

    function applyDSAFiltersAndSort() {
        const searchQuery = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedStage = stageFilter.value.toLowerCase();
        const sortType = sortFilter.value;

        let filtered = directory.filter(item => {
            const matchesSearch = item.company.toLowerCase().includes(searchQuery) ||
                                  item.name.toLowerCase().includes(searchQuery) ||
                                  item.location.toLowerCase().includes(searchQuery) ||
                                  item.sector.toLowerCase().includes(searchQuery);
            const matchesCategory = selectedCategory === "" ||
                                    item.sector.toLowerCase().includes(selectedCategory);
            const matchesStage = selectedStage === "" ||
                                 item.stage.toLowerCase() === selectedStage;

            return matchesSearch && matchesCategory && matchesStage;
        });

        if (sortType !== "") {
            filtered = mergeSort(filtered, sortType);
        }

        renderCards(filtered);
    }

    function renderCards(data) {
        businessGrid.innerHTML = "";

        if (data.length === 0) {
            businessGrid.innerHTML = "<p>No matching entries found.</p>";
            return;
        }

        data.forEach(item => {
            const initials = item.company.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
            const raisedNum = parseInt(item.raised.replace(/[^0-9]/g, ""), 10) || 0;
            const progressPercent = Math.min(100, Math.round((raisedNum / item.goal) * 100));

            const cardHTML = `
                <article class="business-card" data-goal="${item.goal}" data-name="${item.company}">
                    <div class="business-card-top">
                        <div class="business-avatar">${initials}</div>
                        <span class="status">${item.role}</span>
                    </div>
                    <h3>${item.company}</h3>
                    <p class="founder-name">${item.name} · ${item.sector}</p>
                    <p class="business-description">Based in ${item.location} · ${item.stage} stage opportunity.</p>
                    <div class="tags">
                        <span>${item.stage}</span>
                        <span>${item.sector}</span>
                    </div>
                    <div class="funding-details">
                        <div>
                            <span>Raised</span>
                            <strong>${item.raised}</strong>
                        </div>
                        <div>
                            <span>Goal</span>
                            <strong>₹${item.goal.toLocaleString("en-IN")}</strong>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width:${progressPercent}%"></div>
                    </div>
                    <button class="btn btn-primary connect-btn">Connect with ${item.role}</button>
                </article>
            `;
            businessGrid.insertAdjacentHTML("beforeend", cardHTML);
        });
    }

    searchInput.addEventListener("input", applyDSAFiltersAndSort);
    categoryFilter.addEventListener("change", applyDSAFiltersAndSort);
    stageFilter.addEventListener("change", applyDSAFiltersAndSort);
    sortFilter.addEventListener("change", applyDSAFiltersAndSort);

    if (businessForm) {
        businessForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(businessForm);
            const company = formData.get("businessName");
            const name = formData.get("founderName");
            const sector = formData.get("category");
            const location = formData.get("location");
            const goal = parseInt(formData.get("fundingGoal"), 10);
            const stage = formData.get("stage");

            directory.unshift({
                id: directory.length + 1,
                name: name,
                role: "Entrepreneur",
                company: company,
                sector: sector,
                stage: stage || "Seed",
                location: location,
                goal: goal,
                raised: "₹0"
            });

            applyDSAFiltersAndSort();
            businessForm.reset();
            alert("Business Profile Added to Directory!");
        });
    }

    applyDSAFiltersAndSort();
});
