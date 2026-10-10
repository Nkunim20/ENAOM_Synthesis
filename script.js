
// Select all category filter buttons
const filterButtons = document.querySelectorAll(".filters button");

// Select all confession posts
const posts = document.querySelectorAll(".post");

// Filter posts when a category button is clicked
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.category;

        posts.forEach(function(post) {
            if (
                selectedCategory === "All" ||
                post.dataset.category === selectedCategory
            ) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    });
});

// Add voting functionality
const voteButtons = document.querySelectorAll(".vote-button");

voteButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const count = button.querySelector("span");
        let votes = Number(count.textContent);

        votes = votes + 1;
        count.textContent = votes;

    });
});



const confessionInput = document.getElementById("confession");
const charCount = document.getElementById("char-count");
const confessionForm = document.getElementById("confession-form");
const formMessage = document.getElementById("form-message");

if (confessionInput && charCount) {
    confessionInput.addEventListener("input", function () {
        charCount.textContent = confessionInput.value.length;
    });
}

if (confessionForm) {
    confessionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const categoryInput = document.getElementById("category");
        const agreeRules = document.getElementById("agree-rules");

        if (!categoryInput || !agreeRules || !formMessage || !confessionInput) {
            console.error("One or more confession form elements are missing.");
            return;
        }

        const category = categoryInput.value;
        const confession = confessionInput.value.trim();
        const agreed = agreeRules.checked;

        if (!category || !confession || !agreed) {
            formMessage.textContent =
                "Please complete all fields and agree to the guidelines.";
            return;
        }

        try {
            const newPost = {
                id: Date.now(),
                category: category,
                text: confession,
                votes: 0,
                avatar: "🎭",
                createdAt: new Date().toISOString()
            };

            const savedPosts = JSON.parse(
                localStorage.getItem("campusPosts") || "[]"
            );

            if (!Array.isArray(savedPosts)) {
                throw new Error("Saved posts are not in the expected format.");
            }

            savedPosts.unshift(newPost);
            localStorage.setItem("campusPosts", JSON.stringify(savedPosts));

            formMessage.textContent =
                "Your confession has been saved successfully!";

            confessionForm.reset();

            if (charCount) {
                charCount.textContent = "0";
            }

        } catch (error) {
            console.error("Could not save confession:", error);
            formMessage.textContent =
                "Unable to save your confession. Please try again.";
        }
    });
} else {
    console.error("The confession form was not found on this page.");
}