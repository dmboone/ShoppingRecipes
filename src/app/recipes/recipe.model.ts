// in this file we want to define a model or blueprint for what every recipe should have

export class Recipe { // list the recipe variables here
    public name: string; // name of recipe
    public description: string; // description of recipe
    public imagePath : string; // url path to image of recipe

    constructor(name: string, desc: string, imagePath: string){ // runs as soon as the Recipe model is used with this info passed in; basically like when we create a Recipe object
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}