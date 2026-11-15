
/* ==========================================
   GRO​​WFUND - JAVASCRIPT
   Frontend functionality and Java API
========================================== */

const API_URL = "http://localhost:8080/api";


// ==========================================
// 1. NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = "success") {

    let notification = document.getElementById("notification");

    if (!notification) {

        notification = document.createElement("div");
        notification.id = "notification";

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
// 2. CHECK JAVA SERVER
// ==========================================

async function checkServer() {

    try {

        const response = await fetch(`${API_URL}/status`);

        if (!response.ok) {
            throw new Error("Server unavailable");
        }

        const data = await response.json();

        console.log("GrowFund Server:", data.status);

    } catch (error) {

        console.warn("Java backend is not connected.");

    }
}


// ==========================================
// 3. BUSINESS REGISTRATION
// ==========================================

const businessForm = document.getElementById("businessForm");

if (businessForm) {

    businessForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const submitButton = businessForm.querySelector(
            'button[type="submit"]'
        );

        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Registering...";

        try {

            const formData = new FormData(businessForm);

            const data = new URLSearchParams();

            for (const [key, value] of formData.entries()) {
                data.append(key, value);
            }

            const response = await fetch(`${API_URL}/business`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },

                body: data.toString()

            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Registration failed");
            }

            showNotification(
                "Business registered successfully!"
            );

            businessForm.reset();

            await loadBusinesses();

        } catch (error) {

            showNotification(
                error.message || "Unable to register business.",
                "error"
            );

            console.error(error);

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = originalText;

        }

    });

}


// ==========================================
// 4. LOAD REGISTERED BUSINESSES
// ==========================================

async function loadBusinesses() {

    try {

        const response = await fetch(`${API_URL}/businesses`);

        if (!response.ok) {
            throw new Error("Could not load businesses");
        }

        const businesses = await response.json();

        console.log("Registered businesses:", businesses);

        renderBusinesses(businesses);

    } catch (error) {

        console.warn("Unable to load registered businesses.");

    }

}


// ==========================================
// 5. DISPLAY BUSINESS INFORMATION
// ==========================================

function renderBusinesses(businesses) {

    const businessContainer = document.getElementById("businesses");

    if (!businessContainer) return;

    // Keep the original demonstration cards.
    // Add registered businesses without replacing them.

    const oldDynamicCards = businessContainer.querySelectorAll(
        ".dynamic-business-card"
    );

    oldDynamicCards.forEach(card => card.remove());

    businesses.forEach(business => {

        const card = document.createElement("article");

        card.className = "business-card dynamic-business-card";

        const avatar = document.createElement("div");
        avatar.className = "business-avatar";

        avatar.textContent = (
            business.name || "B"
        ).substring(0, 2).toUpperCase();

        const title = document.createElement("h3");
        title.textContent = business.name || "New Business";

        const founder = document.createElement("p");
        founder.className = "founder-name";
        founder.textContent = business.founder || "Founder";

        const description = document.createElement("p");
        description.className = "business-description";
        description.textContent =
            "A newly registered GrowFund business.";

        const button = document.createElement("button");
        button.className = "btn btn-primary connect-btn";
        button.textContent = "Connect with Founder";

        button.addEventListener("click", () => {
            showNotification(
                "Business selected: " + (business.name || "Business")
            );
        });

        card.append(
            avatar,
            title,
            founder,
            description,
            button
        );

        businessContainer.appendChild(card);

    });

}


// ==========================================
// 6. BUSINESS SEARCH
// ==========================================

const searchInput = document.getElementById("businessSearch");

if (searchInput) {

    searchInput.addEventListener("input", filterBusinesses);

}


// ==========================================
// 7. CATEGORY FILTER
// ==========================================

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", filterBusinesses);

}


// ==========================================
// 8. FUNDING STAGE FILTER
// ==========================================

const stageFilter = document.getElementById("stageFilter");

if (stageFilter) {

    stageFilter.addEventListener("change", filterBusinesses);

}


// ==========================================
// 9. FILTER BUSINESS CARDS
// ==========================================

function filterBusinesses() {

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const category = categoryFilter
        ? categoryFilter.value.toLowerCase()
        : "";

    const stage = stageFilter
        ? stageFilter.value.toLowerCase()
        : "";

    const cards = document.querySelectorAll(".business-card");

    cards.forEach(card => {

        const text = card.textContent.toLowerCase();

        const matchesSearch = text.includes(search);

        const matchesCategory =
            !category || text.includes(category);

        const matchesStage =
            !stage || text.includes(stage);

        card.style.display =
            matchesSearch && matchesCategory && matchesStage
                ? ""
                : "none";

    });

}


// ==========================================
// 10. CONNECT WITH FOUNDER
// ==========================================

document.addEventListener("click", function(event) {

    const button = event.target.closest(".connect-btn");

    if (!button) return;

    const card = button.closest(".business-card");

    const businessName = card
        ? card.querySelector("h3")?.textContent
        : "Business";

    showNotification(
        `Connection request for ${businessName}. Backend integration pending.`
    );

});


// ==========================================
// 11. INVESTOR INTEREST BUTTONS
// ==========================================

const interestButtons = document.querySelectorAll(
    ".interest-actions button"
);

interestButtons.forEach((button, index) => {

    button.addEventListener("click", function() {

        if (index === 0) {

            showNotification(
                "Conversation feature will be available soon."
            );

        } else {

            showNotification(
                "Interest marked for later."
            );

        }

    });

});


// ==========================================
// 12. INITIALIZE APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    console.log("GrowFund Application Initialized");

    checkServer();

    loadBusinesses();

});
