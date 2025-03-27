const calculateTimeAgo = (dateString: string) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000
  );

  const minutes = Math.floor(differenceInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `há ${days} dia${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `há ${hours} hora${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
  } else {
    return "há poucos segundos";
  }
};

export default calculateTimeAgo;
