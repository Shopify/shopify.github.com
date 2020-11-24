---
title: Introduction
section: intro
---

{% for repository in site.github.public_repositories %}
{% assign custom = site.optinrepos[repository.name] %}
{% if custom %}

<div class="{{repository.language | downcase}}">
Name: {{repository.name}}
url: {{repository.html_url}}
Full Name: {{repository.full_name}}
lang: {% if custom.lang == nil %}{{repository.language}}{% else %}{{custom.lang}}{% endif %}
desc: {{repository.description}}
stars: {{repository.stargazers_count}}
forks: {{repository.forks_count}}
homepage: {{repository.homepage}}
{% unless custom.icon == nil %}Icon: {{custom.icon}}{% endunless %}
</div>

{% endif %}
{% endfor %}
