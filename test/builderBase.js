module.exports = class BuilderBase {
    constructor() {
        this.actions = [];
    }

    withProp(action) {
        this.actions.push(action);
        return this;
    }

    runActions(entity) { 
        this.actions.forEach(a => {
            a(entity);
        });

        return entity;
    }
}