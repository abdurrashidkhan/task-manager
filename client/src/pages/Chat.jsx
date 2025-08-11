const Chat = () => {
  return (
    <div className="bg-[#fff] border border-[#fff] shadow rounded px-1 mb-5">
      {/* chat */}
      <div className="flex-1 overflow-auto">
        <div className="mb-4">
          <p className="text-xs text-gray-400">TeamChat · 24 April 2023</p>
          <div className="bg-gray-100 rounded-lg p-3 mt-2">
            <p>Have a great working week!</p>
          </div>
          <div className="bg-purple-100 rounded-lg p-3 mt-2">
            <p>What do you think about new Team Section?</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 mt-2">
            <p>Okay, thanks for the tips!</p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex gap-2">
        <input
          type="text"
          placeholder="Your messages..."
          className="flex-1 border rounded-md px-3 py-2 text-sm"
        />
        <button className="px-3 py-2 bg-purple-600 text-white rounded-md text-sm">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
