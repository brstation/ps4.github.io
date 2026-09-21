var menuData = {
  "Main": {
    "ID": "MainMenu",
    "class": "MenuClass",
    "style": "display:block",
    "payloads": [
      {
        "PL-Title": "Main Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains payloads to exploit and run homebrew on <br>your 9.00 firmware PS4.<br>Other payloads that are frequently used can also be found<br>here like FTP and Bin Loader.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "GoldHEN",
        "PL-Bin": "GoldHEN.bin",
        "PL-Ver": "By SiSTRo",
        "PL-Desc": "<b>* PRESS R1 TO CHANGE VERSION *<br>* PRESS L1 TO SET AutoLoad After Exploit ON/OFF *</b><br>Homebrew Enabler, Enable Debug Settings, PSVR Support,<br>External HDD Support, Remote PKG Installer Support,<br>Full Rest Mode Support, Debug Trophies Support, Enable UART,<br>Enable Blocked Screenshots, FTP Server on port 2121,<br>BinLoader Server on port 9090.",
        "Icon": "<img src=\"img/hen.svg\">",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      // {
      //   "PL-Title": "Bin Loader",
      //   "PL-Bin": "BINLOADER",
      //   "PL-Ver": "v1.0 - By Specter",
      //   "PL-Desc": "Loads a bin or elf file sent to the PS4 IP address on port 9020.<br>Netcat or Netcat GUI is recommended to send the files to the PS4.",
      //   "Icon": "&#xf019;",
      //   "FW": ["9.xx","8.xx","7.xx"]
      // },
      {
        "PL-Title": "FTP Server",
        "PL-Bin": "pl_FTP.bin",
        "PL-Ver": "v1.08b -By hippie68 / Port By Al Azif",
        "PL-Desc": "A full access FTP server for the PS4.<br>Connect your FTP client to the IP address that the <br>popup message tells you.<br>The FTP port number is 1337.",
        "Icon": "<img src=\"img/ftp.svg\">",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "App2USB",
        "PL-Bin": "pl_App2usb.bin",
        "PL-Ver": "v5.0 - Original Version By Stooged / Port By Al Azif",
        "PL-Desc": "Move installed games from your internal HDD to an<br>external exFAT formatted USB drive.<br>Put app2usb.ini in a folder named PS4 on root of your USB drive.<br><br>",
        "Icon": "&#xf01c;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Orbis Toolbox",
        "PL-Bin": "pl_OrbisTB.bin",
        "PL-Ver": "v1190 Alpha - By OSM-Made",
        "PL-Desc": "A modification of the playstation UI to help with<br>launching and developing homebrew..",
        "Icon": "&#xf0b1;",
        "FW": ["9.00","7.xx"]
      },
      {
        "PL-Title": "Exit IDU",
        "PL-Bin": "pl_ExitIDU.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "A modification of the playstation UI to help with<br>launching and developing homebrew..",
        "Icon": "&#xF08B;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Tools": {
    "ID": "ToolsMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Tools Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains tools to do various tasks and change things on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PSFree/Lapse Fix",
        "PL-Bin": "pl-PsfreeFix.bin",
        "PL-Ver": "v1.0.0 - By RandQalan /Payload By Nazky",
        "PL-Desc": "PSFree/Lapse Fix is a payload that uses a trick to fix the game's running problem. This payload installs a plugin on your console. Make sure to run the plugin on your device using GoldHEN.",
        "Icon": "&#xF0AD;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Sign NP Save/Remote",
        "PL-Bin": "pl_np-sign-ps4.bin",
        "PL-Ver": "v1.00",
        "PL-Desc": "Activate Save & Remote PS4.",
        "Icon": "&#xf0b1;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PS4Debug",
        "PL-Bin": "pl_PS4debug.bin",
        "PL-Ver": "v1.1.19 - By CTN",
        "PL-Desc": "PS4Debug for SaveMounter and Profile Activator.",
        "Icon": "&#xf188;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "sflash Dumper",
        "PL-Bin": "pl_ps4-sflash0-dumper.bin",
        "PL-Ver": "v1.0 - Original Version By Andryshik345",
        "PL-Desc": "Dump a copy of your sflash to your USB drive.<br>",
        "Icon": "&#xf828;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Kernel Dumper",
        "PL-Bin": "pl_KernelDumper.bin",
        "PL-Ver": "v1.0 - Original Version By Eversion / Port By Al Azif",
        "PL-Desc": "Dump a copy of your kernel to your USB drive.<br><br>Your kernel will be dumped to: KernelDump.bin on your USB drive.",
        "Icon": "&#xf828;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Kernel Madule Dumper",
        "PL-Bin": "pl_ModuleDumper.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Kernel Madule Dumper Payload",
        "Icon": "&#xf828;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "History Blocker",
        "PL-Bin": "pl_HistoryBlocker.bin",
        "PL-Ver": "v2.0 - Original Version By Stooged / Port By Al Azif",
        "PL-Desc": "Disable the auto opening of the last page used in the PS4 WebBrowser.<br><br>Run the payload again to disable this feature.",
        "Icon": "&#xf686;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Disable Updates",
        "PL-Bin": "pl_UpdatesDisable.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Creates dummy files in the PS4 update folder to prevent the download of unwanted system updates.<br>It also deletes any existing updates if they already exist.<br><br>! You only ever have to run this once !",
        "Icon": "&#xf771;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Enable Updates",
        "PL-Bin": "pl_UpdatesEnable.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Removes the dummy files in the PS4 update folder to enable the download of updates again.<br><br>Run this if you have previously disabled updates and wish to update your console.",
        "Icon": "&#xf772;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Disable ASLR",
        "PL-Bin": "pl_DisableASLR.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Disables the ASLR (Address space layout randomization) to make working with memory easier/repeatable.",
        "Icon": "&#xf771;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Enable Browser",
        "PL-Bin": "pl_EnableBrowser.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Permenently activates the browser without needing to sign into PSN.",
        "Icon": "&#xf772;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Kernel Clock",
        "PL-Bin": "pl_KernelClock.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Changes the internal clock of the PS4, can be used to reactive licenses/features.",
        "Icon": "&#xF017;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Permanent UART",
        "PL-Bin": "pl_PermanentUART.bin",
        "PL-Ver": "v1.02 - By JTAG7371 / Port By Al Azif",
        "PL-Desc": "Enables Permanent UART for PS4.",
        "Icon": "&#xF532;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "RIF Renamer",
        "PL-Bin": "pl_RIFRenamer.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Renames 'fake' RIFs to 'free' RIFs for better HEN compatibility. Use this if your PKGs only work with Mira+HEN.",
        "Icon": "&#xF573;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Backup": {
    "ID": "BackupMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Backup Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "** More payloads will be added here soon... **<br>Contains various payloads to backup all aspect of useful things on your PS4.<br><br>NOTE! These backups will only work on your current Profile and accountID!<br>If you plan to initialize or replace your HDD you must also make a backup of your existing profile using the official backup/restore app in system settings!",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Database Backup",
        "PL-Bin": "pl_DBbackup.bin",
        "PL-Ver": "v1.0 - By Leeful / Port By Al Azif",
        "PL-Desc": "Create a backup of important database files.<br><br>A backup of your app databases will be created and saved internally on your PS4 HDD and also to USB if a USB drive is inserted.",
        "Icon": "&#xf56e;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PKG-BackUP",
        "PL-Bin": "pl_PKGBackup.bin",
        "PL-Ver": "v1.23 - By Kameleon(kmeps4)",
        "PL-Desc": "Modded Version of App Dumper to Backup PKG files to External HDD",
        "Icon": "&#xF56D;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Restore": {
    "ID": "RestoreMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Restore Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "** More payloads will be added here soon... **<br>Contains various payloads to restore all aspect of useful things on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Database Restore",
        "PL-Bin": "pl_DBrestore.bin",
        "PL-Ver": "v1.0 - By Leeful / Port By Al Azif",
        "PL-Desc": "Restore a backup of the database files created by 'Database Backup'<br><br>The backup will be restored from either the Internal HDD or from USB if a USB drive is inserted.<br>If a USB drive is inserted, the backup on the USB will be the one used to restore.",
        "Icon": "&#xf56f;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Dumper": {
    "ID": "DumperMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Game Dumper Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains payloads to dump games from your PS4 <br>so that you can then build your own fake packages that you can install.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Dump Game & Update (PS4 App Dumper)",
        "PL-Bin": "pl_DumperApp.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / Port and Mod By Al Azif",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump your game and game update (if there is one) into two seperate folders on your USB drive.<br>No config file is needed with this payload!",
        "Icon": "&#xf1b3;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Dump Game Only",
        "PL-Bin": "pl_DumperG.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / 9.00 Port and Mod By Leeful",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump just your game on your USB drive.<br><br>No config file is needed with this payload!",
        "Icon": "&#xf1b2;",
        "FW": ["9.00","8.xx","7.xx"]
      },
      {
        "PL-Title": "Dump Update Only",
        "PL-Bin": "pl_DumperU.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / 9.00 Port and Mod By Leeful",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump just your game update to your USB drive.<br><br>No config file is needed with this payload!",
        "Icon": "&#xf1b2;",
        "FW": ["9.00","8.xx","7.xx"]
      },
      {
        "PL-Title": "Dump & Merge Game + Update",
        "PL-Bin": "pl_DumperM.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / 9.00 Port and Mod By Leeful",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump your game and game update (if there is one) and merge them into one folder on your USB drive.<br>No config file is needed with this payload!",
        "Icon": "&#xf1b3;",
        "FW": ["9.00","8.xx","7.xx"]
      },
      {
        "PL-Title": "PS4 Dumper VTX",
        "PL-Bin": "pl_DumperVTX.bin",
        "PL-Ver": "v1.8 - Original Version By xVortex / 9.00 Port and Mod By RF0oDxM0Dz",
        "PL-Desc": "All-in-one game dumper for PS4",
        "Icon": "&#xf1b3;",
        "FW": ["9.00","8.xx","7.xx"]
      },
      {
        "PL-Title": "Dump Game SGK84",
        "PL-Bin": "pl_gamedumperCISS.bin",
        "PL-Ver": "Mod By SGK84",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br>",
        "Icon": "&#xf1b3;",
        "FW": ["12.xx","11.xx","10.xx","9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Spoof": {
    "ID": "SpoofMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Spoof Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains payloads to spoof various things on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Enable DEX Features (toDEX)",
        "PL-Bin": "pl_toDEX.bin",
        "PL-Ver": "v1.0 - By notzecoxao/FW port by Al Azif",
        "PL-Desc": "Converts your Target ID to (DEX)<br><br>Adds new options in the game info menu to uninstall just DLC or just game updates.<br>To remove debug features just reboot your console or run To-Retail.",
        "Icon": "&#xf7f9;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Disable DEX Features (toCEX)",
        "PL-Bin": "pl_toCEX.bin",
        "PL-Ver": "v1.0 - By Leeful",
        "PL-Desc": "Converts your Target ID back to Retail (CEX)<br><br>Removes the DEX features.",
        "Icon": "&#xf7f9;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "toDEV Payload",
        "PL-Bin": "pl_toDEV.bin",
        "PL-Ver": "v1.0 - By ??",
        "PL-Desc": "toDEV Payload",
        "Icon": "&#xf7f9;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "toKratos Payload",
        "PL-Bin": "pl_toKratos.bin",
        "PL-Ver": "v1.0 - By ??",
        "PL-Desc": "toKratos Payload",
        "Icon": "&#xf7f9;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Game Mods": {
    "ID": "ModMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Game Mods Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains Mod Menus and Trainers for PS4 Games.<br><br>GTA V Mod Menus are compatable with different update versions of the game.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PS4 Trainer (WebRTE)",
        "PL-Bin": "pl_WebRTE.bin",
        "PL-Ver": "v1.01 - By PS4 Trainer / 7.00 to 11.00 Port By EchoStretch",
        "PL-Desc": "Run payload then go to ps4trainer.com/Trainer/index.html<br>on any device to use trainers.",
        "Icon": "&#xf108;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "ArabicGuy Menu For GTA V v1.27",
        "PL-Bin": "pl_GTA_ArabicGuy127.bin",
        "PL-Ver": "v1.0 - By RF0oDxM0Dz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.27 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf5e1;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "ArabicGuy Menu For GTA V v1.32",
        "PL-Bin": "pl_GTA_ArabicGuy132.bin",
        "PL-Ver": "v1.0 - By RF0oDxM0Dz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.32 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf5e1;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "ArabicGuy Menu For GTA V v1.33",
        "PL-Bin": "pl_GTA_ArabicGuy133.bin",
        "PL-Ver": "v1.0 - By RF0oDxM0Dz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.33 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf5e1;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "BeefQueefMod Menu For GTA V v1.33",
        "PL-Bin": "pl_GTA_Beef133.bin",
        "PL-Ver": "v1.0 - By GraFfiX_221211",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.33 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf63b;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "BeefQueefMod Menu For GTA V v1.34",
        "PL-Bin": "pl_GTA_Beef134.bin",
        "PL-Ver": "v1.0 - By GraFfiX_221211",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.34 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf63b;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "BeefQueefMod Menu For GTA V v1.38",
        "PL-Bin": "pl_GTA_Beef138.bin",
        "PL-Ver": "v1.0 - By GraFfiX_221211",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.38 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf63b;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "WildeModz Menu For GTA V v1.32",
        "PL-Bin": "pl_GTA_WildeModz132.bin",
        "PL-Ver": "v1.0 - By WildeModz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.32 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xF1B9;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "WildeModz Menu For GTA V v1.33",
        "PL-Bin": "pl_GTA_WildeModz133.bin",
        "PL-Ver": "v1.0 - By WildeModz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.33 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xF1B9;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "WildeModz Menu For GTA V v1.38",
        "PL-Bin": "pl_GTA_WildeModz138.bin",
        "PL-Ver": "v1.0 - By WildeModz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.38 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xF1B9;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "HavanaMod Menu For RDR2 V1.29",
        "PL-Ver": "v1.0 - By 0x199",
        "PL-Bin": "pl_RDR2_havana129.bin",
        "PL-Desc": "Mod Menu fMod Menu for RDR2 <br>*Game update v1.29 must be installed.<br><br>Activate Menu With: 'R1 + Square'",
        "Icon": "&#xF6F0;",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "OystersMod Menu FREEver For RDR2 V1.00",
        "PL-Ver": "v1.3.8 - By RF0oDxM0Dz",
        "PL-Bin": "pl_RDR2_oysters100.bin",
        "PL-Desc": "Mod Menu fMod Menu for RDR2 <br>*Game update v1.00 must be installed.<br><br>Activate Menu With: 'R1 + Square'",
        "Icon": "&#xF78E;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "OystersMod Menu FREEver For RDR2 V1.13",
        "PL-Ver": "v1.3.8 - By RF0oDxM0Dz",
        "PL-Bin": "pl_RDR2_oysters113.bin",
        "PL-Desc": "Mod Menu fMod Menu for RDR2 <br>*Game update v1.13 must be installed.<br><br>Activate Menu With: 'R1 + Square'",
        "Icon": "&#xF78E;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "OystersMod Menu FREEver For RDR2 V1.19",
        "PL-Ver": "v1.3.8 - By RF0oDxM0Dz",
        "PL-Bin": "pl_RDR2_oysters119.bin",
        "PL-Desc": "Mod Menu fMod Menu for RDR2 <br>*Game update v1.19 must be installed.<br><br>Activate Menu With: 'R1 + Square'",
        "Icon": "&#xF78E;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "OystersMod Menu FREEver For RDR2 V1.24",
        "PL-Ver": "v1.3.8 - By RF0oDxM0Dz",
        "PL-Bin": "pl_RDR2_oysters124.bin",
        "PL-Desc": "Mod Menu fMod Menu for RDR2 <br>*Game update v1.24 must be installed.<br><br>Activate Menu With: 'R1 + Square'",
        "Icon": "&#xF78E;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "OystersMod Menu FREEver For RDR2 V1.29",
        "PL-Ver": "v1.3.8 - By RF0oDxM0Dz",
        "PL-Bin": "pl_RDR2_oysters129.bin",
        "PL-Desc": "Mod Menu fMod Menu for RDR2 <br>*Game update v1.29 must be installed.<br><br>Activate Menu With: 'R1 + Square'",
        "Icon": "&#xF78E;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Linux": {
    "ID": "LinuxMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Linux Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains Linux Loader payloads to run Linux on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Linux 1GB Vram",
        "PL-Bin": "pl_linux1gb900.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 1GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 1GB Vram",
        "PL-Bin": "pl_linux1gb903.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 1GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 1GB Vram",
        "PL-Bin": "pl_linux1gb960.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 1GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux 2GB Vram",
        "PL-Bin": "pl_linux2gb900.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 2GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 2GB Vram",
        "PL-Bin": "pl_linux2gb903.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 2GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 2GB Vram",
        "PL-Bin": "pl_linux2gb960.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 2GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux 3GB Vram",
        "PL-Bin": "pl_linux3gb900.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 3GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 3GB Vram",
        "PL-Bin": "pl_linux3gb903.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 3GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 3GB Vram",
        "PL-Bin": "pl_linux3gb960.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 3GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux 4GB Vram",
        "PL-Bin": "pl_linux4gb900.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 4GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 4GB Vram",
        "PL-Bin": "pl_linux4gb903.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 4GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 4GB Vram",
        "PL-Bin": "pl_linux4gb960.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 4GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 1GB Vram",
        "PL-Bin": "pl_linux1gb900pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 1GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 1GB Vram",
        "PL-Bin": "pl_linux1gb903pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 1GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 1GB Vram",
        "PL-Bin": "pl_linux1gb960pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 1GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 2GB Vram",
        "PL-Bin": "pl_linux2gb900pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 2GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 2GB Vram",
        "PL-Bin": "pl_linux2gb903pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 2GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 2GB Vram",
        "PL-Bin": "pl_linux2gb960pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 2GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 3GB Vram",
        "PL-Bin": "pl_linux3gb900pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 3GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 3GB Vram",
        "PL-Bin": "pl_linux3gb903pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 3GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 3GB Vram",
        "PL-Bin": "pl_linux3gb960pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 3GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 4GB Vram",
        "PL-Bin": "pl_linux4gb900pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 4GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 4GB Vram",
        "PL-Bin": "pl_linux4gb903pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 4GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 4GB Vram",
        "PL-Bin": "pl_linux4gb960pro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 4GB Vram ported by ps4boot",
        "Icon": "<img src=\"img/linux_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux 1GB Vram Baikal",
        "PL-Bin": "pl_linux1gb900baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 1GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 1GB Vram Baikal",
        "PL-Bin": "pl_linux1gb903baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 1GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 1GB Vram Baikal",
        "PL-Bin": "pl_linux1gb960baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 1GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux 2GB Vram Baikal",
        "PL-Bin": "pl_linux2gb900baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 2GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 2GB Vram Baikal",
        "PL-Bin": "pl_linux12gb903baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 2GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 2GB Vram Baikal",
        "PL-Bin": "pl_linux2gb960baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 2GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux 3GB Vram Baikal",
        "PL-Bin": "pl_linux3gb900baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 3GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 3GB Vram Baikal",
        "PL-Bin": "pl_linux3gb903baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 3GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 3GB Vram Baikal",
        "PL-Bin": "pl_linux3gb960baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 3GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux 4GB Vram Baikal",
        "PL-Bin": "pl_linux4gb900baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 4GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux 4GB Vram Baikal",
        "PL-Bin": "pl_linux4gb903baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 4GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux 4GB Vram Baikal",
        "PL-Bin": "pl_linux4gb960baikal.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux 4GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 1GB Vram Baikal",
        "PL-Bin": "pl_linux1gb900baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 1GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 1GB Vram Baikal",
        "PL-Bin": "pl_linux1gb903baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 1GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 1GB Vram Baikal",
        "PL-Bin": "pl_linux1gb960baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 1GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 2GB Vram Baikal",
        "PL-Bin": "pl_linux2gb900baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 2GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 2GB Vram Baikal",
        "PL-Bin": "pl_linux2gb903baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 2GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 2GB Vram Baikal",
        "PL-Bin": "pl_linux2gb960baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 2GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 3GB Vram Baikal",
        "PL-Bin": "pl_linux3gb900baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 3GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 3GB Vram Baikal",
        "PL-Bin": "pl_linux3gb903baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 3GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 3GB Vram Baikal",
        "PL-Bin": "pl_linux3gb960baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 3GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      },
      {
        "PL-Title": "Linux Pro 4GB Vram Baikal",
        "PL-Bin": "pl_linux4gb900baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 4GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.00"]
      },
      {
        "PL-Title": "Linux Pro 4GB Vram Baikal",
        "PL-Bin": "pl_linux4gb903baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 4GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.03","9.04"]
      },
      {
        "PL-Title": "Linux Pro 4GB Vram Baikal",
        "PL-Bin": "pl_linux4gb960baikalpro.bin",
        "PL-Ver": "v19",
        "PL-Desc": "Linux Pro 4GB Vram Baikal ported by ps4boot",
        "Icon": "<img src=\"img/linux_Baikal_pro.png\">",
        "FW": ["9.50","9.51","9.60"]
      }
    ]
  },
  "Fan Speed": {
    "ID": "FanMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Fan Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Fan Speed PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Fan Speed Default",
        "PL-Bin": "pl_fan-speed-default.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed Default.",
        "Icon": "&#xf2c9;",
        "FW": ["9.xx"]
      },
      {
        "PL-Title": "Fan Speed 50",
        "PL-Bin": "pl_fan-speed-50.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed 50.",
        "Icon": "&#xf2cb;",
        "FW": ["9.xx"]
      },
      {
        "PL-Title": "Fan Speed 55",
        "PL-Bin": "pl_fan-speed-55.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed 55.",
        "Icon": "&#xf2ca;",
        "FW": ["9.xx"]
      },
      {
        "PL-Title": "Fan Speed 60",
        "PL-Bin": "pl_fan-speed-60.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed 60.",
        "Icon": "&#xf2ca;",
        "FW": ["9.xx"]
      },
      {
        "PL-Title": "Fan Speed 65",
        "PL-Bin": "pl_fan-speed-65.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed 65.",
        "Icon": "&#xf2c9;",
        "FW": ["9.xx"]
      },
      {
        "PL-Title": "Fan Speed 70",
        "PL-Bin": "pl_fan-speed-70.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed 70.",
        "Icon": "&#xf2c8;",
        "FW": ["9.xx"]
      },
      {
        "PL-Title": "Fan Speed 75",
        "PL-Bin": "pl_fan-speed-75.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed 75.",
        "Icon": "&#xf2c8;",
        "FW": ["9.xx"]
      },
      {
        "PL-Title": "Fan Speed 80",
        "PL-Bin": "pl_fan-speed-80.bin",
        "PL-Ver": "v1.00 - By PS4",
        "PL-Desc": "Fan Speed 80.",
        "Icon": "&#xf2c7;",
        "FW": ["9.xx"]
      }
    ]
  }

}

















