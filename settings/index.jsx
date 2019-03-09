import { tiles } from "./tilesWithEmbeddedImages";

let props;
function settingsComponent(p) {
  props = p;
  return (
    <Page>
      <Section title={<Text bold align="center">Nature</Text>}>
        {tiles.map(tile =>
          <TextImageRow label={tile.name} sublabel={subLabel(tile)} icon={tileImage(tile)} />
        )}
      </Section>
    </Page>
  );
}

function subLabel(tile) {
  const status = props.settingsStorage.getItem(getUnlockedTileKey(tile));
  if (status) {
    return `Unlocked on ${status}`;
  }

  return "Locked";
}

function tileImage(tile) {
  const status = props.settingsStorage.getItem(getUnlockedTileKey(tile));
  if (status) {
    return tile.image;
  }

  return null;
}

function getUnlockedTileKey(tile) {
  return `unlockedTile-${tile.id}`;
}

registerSettingsPage(settingsComponent);