import * as settingsKeys from "../common/settingsKeys";
import { tiles } from "./tilesWithEmbeddedImages";
import locked from "./locked.png"

function settingsComponent(props) {
  return (
    <Page>
      {backupSection(props)}
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

function backupSection(props) {
  if (!props.settingsStorage.getItem(settingsKeys.backupAccessToken())) {
    return backupLogin(props);
  } else {
    return backupMenu(props);
  }
}

function backupLogin(props) {
  return (
    <Section title={<Text bold align="center">Progress Backup</Text>}>
      <Oauth
        settingsKey={settingsKeys.backupAccessToken()}
        title="Google Drive Backup"
        label="Google Drive Backup"
        status="Login"
        authorizeUrl="https://accounts.google.com/o/oauth2/auth"
        requestTokenUrl="https://oauth2.googleapis.com/token"
        clientId="97058396636-3na443t1hc064f358l81ju3fa96fkkdp.apps.googleusercontent.com"
        clientSecret="cbanGxLKVaN4_yU5wWCXTlZd"
        scope="https://www.googleapis.com/auth/drive.appdata"
        pkce
        onAccessToken={async () => { clearBackupMessage(props) }}
      />
      <Text align="center">{props.settingsStorage.getItem(settingsKeys.backupMessage())}</Text>
    </Section>
  );
}

function backupMenu(props) {
  return (
    <Section title={<Text bold align="center">Progress Backup</Text>}>
      <Button label="Backup" onClick={() => backupProgress(props)}></Button>
      <Button label="Logout" onClick={() => logoutOfBackup(props)}></Button>
      <Text align="center">{props.settingsStorage.getItem(settingsKeys.backupMessage())}</Text>
    </Section>
  );
}

function backupProgress(props) {
  props.settingsStorage.setItem(settingsKeys.backupDate(), new Date().toISOString());
}

function logoutOfBackup(props) {
  clearBackupMessage(props);
  props.settingsStorage.removeItem(settingsKeys.backupAccessToken());
}

function clearBackupMessage(props) {
  props.settingsStorage.setItem(settingsKeys.backupMessage(), "");
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
  const currentTileSet = props.settingsStorage.getItem(settingsKeys.tileSet());
  if (currentTileSet !== tileSet) {
    return (<Button label="Switch to this tile set" onClick={() => switchToTileSet(props, tileSet)}></Button>);
  }
}

function switchToTileSet(props, tileSet) {
  props.settingsStorage.setItem(settingsKeys.tileSet(), tileSet);
}

function subLabel(props, tile) {
  const status = props.settingsStorage.getItem(settingsKeys.unlockedTile(tile));
  if (status) {
    return `Unlocked on ${status}`;
  }

  return "Locked";
}

function tileImage(props, tile) {
  const status = props.settingsStorage.getItem(settingsKeys.unlockedTile(tile));
  if (status) {
    return tile.image;
  }

  return locked;
}

registerSettingsPage(settingsComponent);