function signout () {
    const data = { key: 'value' };

    // Options for the Fetch API
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    // URL where the POST request should be sent
    const url = '/logout';
    // Sending the POST request
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('POST request succeeded with JSON response:', data);
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error);
        });
    window.location.replace("./Sign-in.html");
}

document.getElementById("DOMContentLoaded", function(event) {
    console.log("html files have been loaded")
});
/*
document.getElementById("homeLink").addEventListener('click', function() {
    console.log('triggered');
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);


        })
        .catch(error => {
            console.error('Error:', error);
        });
});
 */