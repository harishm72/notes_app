import React from "react";
import { Text, Heading } from "@chakra-ui/react";

const Home = (props) => {
  return (
    <div>
      <section className="app">
        <SideBar />
        <main>
          <header className="nav-bar">
            <button
              onClick={() => {
                props.logout();
              }}
            >
              Log out
            </button>
          </header>
          <section className="content-section">
            <Text display="flex" justifyContent="center" alignItems="center">
              Click a note on the left to view something
            </Text>
          </section>
        </main>
      </section>
    </div>
  );
};

export default Home;

const SideBar = () => {
  const posts = [
    {
      name: "Server Components",
      created_at: "12/18/20",
    },
    {
      name: "Server Components 2",
      created_at: "12/18/20",
    },
    {
      name: "Server Components 3",
      created_at: "12/18/20",
    },
    {
      name: "Server Components 3",
      created_at: "12/18/20",
    },
    {
      name: "Server Components 5",
      created_at: "12/18/20",
    },
  ];

  return (
    <aside>
      <Heading fontStyle="oblique" textAlign="center">
        Notes
      </Heading>
      <ul>
        {posts.map((post, idx) => (
          <li key={idx} className="card">
            <h3>{post.name}</h3>
            <span>{post.created_at}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
