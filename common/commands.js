export const changeTileSet = "command.changetileset"

export function createChangeTileSetMessage (tileSet) {
    return {
        command: changeTileSet,
        tileSet: tileSet
    }
}