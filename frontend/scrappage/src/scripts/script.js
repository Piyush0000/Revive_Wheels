document.addEventListener('DOMContentLoaded',()=>
    {
        const usernameInput = document.getElementById('username');
        const userPhoneInput = document.getElementById('userphone');
        const userAadharInput = document.getElementById('userAadhar');
        const vehicleNoInput = document.getElementById('vehicleNo');
        const vehicleRCInput = document.getElementById('vehicleRC');
        const vehicleModelInput = document.getElementById('vehicleModel');
        const vehiclePhotosInput = document.getElementById('vehiclePhotos');
        const scrapApplicationInput = document.getElementById('scrapApplication');
        const formDetails = document.getElementById('form-details');

        const user = {};

        formDetails.addEventListener('submit',(event)=>{
            event.preventDefault();
            const name = usernameInput.value;
            const phoneNumber = userPhoneInput.value;
            const aadharNumber = userAadharInput.value; 
            const vehicleNumber = vehicleNoInput.value; 
            const vehicleRC = vehicleRCInput.files[0]; 
            const vehicleModel = vehicleModelInput.value; 
            const vehiclePhotos = vehiclePhotosInput.files; 
            const scrapApplication = scrapApplicationInput.files[0]; 

            console.log(vehiclePhotos);

            if(![name,phoneNumber,aadharNumber,vehicleNumber,vehicleModel]?.some(t=> t?.trim() === '')||vehicleRC||vehiclePhotos.length||scrapApplication)
            {
                if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
                    alert('Enter correct phone number')
                    userPhoneInput.style.border = "2px solid red";
                }
                else if(!/[a-zA-Z]/.test(name))
                {
                    alert('Enter a Valid Name');
                    usernameInput.style.border = "2px solid red";
                }
                else
                {
                    window.location.href = 'pickup.html'
                }
            }
            else
            {
                alert('Enter all the details');
                console.log('Enter all the details')
            }

        })
    })