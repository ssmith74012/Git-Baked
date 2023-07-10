import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel";

const Home = () => {
  const carouselImages = [
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/7/11/0/FNK_the-best-crispy-chocolate-chip-cookies_H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1562853894323.jpeg",
    "https://cdn.vox-cdn.com/thumbor/Jo2iBcnPe5f-0bu82ZocDiYS4Yk=/0x0:2000x1600/920x613/filters:focal(840x640:1160x960)/cdn.vox-cdn.com/uploads/chorus_image/image/69831062/_09A5856.0.jpg",
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=750&q=80",
    // Add more image URLs as needed
  ];

  return (
    <div>
      <h1>Welcome to Git Baked!</h1>
      <ImageCarousel images={carouselImages} />
      {/* Add the rest of your home page content */}
    </div>
  );
};

export default Home;
