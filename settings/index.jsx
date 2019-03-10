import { tiles } from "./tilesWithEmbeddedImages";
import locked from "./locked.png"

function settingsComponent(props) {
  return (
    <Page>
      {/* TODO generate list of tile sets from tiles */}
      {tileSetSection(props, "Nature")}
    </Page>
  );
}

function tileSetSection(props, tileSet) {
  return (
    <Section title={<Text bold align="center">{tileSet}</Text>}>
      {selectTileSetButton(props, tileSet)}
      {tiles.filter(inTileSet(tileSet)).map(tile =>
        <TextImageRow label={tile.name} sublabel={subLabel(props, tile)} icon={tileImage(props, tile)} />
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
  const currentTileSet = props.settingsStorage.getItem("tileSet");
  if (currentTileSet !== tileSet) {
    return (<Button>tileSet</Button>);
  }
}

function subLabel(props, tile) {
  const status = props.settingsStorage.getItem(getUnlockedTileKey(tile));
  if (status) {
    return `Unlocked on ${status}`;
  }

  return "Locked";
}

function tileImage(props, tile) {
  const status = props.settingsStorage.getItem(getUnlockedTileKey(tile));
  if (status) {
    return tile.image;
  }

  return locked;
}

function getUnlockedTileKey(tile) {
  return `unlockedTile-${tile.id}`;
}

registerSettingsPage(settingsComponent);