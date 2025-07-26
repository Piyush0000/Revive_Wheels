import { carSellData } from '../data/carsData.js';

document.addEventListener('DOMContentLoaded', () => {
    const auctionGrid = document.getElementById('auction-grid');

    // 1. Enhance car data with auction-specific properties
    const auctionItems = carSellData.map((car, index) => {
        // Convert price string "₹ 3,10,000" to a number
        const basePrice = parseInt(car.price.replace(/[^0-9]/g, ''), 10);
        
        return {
            ...car,
            id: `car-${index + 1}`,
            basePrice: basePrice,
            currentBid: basePrice, // Start bid at base price
            highestBidder: 'None',
            // Set a random auction end time (from 1 to 48 hours from now)
            bidEndTime: new Date(Date.now() + (Math.random() * 47 + 1) * 60 * 60 * 1000),
        };
    });

    // 2. Render each auction item
    auctionItems.forEach(item => renderAuctionCard(item));

    function renderAuctionCard(item) {
        const card = document.createElement('div');
        card.className = 'auction-card';
        card.id = item.id;

        card.innerHTML = `
            <img src="${item.image}" class="vehicle-image" alt="${item.name_model}">
            <div class="vehicle-details">
                <h4 class="vehicle-name">${item.name_model}</h4>
                <p class="vehicle-specs">${item.year_km}</p>
                <div class="bidding-info">
                    <div class="timer" id="timer-${item.id}">Time Left: Calculating...</div>
                    <div class="current-bid" id="bid-price-${item.id}">₹ ${item.currentBid.toLocaleString('en-IN')}</div>
                    <div class="bid-form">
                        <input type="number" class="bid-input" placeholder="Enter your bid" id="bid-input-${item.id}">
                        <button class="bid-button" data-id="${item.id}">Place Bid</button>
                    </div>
                    <p class="bid-feedback" id="feedback-${item.id}"></p>
                </div>
            </div>
        `;
        auctionGrid.appendChild(card);

        // 3. Initialize countdown timer and event listeners for the new card
        initializeTimer(item);
        attachBidListener(item.id);
    }

    function initializeTimer(item) {
        const timerElement = document.getElementById(`timer-${item.id}`);
        
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = item.bidEndTime - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "AUCTION ENDED";
                document.getElementById(`bid-input-${item.id}`).disabled = true;
                document.querySelector(`.bid-button[data-id='${item.id}']`).disabled = true;
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerElement.textContent = `Time Left: ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    function attachBidListener(itemId) {
        const button = document.querySelector(`.bid-button[data-id='${itemId}']`);
        button.addEventListener('click', handleBid);
    }

    function handleBid(event) {
        const itemId = event.target.dataset.id;
        const item = auctionItems.find(car => car.id === itemId);
        
        const input = document.getElementById(`bid-input-${itemId}`);
        const feedback = document.getElementById(`feedback-${itemId}`);
        const newBid = parseInt(input.value, 10);

        // Bid Validation
        if (isNaN(newBid) || newBid <= item.currentBid) {
            feedback.textContent = 'Your bid must be higher than the current bid.';
            feedback.className = 'bid-feedback error';
            return;
        }

        // Update state
        item.currentBid = newBid;
        
        // Update UI
        document.getElementById(`bid-price-${itemId}`).textContent = `₹ ${newBid.toLocaleString('en-IN')}`;
        feedback.textContent = 'Bid placed successfully!';
        feedback.className = 'bid-feedback success';
        input.value = ''; // Clear input

        // Reset feedback message after 3 seconds
        setTimeout(() => {
            feedback.textContent = '';
        }, 3000);
    }
});