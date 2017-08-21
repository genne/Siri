import { inject } from 'aurelia-dependency-injection';
import { Project, ProjectItem, CLIOptions, UI } from 'aurelia-cli';

var path = require('path');

@inject(Project, CLIOptions, UI)
export default class ElementGenerator {
  constructor(private project: Project, private options: CLIOptions, private ui: UI) { }

  execute() {
    let self = this;

    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the component?')
      .then(name => {

        return self.ui.ensureAnswer(this.options.args[1], 'What sub-folder would you like to add it to?\nIf it doesn\'t exist it will be created for you.\n\nDefault folder is the source folder (src).', ".")
          .then(subFolders => {

            let fileName = this.project.makeFileName(name);
            let className = this.project.makeClassName(name);
            let cssClassName = this._makeCssClassName(className);

            self.project.root.add(
              ProjectItem.text(path.join(subFolders, fileName + ".ts"), this.generateJSSource(className)),
              ProjectItem.text(path.join(subFolders, fileName + ".html"), this.generateHTMLSource(fileName, cssClassName)),
              ProjectItem.text(path.join(subFolders, fileName + ".scss"), this.generateSASSSource(cssClassName))
            );

            return this.project.commitChanges()
              .then(() => this.ui.log(`Created ${name} in the '${path.join(self.project.root.name, subFolders)}' folder`));
          });
      });
  }

  generateJSSource(className) {
    return `export class ${className} {    
}`
  }

  generateHTMLSource(fileName, cssClassName) {
    return `<template class="${cssClassName}">
    <require from="./${fileName}.css"></require>
</template>`
  }

  generateSASSSource(className) {
    return `.${className} {
}`
  }

  private _makeCssClassName(className: string) {
    return className[0].toLowerCase() + className.substr(1);
  }
}
