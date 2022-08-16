// languages and progress  bar
//lang repo rights on the same line
//string template literal to replace my username with what the user inputs

//select our form by id/query/ name
const form = document.getElementById('signup');
//add eventListener to our form submit type and pass an event into our second arg. 
//add preventDefault() so our page doesnt behave in its default behaviour
form.addEventListener('submit', (event) => {
    event.preventDefault();
    //select the input element through form.elements save to variable "username"
    const username = form.elements['search'].value;
    // console.log(username)
    //take our variable and insert it into our fetch url using string template literal
    fetch(`https://api.github.com/users/${username}`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            const { stargazers_count, forks_count, full_name, html_url } = data;
            const { created_at, name, location, public_repos, followers } = data;
            console.log('user:', { data })
            renderUsername(data?.login || 'NOT FOUND')
            renderBio(data?.bio)
            newUrl(data?.url)
            renderParagraph(created_at, name, location, public_repos, followers)
            renderPopRepos(stargazers_count, forks_count, full_name, html_url)
        })
        .catch(err => {
            console.log(err);
        })

});

const renderUsername = (username) => {
    const heading = document.getElementById('user');

    heading.innerHTML = username;
}

const renderBio = (bio) => {
    const bioHeading = document.getElementById('firstheading');

    if (bio) bioHeading.innerHTML = bio;
}

// TODO CREATE RESET FUNCTION THAT RUNS ON EVERY SUBMISSION
// Should reset all data to base state

const newUrl = (linkTitle, url) => {
    const link = document.querySelector('a');
    if (linkTitle) link.innerHTML = linkTitle;
    if (url) link.setAttribute('href', url);
}


const renderParagraph = (created_at, name, location, public_repos, followers) => {
    const firstParagraph = `On GitHub since ${created_at}, ${name} is a developer based in ${location}, with ${public_repos} public repositories and ${followers} followers.`

    const newParagraph = document.getElementById('firstP');
    if (firstParagraph) newParagraph.innerHTML = firstParagraph;
}

//from all repos sort by most(how many times somesones starred your repo)stargazers and display top 3 most popular paginate

const renderPopRepos = (stargazers_count, forks_count, full_name, html_url) => {
    const repoParagraph = `This repository has ${stargazers_count} stars and ${forks_count} forks. If you would like more information about this
      repository
      and my contributed code, please visit <a href=${html_url}>${full_name}</a> on Github.`

    const firstRepo = document.getElementById('firstRepo');
    if (repoParagraph) firstRepo.innerHTML = repoParagraph;
}


