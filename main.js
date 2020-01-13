// const declaration
const path = require('path');
const electron = require('electron');
const c = require('./app/constants');
const Helper = require('./app/helper');
const AppTray = require('./app/app_tray');
const setAppMenu = require('./app/app_menu');
const MainWindow = require('./app/main_window');
const ElectronPrefs = require('electron-prefs');

const { app, Menu, ipcMain, Notification } = electron;


let mainWindow;
let spinnerWindow;
let offlineWindow;
let tray;
let isQuitting;
let appIconPath;

// User and Window Preferences
const prefs = new ElectronPrefs({
  fileName: 'config.js',
  defaults: {
    window: {
      x: 0,
      width: 800,
      height: 600
    }
  }
});

// before-quit listener
app.on('before-quit', function() {
  isQuitting = true;
});

// Initialization
app.on('ready', () => {

  // Setup icons
  let appIcon = 'app-win.ico';
  let trayIcon = 'tray-win.ico';

  // Determine OS
  if (Helper.isLinux()) {
    appIcon = 'app-linux512x512.png';
    trayIcon = 'tray-linux32x32.png';
  }

  if (Helper.isMacOS()) {
    appIcon = 'app-mac.png';
    trayIcon = 'tray-mac.png';
  }

  // Set Paths
  const trayIconPath = path.join(__dirname, 'src', 'assets', trayIcon);
  appIconPath = path.join(__dirname, 'src', 'assets', appIcon);

  // Load Animation
  loadAppWindows(c.settings.showLoader);

  // create MainWindow and tray
  setAppMenu(mainWindow);
  tray = new AppTray(trayIconPath, mainWindow);

// Load and Create MainWindow
function loadAppWindows(showLoader) {

  // Set path for main URL
  let appPath = c.settings.appUrl;

  // check shell
  if (Helper.usePhotonKitShell()) {
    appPath = `file://${__dirname}/src/shellMacOS.html`;
  } else if (Helper.useWindowsShell()) {
    appPath = `file://${__dirname}/src/shellWindows.html`;
  } else if (Helper.useLinuxShell()) {
    appPath = `file://${__dirname}/src/shellLinux.html`;
  }

  // create mainWindow
  mainWindow = new MainWindow(appPath, appIconPath, !showLoader);

  // minimize Listener
  mainWindow.on('minimize', function(event) {
      mainWindow.minimize();
  });

  // close to tray listener
  mainWindow.on('close', function (event) {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });

});