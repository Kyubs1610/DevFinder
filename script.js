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
                devInfo.innerHTML = 'No user found';
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

        const userDiv = document.createElement('div');
        userDiv.innerHTML = `<img class="avatar" src ="${avatar_url}" alt="user image"> 

        

                             <h3>${login}</h3>
                             <p>${company}</p> 

                             <p>${followers} Followers </p> 
                             <p>${following} Following </p> 
                             <p>${public_repos} Repos</p> 

                             <p>${twitter_username ? twitter_username : 'Not Available'} </p>
                             <p>${company}</p>
                             <a href="${html_url}"></a> 
                             <p>${location}</p> 

                             <p>${bio}</p> 
                              
                              
                            <p> Joined On ${formattedDate}</p>`;

      
        devInfo.appendChild(userDiv);
      
      
      }

