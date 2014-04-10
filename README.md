Shopify Open Source
=====================

Shopify's Open Source page is build with [Jekyll](http://jekyllrb.com/) and [Sass](http://sass-lang.com/) and hosted on [GitHub Pages](http://pages.github.com/).

If you want to run it locally
--
1. Clone this branch or [download the zip](https://codeload.github.com/Shopify/shopify.github.com/zip/master) and navigate to the folder in terminal
2. Install Jekyll: `gem install jekyll`
3. Install Sass: `gem install sass`
    * Use `sass -v` to make sure it worked
4. Install Compass: `gem install compass`
5. Make sure everything is setup with `bundle install`
6. Run `jekyll serve --watch`
7. In another terminal window, run `compass watch`
8. Access the docs at `http://localhost:4000`

### Notes about local build
- `jerkyll serve --watch` will compile the Jekyll and Sass files into static assets in the **_site** folder each time a file is saved. That folder is excluded from the repo.
- `compass watch` will update ie.css and main.css.
- Use `rake build` to manually parse SCSS files.
- There is no easy way to use Jekyll plugins with GitHub pages, so none are used here.


Dependencies (all included)
--
- **[jQuery 1.9](https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js)**
- **[Modernizr](http://modernizr.com/)**
- **[Bourbon](http://bourbon.io/)**
- **[Handlebars.js](http://handlebarsjs.com/)**
- **[Isotope](http://isotope.metafizzy.co/)**