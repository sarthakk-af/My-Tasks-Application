#  My Tasks

### Created by: Sarthak Gupta

**My Tasks** is a simple and functional to-do app built using **React Native** and **Expo Go**. It allows users to add, edit, complete, delete, and prioritize tasks with a clean and responsive UI.



##  Features

  Add new tasks with titles
  Prioritize tasks (High / Medium / Low)
  Toggle task completion status
  Delete tasks easily
  Edit existing tasks
  Data persistence using **AsyncStorage**
  Smooth UI animations with `react-native-animatable`
  Tested using **Expo Go**


##  Setup & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/sarthakk-af/My-Tasks-Application.git
   cd MyTasksApp -> frontend
   cd backend -> backend 
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Replace the `BASE_URL` in `services/api.js` with your local IP address (e.g., `http://192.168.x.x:5000`).

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Scan the QR code using the **Expo Go** app on your device.

>  Make sure your backend server is also running locally on the same network.



##  Challenges Faced

- Expo Go doesn’t support `expo-notifications` fully, as it requires native code. To implement notifications, a custom dev client is needed via `eas build`.
- Compatibility issues between libraries required frequent updates or downgrades to maintain stability.
- Personally found backend implementation more straightforward than handling frontend UI logic and component states.



##  Tech Stack

- React Native (via Expo)
- JavaScript (ES6+)
- AsyncStorage for local storage
- Express & MongoDB for backend (local only)


##  License

This project is for educational/demo purposes only.
