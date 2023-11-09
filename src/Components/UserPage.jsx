function UserPage({ username }) {
  return (
    <div className="p-3">
      <h1 className="text-3xl lg:text-5xl font-bold">Hello {username} 👋</h1>
    </div>
  );
}

export default UserPage;
