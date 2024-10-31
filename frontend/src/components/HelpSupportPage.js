// src/components/HelpDesk.js

import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const HelpDeskContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  position: relative;
`;

const Header = styled.div`
  background-color: #4a47fa;
  color: white;
  padding: 40px;
  text-align: center;
`;

const SearchBar = styled.div`
  margin-top: 20px;
  input {
    width: 50%;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }
  button {
    padding: 10px 20px;
    background-color: #3a35d3;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px;
  }
`;

const HelpCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
  background-color: #f9f9f9;
`;

const CategoryCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin: 10px 0;
    color: #4a47fa;
  }

  p {
    color: #888;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 0;
  top: 100px;
`;

const MostHelpfulUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  span {
    color: #4a47fa;
  }
`;

const ChatSection = styled.div`
  margin-top: 20px;
`;

const ChatBox = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  height: 150px;
  overflow-y: scroll;
  margin-bottom: 10px;
`;

const HelpDesk = () => {
  const categories = [
    { id: 1, title: 'Knowledge Base', description: '245 Posts' },
    { id: 2, title: 'Community Forums', description: '245 Posts' },
    { id: 3, title: 'Documentation', description: '245 Posts' },
    { id: 4, title: 'Working with Docs', description: '245 Posts' },
    { id: 5, title: 'Getting Started', description: '245 Posts' },
    { id: 6, title: 'Account Management', description: '245 Posts' },
  ];

  const users = [
    { name: 'cleo-parra', count: 10 },
    { name: 'roy_marin', count: 8 },
    { name: 'hellen.austin', count: 5 },
    { name: 'erna.may', count: 3 },
    { name: 'jacobson', count: 2 },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Simulate a search functionality using mock data
  const handleSearch = () => {
    const results = categories.filter((category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  // Simulate sending messages in the chat
  const sendMessage = () => {
    if (input.trim() === '') return; // Prevent sending empty messages
    const newMessage = { user: 'You', message: input };
    setMessages([...messages, newMessage]);
    setInput(''); // Clear input after sending
  };

  return (
    <HelpDeskContainer>
      {/* Header and Search */}
      <Header>
        <h1>How can we help you?</h1>
        <p>Search here to get answers to your questions</p>
        <SearchBar>
          <input
            type="text"
            placeholder="Search the Doc"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </SearchBar>
      </Header>

      {/* Help Categories */}
      <HelpCategories>
        {searchResults.length > 0 ? (
          searchResults.map((category) => (
            <CategoryCard key={category.id}>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </CategoryCard>
          ))
        ) : (
          categories.map((category) => (
            <CategoryCard key={category.id}>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </CategoryCard>
          ))
        )}
      </HelpCategories>

      {/* Most Helpful Sidebar */}
      <Sidebar>
        <h2>Most Helpful</h2>
        {users.map((user, index) => (
          <MostHelpfulUser key={index}>
            <img src={`https://i.pravatar.cc/50?img=${index}`} alt={user.name} />
            <div>
              <p>{user.name}</p>
              <span>{user.count} posts</span>
            </div>
          </MostHelpfulUser>
        ))}
      </Sidebar>

      {/* Chat Section */}
      <ChatSection>
        <h2>Support Chat</h2>
        <ChatBox>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.user}: </strong>
              {msg.message}
            </p>
          ))}
        </ChatBox>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </ChatSection>
    </HelpDeskContainer>
  );
};

export default HelpDesk;
