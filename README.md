Shopify Open Source
=====================

If you want to run it locally
--
1. create a personal access token under your github developer settings
1. `bundle install`
1. Run `JEKYLL_GITHUB_TOKEN=[you personal access token] bundle exec jekyll serve`
1. Access the page at `http://localhost:4000`

### Adding opt in repo to page
To add a new repo to be displayed on the page, you need to edit `optinrepos` in `_config.yml`.
Add the repo name (`themekit` in the case of `Shopify/themekit`) to the list and it will
then get populated as well.

### Content Management
- The content for each project comes from the GitHub Pages for that repo.
This can be from a `gh-pages` branch, or from the `/docs` directory, based on the [GitHub Pages settings].
Using the `/docs` directory is preferred as it's less confusing for contributors.

[GitHub Pages settings]: https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

