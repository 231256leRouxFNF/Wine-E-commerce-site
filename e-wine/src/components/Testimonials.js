import React from "react";
import "./Testimonials.css";

import UserImage1 from "../assets/users/UserImage1.svg";
import UserImage2 from "../assets/users/UserImage2.svg";
import UserImage3 from "../assets/users/UserImage3.svg";
import UserImage4 from "../assets/users/UserImage4.svg";
import UserImage5 from "../assets/users/UserImage5.svg";
import UserImage6 from "../assets/users/UserImage6.svg";

const testimonials = [
  {
    name: "Sophie Vermeer",
    username: "@sophiev",
    image: UserImage1,
    text: "I discovered wines I never would have tried before! Pour Decisions made it so easy to compare and find my perfect sip.",
  },
  {
    name: "Lucas Moretti",
    username: "@lucasmoretti",
    image: UserImage2,
    text: "Finally, a site that lets me search by region and style. The add-your-own-wine feature is genius!",
  },
  {
    name: "Aisha Daniels",
    username: "@aishad",
    image: UserImage3,
    text: "The interface is clean and elegant. I've added three of my favourite local wines already.",
  },
  {
    name: "Li King",
    username: "@LiKing_21",
    image: UserImage4,
    text: "Love this platform! I found an amazing bottle from Argentina I’d never seen in stores.",
  },
  {
    name: "Talje van Niekerk",
    username: "@tals231",
    image: UserImage5,
    text: "Easy, beautiful, and informative. Pour Decisions is now my go-to wine guide.",
  },
  {
    name: "Jonas Richter",
    username: "@jonasrich",
    image: UserImage6,
    text: "Being able to read and share opinions on wine makes this feel like a real community, not just a store.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonialsSection">
      <div className="testimonialsHeader">
        <h4>Testimonials</h4>
        <h2>What Our Community Says</h2>
      </div>
      <div className="testimonialsGrid">
        {testimonials.map((item, index) => (
          <div className="testimonialCard" key={index}>
            <p className="testimonialText">“{item.text}”</p>
            <div className="testimonialUser">
              <img
                src={item.image}
                alt={item.name}
                className="testimonialAvatar"
              />
              <div>
                <p className="testimonialName">{item.name}</p>
                <p className="testimonialUsername">{item.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
