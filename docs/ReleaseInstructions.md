# Release Instructions
```bash
git checkout -b release/<version> develop

# Generate translation template
gulp pot
git add po/template.pot
git commit -m 'chore(translations): update translation template'
# Update translation files as required in po/<lang>.po
git add po/*.po
git commit -m 'chore(translations): update translations'

# bump version number in package.json
gulp changelog
git add package.json CHANGELOG.md
git commit -m 'chore(release): release <version>'

git checkout master
git merge release/<version>
git push

git tag -a <version> master
git push --tag

git checkout develop
git merge release/<version>
git push

git branch -d release/<version>
```
