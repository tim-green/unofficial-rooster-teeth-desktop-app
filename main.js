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