const changeTileSet = "command.changetileset"
const createChangeTileSetMessage = function (tileSet) {
    return {
        command: changeTileSet,
        tileSet: tileSet
    }
}

export {
    changeTileSet,
    createChangeTileSetMessage
}