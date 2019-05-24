import * as settingsKeys from "../common/settingsKeys";
import { tiles } from "./tilesWithEmbeddedImages";

function settingsComponent(props) {
  return (
    <Page>
      {tileSets().map(set => tileSetSection(props, set))}
    </Page>
  );
}

function tileSets() {
  const sets = [];
  tiles.forEach((tile) => {
    tile.sets.forEach((set) => {
      if (!sets.includes(set)) {
        sets.push(set);
      }
    })
  });

  return sets;
}

function tileSetSection(props, tileSet) {
  return (
    <Section title={<Text bold align="center">{tileSet}</Text>}>
      {selectTileSetButton(props, tileSet)}
      {tiles.filter(inTileSet(tileSet)).map(tile =>
        <TextImageRow label={tile.name} icon={tile.image} />
      )}
    </Section>
  )
}

function inTileSet(tileSet) {
  return function (tile) {
    return tile.sets.some(set => set === tileSet);
  }
}

function selectTileSetButton(props, tileSet) {
  const currentTileSet = props.settingsStorage.getItem(settingsKeys.tileSet());
  if (currentTileSet !== tileSet) {
    return (<Button label="Switch to this tile set" onClick={() => switchToTileSet(props, tileSet)}></Button>);
  }
}

function switchToTileSet(props, tileSet) {
  props.settingsStorage.setItem(settingsKeys.tileSet(), tileSet);
}

registerSettingsPage(settingsComponent);