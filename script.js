document.addEventListener('DOMContentLoaded', () => {
    const locationPoints = document.querySelectorAll('.location-point');
    const infoBoxes = document.querySelectorAll('.info-box');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Function to hide all info boxes
    function hideAllInfoBoxes() {
        infoBoxes.forEach(box => {
            box.style.display = 'none';
        });
    }

    // Add click listeners to location points
    locationPoints.forEach(point => {
        point.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from bubbling up to container/body

            // Hide any currently open info box
            hideAllInfoBoxes();

            // Get the target info box ID from data attribute
            const infoBoxId = point.getAttribute('data-info');
            const infoBox = document.getElementById(infoBoxId);

            if (infoBox) {
                // Position the info box slightly above the point
                const pointRect = point.getBoundingClientRect();
                const containerRect = point.closest('.map-container').getBoundingClientRect();

                // Calculate position relative to the container
                let top = point.offsetTop - infoBox.offsetHeight - 10; // 10px spacing
                let left = point.offsetLeft;

                // Adjust if box goes off-screen (basic boundary check)
                if (top < 0) {
                    top = point.offsetTop + point.offsetHeight + 10; // Position below if no space above
                }

                 // Center the box horizontally relative to the point
                infoBox.style.left = `${left}px`;
                infoBox.style.transform = 'translateX(-50%)'; // Center align
                 // Adjust if it overflows left/right (very basic)
                 if (left - infoBox.offsetWidth / 2 < 0) {
                      infoBox.style.left = `${infoBox.offsetWidth / 2}px`;
                 } else if (left + infoBox.offsetWidth / 2 > containerRect.width) {
                     infoBox.style.left = `${containerRect.width - infoBox.offsetWidth / 2}px`;
                 }


                infoBox.style.top = `${top}px`;
                infoBox.style.display = 'block'; // Show the info box
            }
        });
    });

    // Add click listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
             event.stopPropagation();
            button.closest('.info-box').style.display = 'none'; // Hide the parent info box
        });
    });

    // Optional: Click outside an info box to close it
    document.addEventListener('click', (event) => {
        // Check if the click was outside of any info box or location point
         if (!event.target.closest('.info-box') && !event.target.closest('.location-point')) {
            hideAllInfoBoxes();
         }
    });

});