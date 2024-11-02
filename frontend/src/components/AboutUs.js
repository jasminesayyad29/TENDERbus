import React from 'react';
import './AboutUs.css';

const AboutUsPage = () => {
  const teamMembers = [
    { name: 'Jasmine Sayyad', image:'/jasmine.png' },
    { name: 'Aadarsh Nandedkar', image: '/av.jpg' },
    { name: 'Priti Desai', image: '/priti.png' },
  ];

  return (
    <div className="about-us">
      <div className="description">
      <br/>
      <br/>
        <h1>About Us</h1>
        <p>
          Welcome to our tender management system! We are committed to providing 
          an innovative platform that simplifies the tendering process for 
          both bidders and tender officers. Our mission is to enhance 
          transparency and efficiency in the tendering process through 
          technology.
        </p>
        <p>
          Our team consists of experts in technology, procurement, and project 
          management who are passionate about improving the tendering experience 
          for everyone involved.
        </p>

        <br/>
        <br/>
        <br/>

        <h2>Our Vision</h2>
        <p>
          To be the leading platform for tender management, recognized for 
          our commitment to excellence, innovation, and customer satisfaction.
        </p>
        {/* <h2>Our Values</h2>
        <ul>
          <li>Integrity</li>
          <li>Transparency</li>
          <li>Innovation</li>
          <li>Collaboration</li>
          <li>Customer Focus</li>
        </ul> */}
      </div>

      {/* Team Section */}
      <div className="team-card">
        <h2>Meet Our Team</h2>
        {teamMembers.map((member, index) => (
          <div className="member" key={index}>
            <img src={member.image} alt={member.name} className="member-image" />
            <p className="member-name">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
