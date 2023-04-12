const githubUsername = 'Mateodioev';
// getUsernames(githubUsername)
// 	.then(repos => {
// 		console.log(repos);

// 		const repoList = document.getElementById('github-repos');

// 		repos.forEach(repo => {
// 			addRepo(repo, repoList);
// 		});
// 	});

async function getUsernames(username) {

	try {
		const response = await fetch(`https://api.github.com/users/${username}/repos`);
		const data = await response.json();

		return data.filter(function (repo) {
			return !(repo.archived || repo.fork);
		}).map(repo => {
			return {
				full_name: repo.full_name,
				name: repo.name,
				description: repo.description,
				url: repo.html_url,
				username: username,
				language: repo.language,
				topics: repo.topics,
				starts: repo.stargazers_count,
				forks: repo.forks,
				watchers: repo.watchers_count,
			}
		});
	} catch (error) {
		console.error(error);
		return [];
	}
}

function addRepo(repoData, domElement) {
	const repoContainer = createRepoContainer(repoData);

	repoContainer.appendChild(createRepoTitle(repoData));
	repoContainer.appendChild(createRepoHr());
	repoContainer.appendChild(createRepoDescription(repoData));
    repoContainer.appendChild(createRepoHr());
    repoContainer.appendChild(createRepoStats(repoData));
	domElement.appendChild(repoContainer);
}

function createRepoContainer(repoData) {
	const repoContainer = document.createElement('div');
	repoContainer.className = "card-container github-card";

	return repoContainer;
}

function createRepoTitle(repoData) {
	// <h2 style="text-align: center;padding-bottom: 10px;"><a href="{repoData.url}">{repoData.full_name}</a></h2>
	const h2title = document.createElement('h2');
	const repoLink = document.createElement('a');

	repoLink.href = repoData.url;
	repoLink.textContent = repoData.full_name;
    repoLink.target = "_blank";
	h2title.appendChild(repoLink);

	return h2title;
}

function createRepoHr() {
	const hr = document.createElement('hr');
	hr.className = "light-hr";

	return hr;
}

function createRepoDescription(repoData) {
	const span = document.createElement('span');
	span.textContent = "\"" + (repoData.description ?? "No hay descripcion") + "\"";

    span.appendChild(createBr());
    span.appendChild(createRepoLangs(repoData));
	return span;
}

function createRepoLangs(repoData) {
    const span = document.createElement('span');
    span.textContent = ' ' + repoData.topics.map(topic => {
        return '#' + topic;
    }).join(', ');

    const spanIcon = document.createElement('span');
    spanIcon.className = "fa-brands fa-" + getIcon(repoData.language);

    span.appendChild(spanIcon);
    return span;
}

function createBr() {
    return document.createElement('br');
}

function createRepoStats(repoData) {
    const div = document.createElement('span');
    div.style = "display: inline-block";
    // starts
    div.appendChild(getStartIcon());
    div.appendChild(document.createTextNode(repoData.starts + ' - '));
    // forks
    div.appendChild(getForkIcon());
    div.appendChild(document.createTextNode(repoData.forks + ' - '));
    // watchers
    div.appendChild(getWatcherIcon());
    div.appendChild(document.createTextNode(repoData.watchers));
    return div;
}

function getStartIcon() {
    const icon = document.createElement('img');
	icon.src = "static/images/start.svg";
	icon.width = "16";
	icon.height = "16";
    // icon.className = "fa-thin fa-star";

    return icon;
}

function getForkIcon() {
    const icon = document.createElement('img');
	icon.src = "static/images/git-fork.svg";
	icon.width = "16";
	icon.height = "16";

    return icon;
}

function getWatcherIcon() {
    const icon = document.createElement('img');
	icon.src = "static/images/eye.svg";
	icon.width = "16";
	icon.height = "16";

    return icon;
}

function getIcon(language) {
    if (language == "Go") {
        return "golang";
    }
    return "php";
}
