const searchBTN = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const devInfo = document.getElementById('devProfile');

searchBTN.addEventListener('click', () => {

        const userinfo = searchBar.value;
        const url = `https://api.github.com/users/${userinfo}`;
        fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('Sorry, no user found');
             }   
            return response.json();
        })
        .then(data => {
            const user = data;
            console.log(data);
            if(user && Object.keys(user).length > 0)  {
                // This will check if the user object isn't empty and has some data
                devInfo.classList.add('show');
                devInfo.innerHTML = '';
                displayUsers(user);
            
            } else {
                devInfo.innerHTML = '';
            }
        })
        .catch(err => console.log(err));
        devInfo.innerHTML = 'Sorry, no user found';
    });

    const displayUsers = (user) => {
      
        const { avatar_url, login, html_url,bio,company,twitter_username,location,followers,following,public_repos,created_at} = user;
        
        // Date formatting
        const date = new Date(created_at);
        const dateOptions= {day: 'numeric', month: 'long', year: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
        // End of date formatting

        
        devInfo.innerHTML = `    
                            <img class="avatar" src ="${avatar_url}" alt="user image"> 
                             <div class="pseudo">	   
                                <div class="center">   
                                     <h3>${login}</h3>
                                     <p> ${company}</p> 
                                </div>
                             </div><br>
                             <div class="stat">
                             <div class="row">
                                <div class="center">
                                    <h3>${public_repos}</h3>
                                    <p>Repos</p>  
                                </div>
                                <div class="center">        
                                    <h3>${followers}</h3>
                                    <p>Followers</p> 
                                </div>
                                <div class="center">
                                    <h3>${following}</h3>
                                    <p>Following</p> 
                                </div>
                              </div>
                              </div><br>
                             <div class="inline">
                                <p><svg  stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>   ${twitter_username ? twitter_username : 'Not Available'} </p>
                                <p><svg  stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></svg> ${company}</p>
                                <a href="${html_url}" target="_blank"><svg  stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>&nbsp;${html_url}</a> 
                                <p><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path> </svg>   ${location}</p>
                             </div><br>
                            
                             <div class="bio">
                               <p>Biography<br><div class='bioinfo'>${bio}</div></p>
                             </div> <br>
                             <div class="bottom"> 
                                <p> Joined On <br> ${formattedDate}</p>
                             </div>
                             `;
       
      }

