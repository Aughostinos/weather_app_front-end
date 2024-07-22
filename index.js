//this is the link of the deployed backend
backend_url = "https://weather-app-eight-theta-54.vercel.app";
$(document).ready(function () {
    // Navigation links click event handlers
    $('#homeLink').click(function () {
        showPage('home');
    });
    $('#signInLink').click(function () {
        showPage('signIn');
    });
    $('#signUpLink').click(function () {
        showPage('signUp');
    });
    $('#validateZipLink').click(function () {
        showPage('validateZip');
    });
    $('#getHelpLink').click(function () {
        showPage('getHelp');
    });

    function showPage(pageId) {
        $('.page').removeClass('active');
        $('#' + pageId).addClass('active');
    }
    
    // Initially show the home page
    showPage('home');

    // Event handler for getting weather data
    $('#getWeather').click(async function () {
        const zipCode = $('#zipCode').val();
        const weatherResult = $('#weatherResult');
        weatherResult.html('Loading...');

        try {
            // Fetch weather data from backend
            const response = await fetch(`${backend_url}/weather?zipCode=${zipCode}`);
            const data = await response.json();
            // Display the weather data
            if (data.status == 'success') {
                const { temp, humidity, feels_like } = data.data['main'];
                weatherResult.html(`
                    <p>temp: ${temp}</p>
                    <p>Humidity: ${humidity}</p>
                    <p>feels_like: ${feels_like}</p>
                `);

            } else {
                weatherResult.html('Error fetching weather data.');
            }
        } catch (error) {
            console.error(error);
            weatherResult.html('Error fetching weather data.');
        }
    });

    // Event handler for submitting feedback
    $('#submitFeedback').click(async function () {
        const feedback = $('#feedback').val();
        const feedbackResult = $('#feedbackResult');
        feedbackResult.html('Submitting...');

        try {
            // Send feedback to backend
            const response = await fetch(`${backend_url}/user_feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback })
            });
            const data = await response.json();
            // Display submission result
            if (data.status == 'success') {
                feedbackResult.html('Feedback submitted successfully.');
            } else {
                feedbackResult.html('Error submitting feedback.');
            }
        } catch (error) {
            feedbackResult.html('Error submitting feedback.');
        }
    });

    // Event handler for signing in
    $('#signInButton').click(async function () {
        const email = $('#signInEmail').val();
        const password = $('#signInPassword').val();
        const signInResult = $('#signInResult');

        signInResult.html('Signing in...');

        try {
            // Send sign-in request to backend
            const response = await fetch(`${backend_url}/signin`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ email: email, password: password })
            });
            const data = await response.json();
            // Display sign-in result
            if (data.token) {
                signInResult.html('Sign-in successful.');
                // Optionally, store token and redirect user
            } else {
                signInResult.html('Sign-in failed: ' + data.message);
            }
        } catch (error) {
            signInResult.html('Error signing in.');
        }
    });

    // Event handler for signing up
    $('#signUpButton').click(async function () {
        const username = $('#signUpUsername').val();
        const email = $('#signUpEmail').val();
        const password = $('#signUpPassword').val();
        const signUpResult = $('#signUpResult');

        signUpResult.html('Signing up...');

        try {
            // Send sign-up request to backend
            const response = await fetch(`${backend_url}/signup`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            // Display sign-up result
            if (data.message == 'User created successfully') {
                signUpResult.html('Sign-up successful.');
            } else {
                signUpResult.html('Sign-up failed: ' + data.message);
            }
        } catch (error) {
            signUpResult.html('Error signing up.');
        }
    });

    // Event handler for validating zip code
    $('#validateZipButton').click(async function () {
        const zipCode = $('#zipCodeValidate').val();
        const validateZipResult = $('#validateZipResult');
        validateZipResult.html('Validating...');

        try {
            // Send zip code validation request to backend
            const response = await fetch(`${backend_url}/zip_validation?zipCode=${zipCode}`);
            const data = await response.json();
            // Display validation result
            if (data.status == 'success') {
                validateZipResult.html('Zip code is valid.');
            } else {
                validateZipResult.html('Invalid zip code.');
            }
        } catch (error) {
            validateZipResult.html('Error validating zip code.');
        }
    });
});
