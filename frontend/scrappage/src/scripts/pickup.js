document.addEventListener('DOMContentLoaded', () => {
    const doItYourselfButton = document.getElementById('doItYourselfButton');
    const weWillHelpYouButton = document.getElementById('weWillHelpYouButton');
    const getValue = document.getElementById('getValue');
    const getValueBody = document.getElementById('getValueBody');
    const scrapCalculator = document.getElementById('scrap-calculator')
    const validBuffer = document.getElementById('valid-buffer');

    // Example: Add event listeners to the buttons
    doItYourselfButton.addEventListener('click', () => {
        console.log('Do it Yourself button clicked');
        window.location.href = 'diy.html'
    });

    weWillHelpYouButton.addEventListener('click', () => {
        console.log('We will help You button clicked');
        window.location.href = 'driver.html'
    });

    getValue.addEventListener('click',()=>{
        console.log('hello')
        setTimeout(()=>{
            getValueBody.style.display = 'none';
            scrapCalculator.style.display = 'block';
            validBuffer.style.display = 'none';
        },3000);
        getValueBody.style.display = 'none';
        validBuffer.style.display = 'block';
    })
});

