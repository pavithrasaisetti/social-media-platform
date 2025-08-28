import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const getFileIcon = (type) => {
  if (type.includes("pdf")) return "📄";
  if (type.includes("word") || type.includes("doc")) return "📝";
  if (type.includes("excel") || type.includes("sheet") || type.includes("xls")) return "📊";
  if (type.includes("powerpoint") || type.includes("ppt")) return "📽️";
  return "📁";
};

const Feed = () => {
  const handleLogout = () => {
  // Clear auth (example: remove token or session logic here)
  localStorage.removeItem("userToken"); // optional
  toast.success("Logged out successfully!");
  window.location.href = "/login"; // redirect to login
};

  // Add this style tag inside your Feed component
const styleSheet = `
  @keyframes bounce {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
  }

  .emoji-hover:hover {
    animation: bounce 0.4s ease-in-out;
  }
`;


  const navigate = useNavigate();
  const [mediaFiles, setMediaFiles] = useState([]);

  const [newPost, setNewPost] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [showAnimation, setShowAnimation] = useState(false);
  
  const [posts, setPosts] = useState([
  {
    id: 1,
    username: "Rahul",
    content: "Just finished building my portfolio site!",
    timestamp: new Date().toLocaleString(),
    liked: false,
    comments: [],
    showReplyBox: false,
    newComment: "",
  },
  {
    id: 2,
    username: "Pavithra",
    content: "Excited to share my social media app progress!",
    timestamp: new Date().toLocaleString(),
    liked: false,
    comments: [],
    showReplyBox: false,
    newComment: "",
  },
]);


  // const handleLogout = () => {
  //   alert("Logged out!");
  //   navigate("/login");
  // };

  const handlePost = () => {
  if (newPost.trim() === "" && mediaFiles.length === 0) return;

  const mediaData = mediaFiles.map((file) => ({
    url: URL.createObjectURL(file),
    type: file.type,
    name: file.name,
  }));

  const newPostObj = {
    id: Date.now(),
    username: "Pavithra",
    content: newPost,
    timestamp: new Date().toLocaleString(),
    liked: false,
    comments: [],
    showReplyBox: false,
    newComment: "",
    media: mediaData,
  };

  setPosts([newPostObj, ...posts]);
  setNewPost("");
  setMediaFiles([]); // Clear uploaded media after posting
  setShowAnimation(true);
  setTimeout(() => setShowAnimation(false), 1000);
};



  const toggleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };
  const toggleReplyBox = (id) => {
  setPosts(
    posts.map((post) =>
      post.id === id ? { ...post, showReplyBox: !post.showReplyBox } : post
    )
  );
};

const handleCommentChange = (e, id) => {
  setPosts(
    posts.map((post) =>
      post.id === id ? { ...post, newComment: e.target.value } : post
    )
  );
};

const handleAddComment = (id) => {
  setPosts(
    posts.map((post) => {
      if (post.id === id && post.newComment.trim()) {
        return {
          ...post,
          comments: [...post.comments, post.newComment],
          newComment: "",
          showReplyBox: false,
        };
      }
      return post;
    })
  );
};
  // Add this just above return (...)
  // const emojiHoverStyles = `
  //   .emoji-hover {
  //     display: inline-block;
  //     transition: transform 0.3s ease, filter 0.3s ease;
  //   }
  //   .emoji-hover:hover {
  //     transform: scale(1.3) rotate(5deg);
  //     filter: brightness(1.2);
  //   }
  // `;

  return (
    <div
    
  style={{
    ...styles.page,
    background: darkMode ? "#121212" : "#e0eafc",
    color: darkMode ? "#e0e0e0" : "#222",
    transition: "all 0.4s ease-in-out",
  }}
>
  <style>{styleSheet}</style>


      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.profile}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
            style={styles.avatar}
          />
          <h4 style={styles.usernameSidebar}>@Pavithra</h4>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn} className="emoji-hover">
  🚶‍♂️🚶‍♀️
</button>

      </div>

      {/* Main Content */}
      <div style={styles.wrapper}>
        {/* Top Navigation */}
        <div style={styles.topNav}>
  <h2 style={styles.logo}>TiedHearts<span className="emoji-hover">💖</span>
</h2>
  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      background: "transparent",
      border: "none",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
      marginLeft: "15px",
    }}
  >
    {darkMode ? <span className="emoji-hover">🌞</span>
 : <span className="emoji-hover">🌙</span>
}
  </button>
</div>


        {/* Animation */}
        {showAnimation && <div style={styles.flash}>🎉 Post Added!</div>}

        {/* Feed */}
        <div style={styles.feedContainer}>
          {/* Post Box */}
          <div style={styles.postBox}>
  <textarea
    style={styles.textarea}
    placeholder="What's on your mind?"
    value={newPost}
    onChange={(e) => setNewPost(e.target.value)}
    rows={3}
  />

  {/* 📷 Cute Media Upload Button */}
  <label style={styles.uploadLabel}>
    <span className="emoji-hover">📷 Upload Media</span>
    <input
      type="file"
      accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
      multiple
      onChange={(e) => setMediaFiles(Array.from(e.target.files))}
      style={{ display: "none" }}
    />

  </label>

  <button style={styles.postButton} onClick={handlePost}>
    <span className="emoji-hover">Post</span>
  </button>
</div>
{mediaFiles.length > 0 && (
  <div style={styles.mediaPreviewContainer}>
    {mediaFiles.map((file, index) => {
      const url = URL.createObjectURL(file);
      return file.type.startsWith("video") ? (
        <video
          key={index}
          src={url}
          controls
          style={styles.previewMedia}
        />
      ) : (
        <img
          key={index}
          src={url}
          alt={`preview-${index}`}
          style={styles.previewMedia}
        />
      );
    })}
  </div>
)}



          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <div style={styles.postHeader}>
                <h4 style={styles.username}>{post.username}</h4>
                <span
  style={styles.deleteBtn}
  onClick={() => handleDelete(post.id)}
  className="emoji-hover"
>
  🗑️
</span>

  </div>
  <p style={styles.postContent}>{post.content}</p>
  {post.media && post.media.length > 0 && (
  <div style={styles.mediaPreview}>
    {post.media.map((file, index) => {
  if (file.type.startsWith("image/")) {
    return (
      <img
        key={index}
        src={file.url}
        alt={`upload-${index}`}
        style={styles.mediaItem}
      />
    );
  } else if (file.type.startsWith("video/")) {
    return (
      <video
        key={index}
        controls
        src={file.url}
        style={styles.mediaItem}
      />
    );
  } else {
   return (
  <div
    key={index}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#f4f4f4",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "10px",
    }}
  >
    <span style={{ fontSize: "1.5rem" }}>{getFileIcon(file.type)}</span>
    <div style={{ flexGrow: 1 }}>
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontWeight: "500",
          color: "#333",
          textDecoration: "none",
        }}
      >
        {file.name || "Document"}
      </a>
      <div style={{ fontSize: "0.8rem", color: "#666" }}>
        {file.type.toUpperCase()}
      </div>
    </div>
    <a
      href={file.url}
      download
      style={{
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "0.85rem",
      }}
    >
      Download
    </a>
  </div>
);

  }
})}

  </div>
)}

              <p style={styles.timestamp}>{post.timestamp}</p>
              <button
                onClick={() => toggleLike(post.id)}
                style={{
                  ...styles.likeBtn,
                  backgroundColor: post.liked ? "#e91e63" : "#ddd",
                  color: post.liked ? "#fff" : "#333",
                }}
              >
                {post.liked ? (
  <span className="emoji-hover">🤍</span>
) : (
  <span className="emoji-hover">❤️</span>
)}


              </button>
              <button
  onClick={() => toggleReplyBox(post.id)}
  style={{ ...styles.likeBtn, marginLeft: "10px" }}
  className="emoji-hover"
>
  💬 
</button>

                  {/* Show Comments */}
    {post.comments.map((comment, idx) => (
      <p key={idx} style={{ marginLeft: "10px", color: "#555" }}>
        🗨️ {comment}
      </p>
    ))}

    {/* Reply Input */}
    {post.showReplyBox && (
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={post.newComment}
          onChange={(e) => handleCommentChange(e, post.id)}
          placeholder="Write a comment..."
          style={{
            width: "80%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => handleAddComment(post.id)}
          style={{
            marginLeft: "5px",
            padding: "8px 10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </div>
    )}

            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

const styles = {
  logoutButton: {
    margin: "20px",
    padding: "10px 15px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  uploadLabel: {
  display: "inline-block",
  marginTop: "10px",
  marginRight: "10px",
  padding: "8px 14px",
  backgroundColor: "#ff69b4",
  color: "white",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "500",
  cursor: "pointer", // 👈 This makes the cursor a hand!
  transition: "all 0.3s ease",
},

  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    backgroundImage: "linear-gradient(to right, #e0eafc, #cfdef3)",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#87b7e7ff",
    color: "#ecf0f1",
    padding: "30px 15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
  },
  profile: {
    textAlign: "center",
    marginBottom: "30px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  usernameSidebar: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: 0,
  },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#8cccecff",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "30px",
  },
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  topNav: {
    backgroundColor: "#930af4ff",
    padding: "15px 0",
    textAlign: "center",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "24px",
  },
  flash: {
    backgroundColor: "#28a745",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    fontWeight: "bold",
    animation: "fade 1s ease-in-out",
  },
  feedContainer: {
    width: "100%",
    maxWidth: "600px",
    margin: "30px auto",
    padding: "0 20px",
  },
  postBox: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(21, 5, 5, 0.1)",
    marginBottom: "20px",
  },
  textarea: {
    width: "99%",
    padding: "1px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
    fontSize: "15px",
    fontFamily: "inherit",
  },
  postButton: {
    marginTop: "8px",
    backgroundColor: "#22f7b4ff",
    color: "white",
    border: "none",
    padding: "6px 20px",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    float: "right",
  },
  postCard: {
    background: "#fff",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    margin: 0,
    color: "#5f9ddcff",
    fontSize: "16px",
  },
  postContent: {
    marginTop: "5px",
    fontSize: "15px",
    color: "#333",
  },
  timestamp: {
    fontSize: "12px",
    color: "#888",
    marginTop: "8px",
  },
  likeBtn: {
    marginTop: "10px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  mediaItem: {
  width: "100%",
  maxWidth: "300px", // Controls max width
  maxHeight: "300px", // Controls max height
  objectFit: "cover",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  marginTop: "10px",
},

  deleteBtn: {
    cursor: "pointer",
    fontSize: "20px",
  },
  mediaPreviewContainer: {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "10px",
  borderRadius: "12px",
  overflow: "hidden",
},

previewMedia: {
  width: "100%",
  maxWidth: "200px",
  borderRadius: "12px",
  objectFit: "cover",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
}

};
export default Feed;
