# Welcome to Astro Map

Astro Map shows a projection of the moon’s shadow on the Earth for any solar eclipse within a 200 year range by using data supplied from NASA's public websites.

You can checkout the backend server for this app [here](https://github.com/AliCW/Astro-map-BE/tree/main).

## Description

The frontend has been implemented using React Native with Expo to create a mobile application. Material Dark theme is asserted by an UI library called [React Native Paper](https://callstack.github.io/react-native-paper/index.html) while [React Navigation](https://reactnavigation.org/) is used for switching tabs with fluid animation.

For the design of the application, [react-native-snap-carousel](https://github.com/meliorence/react-native-snap-carousel) gives the ability to scroll cards on homepage horizontally. The map view is provided by [react-native-maps](https://github.com/react-native-maps/react-native-maps).

## Minimum development requirement

1. Node.js v18 or above
2. React v18 or above
3. React Native v0.70 or above
4. Expo v47.0 or above

## Instructions on cloning repository and running on mobile devices

The application is mobile version only. While it may be possible to upload the application to Play Store or App Store, you can clone the repository and try it yourself.

Make sure your local machine reach the minimum requirement.

1. Open terminal and enter `$ git clone https://github.com/plaintree/astro-map-fe`
2. `$ cd astro-map-fe`
3. `$ npm install` to install the npm packages
4. `$ npm start` to run the application in your computer
5. Make sure you go to [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_GB&gl=US&pli=1) (Andriod) or [App Store](https://apps.apple.com/us/app/expo-go/id982107779) (iOS) and install Expo Go
6. Once finished, open Expo Go and Scan the QR Code shown in the terminal

If error message is shown in the terminal, try to troubleshoot it and see if all the packages are installed correctly.
