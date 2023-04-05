const githubUsername = 'Mateodioev';
getUsernames(githubUsername)
	.then(repos => {
		console.log(repos);

		const repoList = document.getElementById('github-repos');

		repos.forEach(repo => {
			addRepo(repo, repoList);
		});
	});

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
    div.appendChild(getSvg(getStartIcon()));
    div.appendChild(document.createTextNode(repoData.starts + ' - '));
    // forks
    div.appendChild(getSvg(getForkIcon()));
    div.appendChild(document.createTextNode(repoData.forks + ' - '));
    // watchers
    div.appendChild(getSvg(getWatcherIcon()));
    div.appendChild(document.createTextNode(repoData.watchers + ' - '));
    return div;
}

function getStartIcon() {
    const icon = document.createElement('path');
    icon.d = "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z";

    return icon;
}

function getForkIcon() {
    const icon = document.createElement('path');
    icon.d = "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z";

    return icon;
}

function getWatcherIcon() {
    const icon = document.createElement('path');
    icon.d = "M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z";

    return icon;
}

function getSvg(chilIcon) {
    const svg = document.createElement('svg');
    svg.appendChild(chilIcon);

    return svg;
}

function getIcon(language) {
    if (language == "Go") {
        return "golang";
    }
    return "php";
}
