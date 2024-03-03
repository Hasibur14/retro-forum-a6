const loadAllNews = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allData = data.posts;

    const newsContainer = document.getElementById('allNews-container');

    allData.forEach((item) => {
        const div = document.createElement('div');
        div.classList = `card card-side bg-base-100 shadow-xl border-2 w-11/12`;
        div.innerHTML = `
            <figure>
                <img class="p-4 rounded-xl w-72" src="${item.image}" alt="Movie" />
            </figure>
            <div class="card-body">
                <div class="space-y-5 text-xl">
                    <div class="flex">
                        <p># ${item.category}</p>
                        <p>Author: ${item.author.name}</p>
                    </div>
                    <div class="space-y-4">
                        <h4 class="lg:text-2xl font-bold">${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                    <hr>
                    <div class="flex justify-between ">
                        <div class="flex space-x-10">
                            <div class="flex space-x-3">
                                <span><img src="./images/tabler-icon-message-2.jpg" alt=""></span>
                                <p>${item.comment_count}</p>
                            </div>
                            <div class="flex space-x-3">
                                <span><img src="./images/tabler-icon-eye.jpg" alt=""></span>
                                <p class="view">${item.view_count}</p>
                            </div>
                            <div class="flex space-x-3">
                                <span><img src="./images/tabler-icon-clock-hour-9.jpg" alt=""></span>
                                <p><span>${item.posted_time}</span> min</p>
                            </div>
                        </div>
                        <div class="card-actions justify-end">
                            <img class="email-img" data-title="${item.title}" data-view="${item.view_count}" src="./images/email 1.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(div);
    });

    //  click event listeners to the email img:
    const emailImages = document.querySelectorAll('.email-img');
    emailImages.forEach((img) => {
        img.addEventListener('click', handleEmailClick);
    });
};

const handleEmailClick = (event) => {
    const title = event.target.dataset.title;
    const viewCount = event.target.dataset.view;
    countContainer(title, viewCount);
};

const countContainer = (title, viewCount) => {
    const countCard = document.getElementById('card-count');
    const div = document.createElement('div');
    div.classList = `flex bg-white p-4 justify-between rounded-lg`;
    div.innerHTML = `    
       <h4>${title}</h4>
       <div class="flex">
           <img src="./images/tabler-icon-eye.jpg" alt="">
           <p>${viewCount}</p>
       </div>
    `;
    countCard.appendChild(div);
};

loadAllNews();
