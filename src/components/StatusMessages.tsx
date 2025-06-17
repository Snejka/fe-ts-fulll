type StatusMessagesProps = {
  loading: boolean;
  error: string;
  usersCount: number;
};

const StatusMessages: React.FC<StatusMessagesProps> = ({ loading, error, usersCount }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (usersCount < 1) return <p className="error">Make a search to show users</p>;
  return null;
}

export default StatusMessages;