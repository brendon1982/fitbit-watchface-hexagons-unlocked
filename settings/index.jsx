import { availableTiles } from "./tilesWithEmbeddedImages";

let props;
function settingsComponent(p) {
  props = p;
  return (
    <Page>
      <Section title={<Text bold align="center">Nature</Text>}>
        {availableTiles.map(tile =>
          <TextImageRow label={tile.name} sublabel={subLabel(tile)} icon={tileImage(tile)} />
        )}
      </Section>
    </Page>
  );
}

function subLabel(tile) {
  const status = props.settingsStorage.getItem(tile.id.toString());
  if(status){
    return `Unlocked on ${status}`;
  }

  return "Locked";
}

function tileImage(tile) {
  const status = props.settingsStorage.getItem(tile.id.toString());
  if (status) {
    return tile.image;
  }

  return null;
}

registerSettingsPage(settingsComponent);