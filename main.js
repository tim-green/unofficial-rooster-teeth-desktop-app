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
