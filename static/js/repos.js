const githubUsername = 'Mateodioev';
// getUsernames(githubUsername)
// 	.then(repos => {
// 		console.log(repos);

// 		const repoList = document.getElementById('github-repos');

// 		repos.forEach(repo => {
// 			addRepo(repo, repoList);
// 		});
// 	});

getUsernames(githubUsername).then(repos => {
	const repoList = document.getElementById('github-repos');

	repos.forEach(repo => {
		repoList.appendChild(parseRepo(repo));
	})
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

function parseRepo(data) {
	const container = document.createElement('div');
	container.className = "slide";

	container.appendChild(createRepoTitle(data));
	container.appendChild(createRepoHr());
	container.appendChild(createRepoDescription(data));
	container.appendChild(createRepoHr());
	// add tags
	container.appendChild(createRepoTags(data));
	container.appendChild(createRepoHr());
	container.appendChild(createRepoStats(data));
	container.appendChild(createRepoHr());
	container.appendChild(createRepoLink(data));
	container.appendChild(createRepoHr());

	return container;
}

function createRepoTitle(repoData) {
	// <h3>Titulo del repositorio</h3>
	const title = document.createElement('h2');
	title.textContent = repoData.full_name;
	return title;
}

function createRepoHr() {
	const hr = document.createElement('hr');
	hr.className = "light-hr";

	return hr;
}

function createRepoDescription(repoData) {
	const paragraph = document.createElement('p');
	paragraph.textContent = (repoData.description ?? "\"No hay descripcion\"");
	return paragraph;
}

function createRepoTags(repoData) {
	const ul = document.createElement('ul');
	ul.className = "github-topics just-content";

	repoData.topics.map(topic => {
		var li = document.createElement('li');
		li.textContent = `#${topic}`;
		ul.appendChild(li);
	});

	return ul;
}

function createRepoStats(repoData) {
    const paragraph = document.createElement('p');
    paragraph.className = "just-content";
    // starts
    paragraph.appendChild(getStart(repoData.starts));
    // forks
    paragraph.appendChild(getFork(repoData.forks));
    // watchers
    paragraph.appendChild(getWatcher(repoData.watchers));
    return paragraph;
}

function createRepoLink(repoData) {
	const paragraph = document.createElement('p');
	paragraph.className = "github-link";

	paragraph.appendChild(document.createTextNode("Ver en github: "));

	const link = document.createElement('a');
	link.href  = repoData.url;
	link.textContent = repoData.full_name;

	paragraph.appendChild(link);

	return paragraph;
}

function getStart(starts) {
    const span = document.createElement('span');
    span.appendChild(getImgPath('start'));
    span.appendChild(document.createTextNode(`Starts: ${starts}`));

    return span;
}

function getFork(forks) {
	const span = document.createElement('span');
    span.appendChild(getImgPath('git-fork'));
    span.appendChild(document.createTextNode(`Forks: ${forks}`));

    return span;
}

function getWatcher(watchers) {
	const span = document.createElement('span');
    span.appendChild(getImgPath('eye'));
    span.appendChild(document.createTextNode(`Watchers: ${watchers}`));

    return span;
}

function getImgPath(path) {
	const img = document.createElement('img');
	img.src = `static/images/${path}.svg`;
	return img;
}
