# 🎵 VibeCheck

> **Music that matches your vibe.**

🔴 **Live Demo:** [VibeCheck](https://vibe-checkapp.vercel.app/)

VibeCheck is a full-stack music recommendation application that uses **facial expression detection** to understand the user's current vibe and recommend songs based on it.

Instead of manually choosing what to listen to, users can use the **Mood Scanner** to detect their facial expression and discover music that matches their mood.

---

## ✨ Features

### 🎭 Mood Detection

VibeCheck uses **MediaPipe Face Landmarker** to analyze facial expressions and classify them into four moods:

* 😊 Happy
* 😢 Sad
* 😮 Surprised
* 😐 Neutral

The application focuses on keeping mood detection simple and reliable rather than trying to detect too many emotions.

### 🎵 Mood-Based Music Recommendation

After detecting a mood, VibeCheck fetches songs associated with that mood and creates a personalized playlist.

### 🔍 Song Search

Users can search for songs by:

* Song title
* Mood

The search experience includes debouncing to reduce unnecessary API requests.

### ▶️ Music Player

Users can:

* Play songs
* Select songs from playlists
* Navigate through the queue
* Play searched songs
* Manage the current music queue

### 👤 User Authentication

The application includes authentication functionality such as:

* User registration
* User login
* User logout
* Protected user data
* Persistent authentication

### 👤 Profile Management

Authenticated users can:

* View their profile
* Update their name
* Update their email
* Change their password
* Upload a profile picture

Profile images are uploaded to **ImageKit**.

### 📱 Responsive UI

The application is designed to work across:

* Desktop
* Tablet
* Mobile

The UI uses a dark, minimal music-focused design.

---

## 🧠 How Mood Detection Works

VibeCheck uses **MediaPipe Face Landmarker** to detect facial landmarks and facial blendshape scores.

The application analyzes expressions such as:

```text
Smile
Frown
Raised eyebrows
Jaw movement
```

These values are then used to determine the current mood.

For example:

```text
Facial Expression
        ↓
MediaPipe Face Landmarker
        ↓
Blendshape Scores
        ↓
Mood Classification
        ↓
happy / sad / surprised / neutral
        ↓
Music Recommendation
```

The detected mood is then sent to the backend, which returns songs matching that mood.

---

## 🏗️ Application Architecture

```text
                 ┌─────────────────────┐
                 │      React UI        │
                 │                     │
                 │  Home               │
                 │  Search             │
                 │  Music Player       │
                 │  Profile            │
                 │  Mood Scanner       │
                 └──────────┬──────────┘
                            │
                            │ API Requests
                            ▼
                 ┌─────────────────────┐
                 │   Node.js + Express │
                 │                     │
                 │ Authentication      │
                 │ Songs               │
                 │ Search              │
                 │ Mood Recommendation │
                 │ Profile             │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      MongoDB        │
                 │                     │
                 │ Users               │
                 │ Songs               │
                 └─────────────────────┘

        MediaPipe
            │
            ▼
     Facial Expressions
            │
            ▼
      Detected Mood
            │
            ▼
     Recommendation API
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* React Icons
* Axios
* React Router
* Context API / Custom Hooks

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookies
* Multer

### AI / Computer Vision

* MediaPipe Face Landmarker
* MediaPipe Tasks Vision

### Storage

* ImageKit

### Development

* Git
* GitHub
* Postman

---

## 📂 Project Structure

### Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   ├── utils/
│   │
│   ├── Expression/
│   │   ├── components/
│   │   └── utils/
│   │
│   └── App.jsx
│
└── package.json
```

### Backend

```text
backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── services/
│
└── package.json
```

## 🎧 User Flow

### Normal Music Flow

```text
Open VibeCheck
      ↓
Browse songs
      ↓
Search / Select song
      ↓
Add/play song
      ↓
Music Queue
      ↓
Enjoy 🎵
```

### Mood Scanner Flow

```text
Open VibeCheck
      ↓
Click "Scan My Mood"
      ↓
Allow Camera
      ↓
Face Detection
      ↓
Expression Analysis
      ↓
Mood Detected
      ↓
Songs Recommended
      ↓
Play Music 🎵
```

---

## 🔒 Privacy

The camera is used only for facial-expression detection.

VibeCheck does not need to upload camera footage to the server for mood detection. The facial-expression analysis happens in the browser using MediaPipe.

Users should still review their browser camera permissions and revoke access when it is no longer needed.

---

## 🎯 Project Goals

This project was built to explore and practice:

* Full-stack development
* React application architecture
* REST API development
* Authentication
* MongoDB/Mongoose
* File uploads
* Facial expression detection
* Real-time-like interactive UI
* Music queue management
* Search and debouncing
* State management
* Responsive UI design

---

## 🔮 Future Improvements

Possible future improvements include:

* [ ] Improve mood detection stability
* [ ] Add confidence scores for detected moods
* [ ] Improve song recommendation algorithm
* [ ] Add favorites
* [ ] Add recently played songs
* [ ] Add custom playlists
* [ ] Add shuffle and repeat
* [ ] Add more sophisticated recommendation logic
* [ ] Improve accessibility

---

## ⚠️ Disclaimer

Facial expressions are not a perfect representation of a person's actual emotional state.

VibeCheck treats facial expressions as a fun way to generate a music recommendation and should not be considered an accurate psychological or emotional assessment.

---

## 👨‍💻 Author

**Shivani Verma**

Built with ❤️ and JavaScript.

---

## ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.
