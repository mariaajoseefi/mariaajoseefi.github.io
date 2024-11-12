document.addEventListener('DOMContentLoaded', () => {
    // Draggable single star element
    const star = document.getElementById('star');
    let isDragging = false;
    let offsetX, offsetY;

    // Start dragging
    star.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - star.offsetLeft;
        offsetY = event.clientY - star.offsetTop;
        star.style.cursor = 'grabbing';
    });

    // Move star
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            star.style.left = `${event.clientX - offsetX}px`;
            star.style.top = `${event.clientY - offsetY}px`;
        }
    });

    // Stop dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
        star.style.cursor = 'grab';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const starContainer = document.body;
    const starCount = 6;

    // Select text elements to avoid overlaps
    const textElements = document.querySelectorAll("h2, h3, p, a");

    function isOverlapping(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("overlay");

        const img = document.createElement("img");
        img.src = "assets/star.png";
        img.alt = "Silver Star";

        // Random starting position
        let topPosition = Math.random() * window.innerHeight;
        let leftPosition = Math.random() * window.innerWidth;
        star.style.top = `${topPosition}px`;
        star.style.left = `${leftPosition}px`;

        // Append the image to the div and div to the body
        star.appendChild(img);
        starContainer.appendChild(star);

        // Check for overlap and reposition if necessary
        let overlapFound;
        do {
            overlapFound = false;

            textElements.forEach(textElement => {
                if (isOverlapping(star, textElement)) {
                    overlapFound = true;
                    topPosition = Math.random() * window.innerHeight;
                    leftPosition = Math.random() * window.innerWidth;
                    star.style.top = `${topPosition}px`;
                    star.style.left = `${leftPosition}px`;
                }
            });
        } while (overlapFound);

        // Make the star draggable
        star.addEventListener("mousedown", function(e) {
            let shiftX = e.clientX - star.getBoundingClientRect().left;
            let shiftY = e.clientY - star.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                star.style.left = pageX - shiftX + 'px';
                star.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            star.onmouseup = function() {
                document.removeEventListener("mousemove", onMouseMove);
                star.onmouseup = null;
            };
        });

        star.ondragstart = function() {
            return false;
        };
    }
});



