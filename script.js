/* ==========================================
   GROWFUND - JAVASCRIPT
   Frontend functionality and Java API
========================================== */

const API_URL = "http://localhost:8080/api";

// ==========================================
// 1. 50 ENTREPRENEURS & INVESTORS DIRECTORY
// ==========================================

const growFundDirectory = [
  { id: 1, name: "Amara Okafor", role: "Entrepreneur", company: "Daybreak Foods", sector: "Food & Beverage", stage: "Seed", location: "Oakland, CA" },
  { id: 2, name: "Sofia Reyes", role: "Entrepreneur", company: "Lumen Care", sector: "Healthcare", stage: "Seed", location: "Boston, MA" },
  { id: 3, name: "Theo Martin", role: "Entrepreneur", company: "Field Notes Studio", sector: "Creative Tools", stage: "Pre-seed", location: "Brooklyn, NY" },
  { id: 4, name: "Vikram Mehta", role: "Investor", company: "Apex Horizon Ventures", sector: "Technology", stage: "Series A", location: "Mumbai, India" },
  { id: 5, name: "Elena Rostova", role: "Investor", company: "Nordic Seed Fund", sector: "CleanTech", stage: "Pre-seed", location: "Stockholm, Sweden" },
  { id: 6, name: "Liam O'Connor", role: "Entrepreneur", company: "BioHarvest Analytics", sector: "AgriTech", stage: "Seed", location: "Dublin, Ireland" },
  { id: 7, name: "Priya Sharma", role: "Entrepreneur", company: "FinPulse India", sector: "FinTech", stage: "Seed", location: "Bengaluru, India" },
  { id: 8, name: "Marcus Vance", role: "Investor", company: "Vance Capital Partners", sector: "Technology", stage: "Series A", location: "San Francisco, CA" },
  { id: 9, name: "Chloe Dubois", role: "Entrepreneur", company: "Atelier Vert", sector: "Sustainable Fashion", stage: "Pre-seed", location: "Paris, France" },
  { id: 10, name: "Kenji Sato", role: "Entrepreneur", company: "NeuroCraft AI", sector: "Technology", stage: "Seed", location: "Tokyo, Japan" },
  { id: 11, name: "Rachel Greenwald", role: "Investor", company: "Horizon Angel Network", sector: "Consumer Goods", stage: "Pre-seed", location: "Chicago, IL" },
  { id: 12, name: "David Kim", role: "Entrepreneur", company: "CloudScale Systems", sector: "Technology", stage: "Series A", location: "Seattle, WA" },
  { id: 13, name: "Zara Al-Mansoor", role: "Entrepreneur", company: "Oasis Desalination", sector: "CleanTech", stage: "Seed", location: "Dubai, UAE" },
  { id: 14, name: "Lucas Silva", role: "Investor", company: "Latitude South Ventures", sector: "Technology", stage: "Seed", location: "São Paulo, Brazil" },
  { id: 15, name: "Hannah Abbott", role: "Entrepreneur", company: "SwiftFleet Logistics", sector: "Supply Chain", stage: "Pre-seed", location: "Austin, TX" },
  { id: 16, name: "Tariq Jameel", role: "Entrepreneur", company: "MedSecure Ledger", sector: "Healthcare", stage: "Seed", location: "Lahore, Pakistan" },
  { id: 17, name: "Oliver Thorne", role: "Investor", company: "Ironwood Syndicate", sector: "Industrial Tech", stage: "Series A", location: "London, UK" },
  { id: 18, name: "Maya Lin", role: "Entrepreneur", company: "CodeSpark Academy", sector: "EdTech", stage: "Pre-seed", location: "Vancouver, Canada" },
  { id: 19, name: "Gabriel Santos", role: "Entrepreneur", company: "AgroDrone Solutions", sector: "AgriTech", stage: "Seed", location: "Belo Horizonte, Brazil" },
  { id: 20, name: "Dr. Aris Thorne", role: "Investor", company: "BioHealth Angels", sector: "Healthcare", stage: "Seed", location: "Zurich, Switzerland" },
  { id: 21, name: "Nadia Petrova", role: "Entrepreneur", company: "CyberShield Labs", sector: "Technology", stage: "Series A", location: "Berlin, Germany" },
  { id: 22, name: "Ethan Huntley", role: "Entrepreneur", company: "QuantumRoute AI", sector: "Technology", stage: "Seed", location: "Boston, MA" },
  { id: 23, name: "Fatimah Al-Farsi", role: "Investor", company: "Gulf Crescent Capital", sector: "FinTech", stage: "Series A", location: "Riyadh, Saudi Arabia" },
  { id: 24, name: "Julian Vance", role: "Entrepreneur", company: "SolarGrid Dynamics", sector: "CleanTech", stage: "Pre-seed", location: "Denver, CO" },
  { id: 25, name: "Clara Dupont", role: "Entrepreneur", company: "Lumière Optics", sector: "Hardware", stage: "Seed", location: "Lyon, France" },
  { id: 26, name: "Sanjay Patel", role: "Investor", company: "Gujarat Growth Fund", sector: "Technology", stage: "Seed", location: "Ahmedabad, India" },
  { id: 27, name: "Beatrice Wong", role: "Entrepreneur", company: "ZenWork Spaces", sector: "Future of Work", stage: "Pre-seed", location: "Singapore" },
  { id: 28, name: "Mateo Morales", role: "Entrepreneur", company: "CafeStream Analytics", sector: "Food & Beverage", stage: "Pre-seed", location: "Bogotá, Colombia" },
  { id: 29, name: "Ingrid Lindqvist", role: "Investor", company: "Baltic Ventures", sector: "Consumer Tech", stage: "Pre-seed", location: "Helsinki, Finland" },
  { id: 30, name: "Ryan O'Neill", role: "Entrepreneur", company: "AquaPure Technologies", sector: "CleanTech", stage: "Seed", location: "Melbourne, Australia" },
  { id: 31, name: "Aisha Bello", role: "Entrepreneur", company: "AgriPay Africa", sector: "FinTech", stage: "Seed", location: "Lagos, Nigeria" },
  { id: 32, name: "Hiroshi Tanaka", role: "Investor", company: "Tokyo Tech Syndicate", sector: "Technology", stage: "Series A", location: "Tokyo, Japan" },
  { id: 33, name: "Samantha Brooks", role: "Entrepreneur", company: "EcoPackaging Solutions", sector: "CleanTech", stage: "Seed", location: "Toronto, Canada" },
  { id: 34, name: "Devendra Joshi", role: "Entrepreneur", company: "SkillForge India", sector: "EdTech", stage: "Pre-seed", location: "Pune, India" },
  { id: 35, name: "Catherine Moreau", role: "Investor", company: "Paris Angel Fund", sector: "Consumer Goods", stage: "Pre-seed", location: "Paris, France" },
  { id: 36, name: "Liam Vance", role: "Entrepreneur", company: "NextGen Robotics", sector: "Robotics", stage: "Series A", location: "Pittsburgh, PA" },
  { id: 37, name: "Zara Patel", role: "Entrepreneur", company: "HealthFirst Telemed", sector: "Healthcare", stage: "Seed", location: "London, UK" },
  { id: 38, name: "Marcus Sterling", role: "Investor", company: "Sterling & Co. Wealth", sector: "Technology", stage: "Series A", location: "New York, NY" },
  { id: 39, name: "Freja Johansen", role: "Entrepreneur", company: "Nordic BioThreads", sector: "Sustainable Fashion", stage: "Pre-seed", location: "Copenhagen, Denmark" },
  { id: 40, name: "Carlos Mendez", role: "Entrepreneur", company: "Ruta Logistics", sector: "Supply Chain", stage: "Seed", location: "Mexico City, Mexico" },
  { id: 41, name: "Ananya Roy", role: "Investor", company: "Bengal Angel Network", sector: "EdTech", stage: "Pre-seed", location: "Kolkata, India" },
  { id: 42, name: "Benjamin Cole", role: "Entrepreneur", company: "AeroDeliver Drones", sector: "Supply Chain", stage: "Seed", location: "Seattle, WA" },
  { id: 43, name: "Youssef Ben Ali", role: "Entrepreneur", company: "Maghreb Solar", sector: "CleanTech", stage: "Seed", location: "Casablanca, Morocco" },
  { id: 44, name: "Jessica Taylor", role: "Investor", company: "Pacific Dawn Ventures", sector: "Healthcare", stage: "Series A", location: "San Diego, CA" },
  { id: 45, name: "Noah Wright", role: "Entrepreneur", company: "OmniRetail POS", sector: "Retail Tech", stage: "Seed", location: "Nashville, TN" },
  { id: 46, name: "Meera Nair", role: "Entrepreneur", company: "UrbanFarm Systems", sector: "AgriTech", stage: "Pre-seed", location: "Kochi, India" },
  { id: 47, name: "Dmitri Ivanov", role: "Investor", company: "Red Square Capital", sector: "Technology", stage: "Series A", location: "Tallinn, Estonia" },
  { id: 48, name: "Kaito Yamamoto", role: "Entrepreneur", company: "RoboChef Kitchens", sector: "Food & Beverage", stage: "Seed", location: "Osaka, Japan" },
  { id: 49, name: "Chloe Bennett", role: "Entrepreneur", company: "CleanWave Water", sector: "CleanTech", stage: "Pre-seed", location: "Sydney, Australia" },
  { id: 50, name: "Arthur Pendelton", role: "Investor", company: "Heritage Seed Partners", sector: "Consumer Goods", stage: "Seed", location: "Edinburgh, UK" }
];

// ==========================================
// 2. NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = "success") {
    let notification = document.getElementById("notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "notification";
        notification.className = "notification";
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.className = "notification " + type;
    notification.style.display = "block";

    clearTimeout(notification.timer);
    notification.timer = setTimeout(() => {
        notification.style.display = "none";
    }, 3500);
}

// ==========================================
// 3. DISPLAY FOUNDERS & INVESTORS CARDS
// ==========================================

function renderDirectory(items) {
    const businessContainer = document.getElementById("businesses");
    if (!businessContainer) {
        console.error("Element #businesses not found in HTML!");
        return;
    }

    businessContainer.innerHTML = "";

    if (!items || items.length === 0) {
        businessContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #77827a; padding: 40px;">No matching founders or investors found.</p>`;
        return;
    }

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "business-card dynamic-business-card";

        const isInvestor = item.role === "Investor";
        const avatarClass = isInvestor ? "pink" : "green";
        const initials = item.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

        card.innerHTML = `
            <div class="business-card-top">
                <div class="business-avatar ${avatarClass}">${initials}</div>
                <span class="status">${item.role}</span>
            </div>
            <h3>${item.name}</h3>
            <p class="founder-name"><strong>Company:</strong> ${item.company}</p>
            <p class="business-description"><strong>Sector:</strong> ${item.sector} · <strong>Location:</strong> ${item.location}</p>
            <div class="tags">
                <span>${item.sector}</span>
                <span>${item.stage}</span>
            </div>
            <div class="funding-details">
                <div>
                    <span>Role</span>
                    <strong>${item.role}</strong>
                </div>
                <div>
                    <span>Stage</span>
                    <strong>${item.stage}</strong>
                </div>
            </div>
            <button type="button" class="btn btn-primary connect-btn">
                Connect with ${item.name}
            </button>
        `;

        const connectBtn = card.querySelector(".connect-btn");
        connectBtn.addEventListener("click", () => {
            showNotification(`Connection request sent to ${item.name} (${item.company}).`);
        });

        businessContainer.appendChild(card);
    });
}

// ==========================================
// 4. SEARCH & FILTER LOGIC
// ==========================================

function filterDirectory() {
    const searchInput = document.getElementById("businessSearch");
    const roleFilter = document.getElementById("roleFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const stageFilter = document.getElementById("stageFilter");

    const search = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const role = roleFilter ? roleFilter.value.toLowerCase() : "";
    const category = categoryFilter ? categoryFilter.value.toLowerCase() : "";
    const stage = stageFilter ? stageFilter.value.toLowerCase() : "";

    const filtered = growFundDirectory.filter(item => {
        const matchesSearch = 
            item.name.toLowerCase().includes(search) || 
            item.company.toLowerCase().includes(search) || 
            item.location.toLowerCase().includes(search) || 
            item.sector.toLowerCase().includes(search);

        const matchesRole = !role || item.role.toLowerCase() === role;
        const matchesCategory = !category || item.sector.toLowerCase().includes(category);
        const matchesStage = !stage || item.stage.toLowerCase() === stage;

        return matchesSearch && matchesRole && matchesCategory && matchesStage;
    });

    renderDirectory(filtered);
}

// ==========================================
// 5. INITIALIZE APPLICATION SAFELY
// ==========================================

function initApp() {
    console.log("Initializing GrowFund Directory...");
    renderDirectory(growFundDirectory);

    const searchInput = document.getElementById("businessSearch");
    const roleFilter = document.getElementById("roleFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const stageFilter = document.getElementById("stageFilter");

    if (searchInput) searchInput.addEventListener("input", filterDirectory);
    if (roleFilter) roleFilter.addEventListener("change", filterDirectory);
    if (categoryFilter) categoryFilter.addEventListener("change", filterDirectory);
    if (stageFilter) stageFilter.addEventListener("change", filterDirectory);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
