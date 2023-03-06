# Swapz ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

Swapz is a platform that allows people to swap their own items with others in their local area, helping to reduce waste and promote a more sustainable way of living.

# Demo

A 4-minute video demo showcasing the app's features is available.
Link: https://www.youtube.com/watch?v=9dD8mxC-31c&ab_channel=VincenzoChiovaro

# Features

- Login and Registration: The registration process is simple, requiring users to fill out the required sections and press sign up. If the incorrect password is entered, or you try to sign up with an email address that is already in use, the user will be notified that the email address they are using is not valid.

- Home Screen: Users can view a list of all the items available for swapping. If you're interested in a particular item, you can access its individual page and view all the available information.

- Comments and Offers: Users can comment on a specific item to ask any questions they may have, or submit a swap offer to the user. Users have the ability to delete their comments and offers.

- View Offers: Users can view the list of offers that other users have made on their posted items. They can click on the view profile button to take them to that user’s page, see their list of items, including the item that they are offering to trade.

- User Profile: Users can view their own user profile, review a list of their posted items, and change their avatar image.

# Technology

- Swapz uses React Native and Expo Go as its frontend technologies. React Native is a popular framework for building mobile applications using JavaScript and allows for cross-platform development. Expo Go is a mobile app that enables developers to test and share their React Native applications in real-time on a mobile device.
  It also provides a range of built-in features and components to speed up the development process. Swapz leverages the benefits of these technologies to provide an easy-to-use and accessible platform for users of all ages and backgrounds.

- For the backend Swapz uses Firebase as a Backend-as-a-Service (BaaS) platform. Firebase handles all of the data storage, image hosting, and API for the data. Firestore was used to store all the items, comments, and user data. The data was structured in Firestore's collections to limit the amount of reads our app was requesting from the database.
  Firebase also provided simple user authentication, allowing users to sign up using their email and password. With this auth token, Swapz assigned rules to storage to only allow registered users to write to the database.

# Challenges

- Using a tech stack that the team was not familiar with was a significant challenge.
- The team had to learn how to use Firebase and React Native Expo Go from scratch.
- There was a steep learning curve in understanding the Firebase backend architecture and how to integrate it with the frontend.
- The team had to figure out the best practices for structuring the data in Firestore and creating rules for accessing the database.
- Troubleshooting errors and debugging issues with the new tech stack was time-consuming and required a lot of experimentation and research.
- Despite the challenges, the team persevered and was able to successfully develop the Swapz app using the new tech stack.

# Authors

Swapz was developed by Rotimi, Vincenzo, James, Kelvin, and Raul as a part of a programming project.

# Future Improvements

- In-app messaging system for users to communicate and finalize their trade.
- Integration of a map feature to make it easier to locate items.
- Notification system for users to be alerted when someone makes an offer on their posted item.
