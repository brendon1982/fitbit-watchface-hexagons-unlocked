import {availableTiles} from "./tilesWithEmbeddedImages";

registerSettingsPage(settingsComponent);

function settingsComponent(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            App Settings
          </Text>
        }
      >
      {availableTiles.map(tile => 
        <TextImageRow label={tile.name} sublabel={tile.sets} icon={tile.image} />
      )}
      </Section>
    </Page>
  );
}