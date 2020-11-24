
{% assign repos = site.github.public_repositories |
  sort: 'stargazers_count' |
  reverse %}

{% for repository in repos %}
{% unless site.optinrepos[repository.name] %}{% continue %}{% endunless %}

{% assign lang = repository.language %}
{% unless site.optinrepos[repository.name].lang == nil %}
  {% assign lang = site.optinrepos[repository.name].lang %}
{% endunless %}

<div class="block block--padded block--rounded block--bordered {{lang | downcase}}">
<p class="block__content">{{lang}}</p>
<h3 class="block__heading heading--4">
  <a href="{{repository.homepage}}">{{repository.name}}</a>
</h3>
<p class="block__content">
  <p>{{repository.description}}</p>
  <span>Stars: {{repository.stargazers_count}}</span>
  <span>Forks: {{repository.forks_count}}</span>
  <p>
    <a href="{{repository.html_url}}">Github</a> <a href="{{repository.homepage}}">Website</a>
  </p>
</p>
</div>
{% endfor %}
