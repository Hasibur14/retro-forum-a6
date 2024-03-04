const loadAllNews = async (category = '') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    const data = await res.json();
    const allData = data.posts;

    const newsContainer = document.getElementById('allNews-container');
    newsContainer.innerHTML = '';

    allData.forEach((item) => {
        const div = document.createElement('div');
        div.classList = `card card-side bg-base-100 shadow-xl border-2 lg:w-11/12`;
        div.innerHTML = `
            <figure class="relative">
                <img class="p-4 rounded-xl w-28 lg:w-72" src="${item.image}" alt="Movie" />
                <span class=" absolute ${item.isActive ? "bg-green-500" : "bg-red-500"
            } w-4 h-4 rounded-full justify-end mb-20 ml-16 lg:mb-64 lg:ml-60"></span>
            </figure>
            <div class="card-body">
                <div class="space-y-5 text-xl">
                    <div class="flex">
                        <p id="category-search"># ${item.category}</p>
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

    let totalNews = 0;
    const emailImages = document.querySelectorAll('.email-img');
    emailImages.forEach((img) => {
        img.addEventListener('click', (event) => {
            handleEmailClick(event);
            totalNews++;
            document.getElementById('cart-count').innerText = totalNews;
        });
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
       <h4 class="text-lg font-normal">${title}</h4>
       <div class="flex">
           <img src="./images/tabler-icon-eye.jpg" alt="">
           <p class="text-base font-normal">${viewCount}</p>
       </div>
    `;
    countCard.appendChild(div);
};

const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();

    const latestPostContainer = document.getElementById('latest-post')
    data.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <div class="card lg:w-96 bg-base-100 shadow-xl">
          <figure><img class="p-6" src="${item.cover_image
            }" alt="Shoes" />
          </figure>
          <div class="card-body">
           <div class="flex space-x-4">
           <img src="./images/date.jpg" alt="">
           <p>${item.author ? item.author.posted_date || "No publish date" : "No publish date"}</p>
           </div>
              <h2 class="card-title text-xl font-bold">${item.title}</h2>
              <p>${item.description}</p>
              <div class="card-actions flex space-x-4 justify-start">
                  <img class="w-12 h-12 rounded-full" src="${item.profile_image
            }" alt="">
                  <div>
                      <h4 class="text-lg font-bold">${item.author.name}</h4>
                      <p>${item.author ? item.author.designation || "Unknown" : "Unknown"}</p>
                  </div>
              </div>
          </div>
      </div>
          `

        latestPostContainer.appendChild(div)
    });
};

const handleSearch = async () => {
    const inputValue = document.getElementById('search-box').value;
    await loadAllNews(inputValue);

};

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);



loadLatestPost();
loadAllNews()