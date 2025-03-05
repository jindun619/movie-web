# 🎬 Movie-Web

https://jindun-movie-web.vercel.app/home

Movie-Web is a web application built with **Next.js** and **TypeScript** that allows users to explore movies and TV shows. The app fetches data from **TMDB** (The Movie Database), a free and open-source RESTful API, and displays it in an organized and user-friendly way. All data is fetched server-side for better performance, and **Recoil** is used for efficient state management to optimize resource usage.

## 📚 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

- **API**: [TMDB](https://developer.themoviedb.org/)
- **Slider Library**: [Splide](https://splidejs.com/)

## 💡 Features

### **Home Page**

- Displays daily trending movies and TV shows.
- Uses **Splide** to create a slider for recommended movies and TV shows, allowing users to swipe through them.

![img1](./readmeImg/1.webp)

### **Movie Page**

- Lists movies in the following categories:
  - Now Playing
  - Popular Movies
  - Top Rated Movies

![img2](./readmeImg/2.webp)

### **TV Page**

- Lists TV shows in the following categories:
  - Airing Today
  - Currently Airing
  - Popular Shows
  - Top Rated Shows

![img3](./readmeImg/3.webp)

### **Search Page**

- Allows users to search for movies and TV shows by name.

![img4](./readmeImg/4.webp)

### **Detail Page**

- Displays detailed information about a selected movie or TV show.
- Users can navigate to this page by clicking on any movie or TV show card.

![img5](./readmeImg/5.webp)

## Key Learnings

- Implemented server-side data fetching for better performance.
- Utilized **Recoil** for efficient state management and resource optimization.
- Integrated **Splide** for creating interactive sliders.
- Designed a responsive and modern UI using **TailwindCSS**.
- Gained experience in working with external APIs, specifically **TMDB**.
