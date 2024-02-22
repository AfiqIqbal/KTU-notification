document.addEventListener('DOMContentLoaded', () => {
    const url = "https://api.ktu.edu.in/ktu-web-portal-api/anon/announcemnts";
    const data = {
        number: 0, // Start from the first page
        searchText: "",
        size: 10
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const announcementsList = document.getElementById('announcements');
        if (data.content && data.content.length > 0) {
            data.content.forEach(announcement => {
                const date = new Date(announcement.announcementDate);
                const formattedDate = date.toLocaleDateString('en-US');
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${formattedDate}:</strong> ${announcement.subject}`;
                listItem.style.color = 'white'; // Set text color of list item
                announcementsList.appendChild(listItem);
            });
        } else {
            announcementsList.innerHTML = '<li>No announcements found.</li>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('announcements').innerHTML = '<li>Error loading announcements.</li>';
    });
});
